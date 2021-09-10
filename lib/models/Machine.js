import pool from '../utils/pool.js';

export default class Machine {
  id;
  ipdbId;
  title;
  type;
  manufacturer;
  manufactureDate;
  production;
  mpu;
  theme;

  constructor(row) {
    this.id = row.id;
    this.ipdbId = row.ipdb_id;
    this.title = row.title;
    this.type = row.type;
    this.manufacturer = row.manufacturer;
    this.manufactureDate = row.manufacture_date;
    this.production = row.production;
    this.mpu = row.mpu;
    this.theme = row.theme;
  }

  static async insert({ 
    ipdbId, 
    title, 
    type, 
    manufacturer, 
    manufactureDate, 
    production, 
    mpu,
    theme }) {
    
    const { rows } = await pool.query(
      `INSERT INTO machines
      (ipdb_id, title, type, manufacturer, manufacture_date, production, mpu, theme)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [ipdbId, title, type, manufacturer, manufactureDate, production, mpu, theme]
    );
    console.log(rows[0]);

    return new Machine(rows[0]);
  }
}
