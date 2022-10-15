import express from 'express';

const app = express();
console.log('asdfkljdf');

// import fetch from 'node-fetch';

// // const fetch = require('node-fetch');
// // const express = require('express');

// const app = express();

app.get('/', (req: any, res: any) => {
  console.log('done');
  res.send('alsdfjlsd');
  // const response = fetch('https://www.patrick-buchner.me/assets/test.csv').then(
  //   (resp: any) => {
  //     console.log('response: ', resp);
  //   },
  // );
});

app.listen(3100, () => {
  console.log('running...');
});
