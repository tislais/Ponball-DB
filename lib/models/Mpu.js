import pool from '../utils/pool.js';

export default class Mpu {
  mpuId;
  name;

  constructor(row) {
    this.mpuId = row.mpu_id;
    this.name = row.name;
  }

  static async findMpuByName(name) {
    const { rows } = await pool.query(
      `SELECT * FROM mpu
      WHERE name = $1`, [name]
    );

    return rows[0];
  }

  static async insertOrFind(name) {
    const existingMpu = await this.findMpuByName(name);
    
    if (existingMpu) return new Mpu(existingMpu);

    const { rows } = await pool.query(
      `INSERT INTO mpu (name)
      VALUES ($1)
      RETURNING *`, [name]
    );

    return new Mpu(rows[0]);
  }
}

