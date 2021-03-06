/* eslint-disable no-console */
import ingest from './lib/ingest.js';
import processPage from './lib/process.js';
import store from './lib/store.js';
import dotenv from 'dotenv';
import pool from './lib/utils/pool.js';
import setup from './data/setup.js';

dotenv.config();
setup(pool);

// app go brr
[...Array(6841)].map((_, i) => {
  setTimeout(() => {
    ingest(`https://www.ipdb.org/machine.cgi?id=${i}`)
      .then((html) => processPage(html))
      .then((machine) => {
        console.log(machine[0].title);
        store(machine);
      });
  }, i * 1000);
});
