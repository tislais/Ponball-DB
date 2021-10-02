import pool from '../utils/pool.js';

export default class Manufacturer {
  manufacturerId;
  name;
  tradeName;
  firstYear;
  lastYear;

  constructor(row) {
    this.manufacturerId = row.manufacturer_id;
    this.name = row.name;
    this.tradeName = row.trade_name;
    this.firstYear = row.first_year;
  }

  static async findManufacturerByName(name) {
    const { rows } = await pool.query(
      `SELECT * FROM manufacturer 
      WHERE name = $1`, [name]
    );
    
    return rows[0];
  }

  static async insertOrFind(manufacturer, tradeName, firstYear, lastYear) {
    const existingManufacturer = await this.findManufacturerByName(manufacturer);

    if (existingManufacturer) {
      return new Manufacturer(existingManufacturer);
    }

    const { rows } = await pool.query(
      `INSERT INTO manufacturer (name, trade_name, first_year, last_year)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [manufacturer, tradeName, firstYear, lastYear]
    );

    return new Manufacturer(rows[0]);
  }
}
