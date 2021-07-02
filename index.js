import ingest from './lib/ingest.js';
import processPage from './lib/process.js';
import store from './lib/store.js';
import dotenv from 'dotenv';

dotenv.config();

ingest('https://www.ipdb.org/machine.cgi?id=6575')
  .then(html => processPage(html))
  .then(machines => {
    console.log(machines);
    store(machines);
  });
