import postgres from 'postgres';

interface IEnsemblAssembly {
  common_name: string | null;
  ensembl_url: string | null;
  example_chromosome: string | null;
}

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

export { IEnsemblAssembly, retrieveEnsemblAssemblyData };
