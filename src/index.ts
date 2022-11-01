import express, { Express, Request, Response } from 'express';
import { retrieveEnsemblAssemblyData } from './helpers.js';

const app: Express = express();
// let aggregatedData: IData[] = [];

app.get('/', async (req: Request, res: Response) => {
  console.log('This is my gene app');

  const data = await retrieveEnsemblAssemblyData();

  res.status(200).send(data);
});

app.listen(3100, () => {
  console.log('running...');
});
