import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import ingest from '../lib/ingest.js';
import processPage from '../lib/process.js';
import { machineStub } from '../stub.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('gets name, date, and manufacturer via GET', async () => {
    const actual = await ingest(
      'https://www.ipdb.org/machine.cgi?id=2845'
    ).then((html) => processPage(html));
    const expected = machineStub;
    expect(actual).toEqual(expected);
  });
});
