const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Papa = require('papaparse');
const helpers = require('./helpers');

const app = express();
let aggregatedData = [];

app.get('/', async (req, res) => {
  if (!('url' in req.query)) res.end("No parameter 'url' is given.");

  const urlArr = extractUrls(req.query.url);
  let response;
  let text;
  let csvArr = [];
  let data;

  // Collect all CSV contents in an array
  await Promise.all(
    urlArr.map(async (url) => {
      response = await fetch(url);
      text = await response.text();
      csvArr.push(text);
    }),
  );

  // Parse CSVs to array of objects
  csvArr.forEach((csv) => {
    data = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        if (field === 'Date') return new Date(value);
        return value;
      },
    }).data;
    aggregatedData = [...aggregatedData, ...data];
  });

  console.log('Aggregated data: ', aggregatedData);

  const answer = {
    mostSpeeches: helpers.mostSpeechesIn(2012, aggregatedData),
    mostSecurity: helpers.mostSpeechesOnTopic(
      'Internal Security',
      aggregatedData,
    ),
    leastWordy: helpers.viewestWordsInTotal(aggregatedData),
  };

  res.status(200).send(answer);
});

app.listen(3100, () => {
  console.log('running...');
});

const extractUrls = (params) => {
  return Array.isArray(params) ? params : [params];
};
