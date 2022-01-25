import pool from '../utils/pool.js';

export default class Image {
  id;
  machineId;
  credit;
  href;
  title;

  constructor(row) {
    this.id = row.id;
    this.machineId = row.machine_id;
    this.credit = row.credit;
    this.href = row.href;
    this.title = row.title;
  }

  static async findImageByUrl(url) {
    const { rows } = await pool.query(
      `SELECT * FROM images
      WHERE href = $1`,
      [url]
    );
    return rows[0];
  }

  static async findByMachine(id) {
    const { rows } = await pool.query(
      `SELECT * FROM images
      WHERE machine_id = $1`,
      [id]
    );
    return rows.map((row) => ({
      title: row.title,
      href: row.href,
      credit: row.credit,
    }));
  }

  static async insertOrFind(machineId, { credit, href, text }) {
    console.log(machineId, text);
    const existingFile = await this.findImageByUrl(href);

    if (existingFile) {
      return new Image(existingFile);
    }

    const { rows } = await pool.query(
      `INSERT INTO images
      (machine_id, title, href, credit)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [machineId, text, href, credit]
    );

    return new Image(rows[0]);
  }
}
