import { QueryFile, IQueryFileOptions } from 'pg-promise';
import * as path from 'path';

function sql(file: string): QueryFile {
  const fullPath: string = path.join(__dirname, file);

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}

export const meetupQueries = {
  getAll: sql('meetup/getAll.sql'),
  getById: sql('meetup/getById.sql'),
  deleteById: sql('meetup/deleteById.sql'),
  create: sql('meetup/create.sql'),
};
