const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
console.log('asdfkljdf');

app.get('/', (req, res) => {
  if (!('url' in req.query)) res.end("No parameter 'url' is given.");
  const urlArr = extractUrls(req.query.url);
  console.log('urlArr: ', urlArr);

  urlArr.map((url) => {
    const response = fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log('text: ', text);
        res.send('This is the answer');
      });
  });
});

app.listen(3100, () => {
  console.log('running...');
});

const extractUrls = (params) => {
  return Array.isArray(params) ? params : [params];
};
