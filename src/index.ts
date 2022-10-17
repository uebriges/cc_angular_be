import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch';
import Papa from 'papaparse';
import {
  extractUrls,
  mostSpeechesIn,
  mostSpeechesOnTopic,
  viewestWordsInTotal,
} from './helpers';
import { IData } from './types';

// const express = require('express');
// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const Papa = require('papaparse');
const helpers = require('./helpers');

const app: Express = express();
let aggregatedData: IData[] = [];

app.get('/', async (req: Request, res: Response) => {
  if (!('url' in req.query)) res.end("No parameter 'url' is given.");

  const urlArr = extractUrls(req.query.url as string | string[]);
  let response;
  let text;
  let csvArr: string[] = [];
  let data: IData[];

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
    data = Papa.parse<IData>(csv, {
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
    mostSpeeches: mostSpeechesIn(2012, aggregatedData),
    mostSecurity: mostSpeechesOnTopic('Internal Security', aggregatedData),
    leastWordy: viewestWordsInTotal(aggregatedData),
  };

  res.status(200).send(answer);
});

app.listen(3100, () => {
  console.log('running...');
});
