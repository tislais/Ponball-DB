import pool from '../utils/pool.js';

export default class Manufacturer {
  manufacturerId;
  name;

  constructor(row) {
    this.manufacturerId = row.manufacturer_id;
    this.name = row.name;
  }

  static async findManufacturerByName(name) {
    const { rows } = await pool.query(
      `SELECT * FROM manufacturer 
      WHERE name = $1`, [name]
    );
    
    return rows[0];
  }

  static async insertOrFind(manufacturer) {
    const existingManufacturer = await this.findManufacturerByName(manufacturer);
           
    if (existingManufacturer) {
      return new Manufacturer(existingManufacturer);
    }

    const { rows } = await pool.query(
      `INSERT INTO manufacturer (name)
      VALUES ($1)
      RETURNING *`,
      [manufacturer]
    );

    return new Manufacturer(rows[0]);
  }
}
