import 'dotenv/config';
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
  getAll: sql('meetup/selectAll.sql'),
  getById: sql('meetup/selectById.sql'),
  deleteById: sql('meetup/deleteById.sql'),
  create: sql('meetup/create.sql'),
};

export const userQueries = {
  create: sql('user/create.sql'),
  getByEmail: sql('user/selectByEmail.sql'),
  getById: sql('user/selectById.sql'),
  updateRefreshToken: sql('user/updateRefreshToken.sql'),
};
