const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Papa = require('papaparse');

const app = express();

app.get('/', async (req, res) => {
  if (!('url' in req.query)) res.end("No parameter 'url' is given.");

  const urlArr = extractUrls(req.query.url);
  let response;
  let text;
  let csvArr = [];

  // Collect all CSV contents in an array
  await Promise.all(
    urlArr.map(async (url) => {
      response = await fetch(url);
      text = await response.text();
      csvArr.push(text);
    }),
  );

  const data = Papa.parse(csvArr[0], {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (value, field) => {
      if (field === 'Date') return new Date(value);
      return value;
    },
  }).data;
  console.log('data: ', data);
  console.log('most speeches in 2013: ', mostSpeechesIn(2012, data));
  console.log(
    'most speeches on Topic: ',
    mostSpeechesOnTopic('Internal Security', data),
  );

  res.send('This is the answer');
});

app.listen(3100, () => {
  console.log('running...');
});

const extractUrls = (params) => {
  return Array.isArray(params) ? params : [params];
};

const mostSpeechesIn = (year, data) => {
  let speechesPerPolitican = {};
  let politicianWithMostSpeeches;

  // Count speeches per politian
  data.forEach((speech) => {
    if (speech.Date.getFullYear() !== year) return;

    if (speech.Speaker in speechesPerPolitican) {
      speechesPerPolitican[`${speech.Speaker}`] += 1;
    } else {
      speechesPerPolitican[`${speech.Speaker}`] = 1;
    }
  });

  if (Object.keys(speechesPerPolitican).length < 1) return null;

  // Get politian with most speeches
  politicianWithMostSpeeches = Object.keys(speechesPerPolitican).reduce(
    (prev, current) => {
      return speechesPerPolitican[prev] > speechesPerPolitican[current]
        ? prev
        : current;
    },
  );

  return politicianWithMostSpeeches;
};

const mostSpeechesOnTopic = (topic, data) => {
  let speechesOnTopic = {};
  let politianWithMostSpeechesOnTopic;
  // Collect all entries with speeches about "Internal security"
  //

  data.forEach((speech) => {
    if (speech.Topic !== topic) return;

    if (topic in speech) {
      speechesOnTopic[`${speech.Speaker}`] += 1;
    } else {
      speechesOnTopic[`${speech.Speaker}`] = 1;
    }
  });

  if (Object.keys(speechesOnTopic).length < 1) return null;

  politianWithMostSpeechesOnTopic = Object.keys(speechesOnTopic).reduce(
    (prev, current) => {
      return speechesOnTopic[prev] > speechesOnTopic[current] ? prev : current;
    },
  );

  return politianWithMostSpeechesOnTopic;
};

const viewestWordsInTotal = (data) => {
  let politician;

  return politician;
};
