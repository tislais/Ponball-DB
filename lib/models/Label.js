import pool from '../utils/pool.js';

export default class Label {
  id;
  label;

  constructor(row) {
    this.id = row.id;
    this.label = row.label;
  }

  static async findLabelByText(text) {
    const { rows } = await pool.query(
      `SELECT * FROM label 
      WHERE label = $1`, [text]
    );
    
    return rows[0];
  }

  static async insertOrFind(label) {
    const existingLabel = await this.findLabelByText(label);

    if (existingLabel) {
      return new Label(existingLabel);
    }
    
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

