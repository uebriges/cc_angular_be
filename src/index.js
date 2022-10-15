const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
console.log('asdfkljdf');

app.get('/', async (req, res) => {
  if (!('url' in req.query)) res.end("No parameter 'url' is given.");
  const urlArr = extractUrls(req.query.url);
  console.log('urlArr: ', urlArr);
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

  console.log('csvArr: ', csvArr);

  res.send('This is the answer');
});

app.listen(3100, () => {
  console.log('running...');
});

const extractUrls = (params) => {
  return Array.isArray(params) ? params : [params];
};
