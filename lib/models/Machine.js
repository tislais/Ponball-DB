import pool from '../utils/pool.js';

export default class Machine {
  id;
  ipdbId;
  title;
  type;
  manufacturer;
  manufactureDate;
  production;

  constructor(row) {
    this.id = row.id;
    this.ipdbId = row.ipdb_id;
    this.title = row.title;
    this.type = row.type;
    this.manufacturer = row.manufacturer;
    this.manufactureDate = row.manufacture_date;
    this.production = row.production;
  }

  static async insert({ ipdbId, title, type, manufacturer, manufactureDate, production }) {
    
    const { rows } = await pool.query(
      `INSERT INTO machines
      (ipdb_id, title, type, manufacturer, manufacture_date, production)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [ipdbId, title, type, manufacturer, manufactureDate, production]
    );

    return new Machine(rows[0]);
  }
}
