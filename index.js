import ingest from './lib/ingest.js';
import processPage from './lib/process.js';
import store from './lib/store.js';
import dotenv from 'dotenv';
import pool from './lib/utils/pool.js';
import setup from './data/setup.js';

dotenv.config();
setup(pool);

[...Array(50)].map((_, i) => {
  ingest(`https://www.ipdb.org/machine.cgi?id=${i + 1}`)
    .then(html => processPage(html))
    .then(machines => {
      console.log(machines);
      store(machines);
    });
});



