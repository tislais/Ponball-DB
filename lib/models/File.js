import pool from '../utils/pool.js';

export default class File {
  id;
  machineId;
  info;
  ipdbUrl;
  category;

  constructor(row) {
    this.id = row.id;
    this.machineId = row.machine_id;
    this.info = row.info;
    this.ipdbUrl = row.ipdb_url;
    this.category = row.category;
  }

  static async findFileByUrl(url) {
    const { rows } = await pool.query(
      `SELECT * FROM files
      WHERE ipdb_url = $1`,
      [url]
    );

    return rows[0];
  }

  static async findByMachineAndCategory(machineId, category) {
    const { rows } = await pool.query(
      `SELECT * FROM files
      WHERE machine_id = $1
      AND category = $2`,
      [machineId, category]
    );
    return rows.map((row) => ({ text: row.info, url: row.ipdb_url }));
  }

  static async insertOrFind(machineId, file, category) {
    const existingFile = await this.findFileByUrl(file.link);

    if (existingFile) {
      return new File(existingFile);
    }

    const { rows } = await pool.query(
      `INSERT INTO files
      (machine_id, info, ipdb_url, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [machineId, file.text, file.link, category]
    );

    return new File(rows[0]);
  }
}
