import ingest from './lib/ingest.js';
import processPage from './lib/process.js';
import store from './lib/store.js';
import dotenv from 'dotenv';
import pool from './lib/utils/pool.js';
import setup from './data/setup.js';

dotenv.config();

setup(pool);

[...Array(1000)].map((_, i) => {
  setTimeout (() => {
    ingest(`https://www.ipdb.org/machine.cgi?id=${i + 3325}`)
      .then(html => processPage(html))
      .then(machine => {
        console.log(machine[0].title);
        store(machine);
      });
  }, i * 1000);
});


