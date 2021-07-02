import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import ingest from '../lib/ingest.js';
import processPage from '../lib/process.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets name, date, and manufacturer via GET', async () => {

    const actual = await ingest('https://www.ipdb.org/machine.cgi?id=6573')
      .then(html => processPage(html));

    const expected = {
      name: 'Jurassic Park (Pro)',
      manufacturer: 'Stern Pinball',
      date: 'August, 2019'
    };
    
    expect(actual).toEqual(expected);
  });

});
