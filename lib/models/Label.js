import pool from '../utils/pool.js';

export default class Label {
  id;
  label;

  constructor(row) {
    this.id = row.id;
    this.label = row.label;
  }

  static async insert(label) {
    
    const { rows } = await pool.query(
      `INSERT INTO label
      (label)
      VALUES ($1)
      RETURNING *`,
      [label]
    );

    return new Label(rows[0]);
  }
}

