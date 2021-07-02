import pool from '../utils/pool.js';

export default class Machine {
  id;
  ipdbId;
  title;
  type;
  manufacturer;
  manufactureDate;

  constructor(row) {
    this.id = row.id;
    this.ipdbId = row.ipdb_id;
    this.title = row.title;
    this.type = row.type;
    this.manufacturer = row.manufacturer;
    this.manufactureDate = row.manufacture_date;
  }

  static async insert({ ipdbId, title, type, manufacturer, manufactureDate }) {
    
    const { rows } = await pool.query(
      `INSERT INTO machines
      (ipdb_id, title, type, manufacturer, manufacture_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [ipdbId, title, type, manufacturer, manufactureDate]
    );

    return new Machine(rows[0]);
  }
}
