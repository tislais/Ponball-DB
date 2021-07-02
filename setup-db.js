import pool from './lib/utils/pool.js';
import setup from './data/setup.js';
import dotenv from 'dotenv';

dotenv.config();

setup(pool);
