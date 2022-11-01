import express, { Express, Request, Response } from 'express';
import { readDataFromFile, retrieveEnsemblAssemblyData } from './helpers.js';

const app: Express = express();

// Endpoint for retrieving data from DB
app.get('/getDataFromDB', async (req: Request, res: Response) => {
  console.log('Retrieving data from a DB');

  const data = await retrieveEnsemblAssemblyData();

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.status(200).send(data);
});

// Endpoint for retrieving data from a file
app.get('/readFileData', async (req: Request, res: Response) => {
  console.log('Retrieving data from a file');

  const fileData = await readDataFromFile();

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.status(200).send(fileData);
});

// Starting the backend ....
app.listen(3100, () => {
  console.log('running...');
});
