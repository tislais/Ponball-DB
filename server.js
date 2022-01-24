/* eslint-disable no-console */
import app from './lib/app.js';
import pool from './lib/utils/pool.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('see yaa');
  pool.end();
});
