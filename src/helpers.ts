import { readFile } from 'node:fs/promises';
import postgres from 'postgres';

interface IEnsemblAssembly {
  common_name: string | null;
  ensembl_url: string | null;
  example_chromosome: string | null;
}

// Get data from a public DB
const retrieveEnsemblAssemblyData = async (): Promise<IEnsemblAssembly[]> => {
  const sql = postgres(
    'postgres://reader:NWDMCE5xdipIjRrp@hh-pgsql-public.ebi.ac.uk:5432/pfmegrnargs',
  );

  const ensemblAssemblies = await sql<IEnsemblAssembly[]>`
  SELECT
    common_name,
    ensembl_url,
    example_chromosome
  FROM ensembl_assembly`;

  return ensemblAssemblies;
};

let errorMessage;

// Get data from the file system
const readDataFromFile = async () => {
  try {
    const contents = await readFile('package.json', { encoding: 'utf8' });
    return contents;
  } catch (err) {
    console.log('err: ', err);
    errorMessage =
      err instanceof Error ? err.message : (errorMessage = String(err));

    console.log('Error: ', errorMessage);
    return errorMessage;
  }
};

export { IEnsemblAssembly, readDataFromFile, retrieveEnsemblAssemblyData };
