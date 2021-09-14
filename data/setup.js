import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default (pool) => {
  return fs.readFile('./sql/setup.sql', { encoding: 'utf-8' })
    .then(sql => pool.query(sql));
};
