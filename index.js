import ingest from './lib/ingest.js';
import processPage from './lib/process.js';

ingest('https://www.ipdb.org/machine.cgi?id=6573')
  .then(html => processPage(html))
  .then(thing => console.log(thing));
