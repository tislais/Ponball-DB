import pool from '../utils/pool.js';

export default class Contributor {
  contributorId;
  name;

  constructor(row) {
    this.contributorId = row.contributor_id;
    this.name = row.name;
  }

  static async findContributorByName(name) {
    const { rows } = await pool.query(
      `SELECT * FROM contributor
      WHERE name = $1`, [name]
    );

    return rows[0];
  }


  static async insertOrFind(name) {

    const existingContributor = await this.findContributorByName(name);
    if (existingContributor) return new Contributor(existingContributor);


    const { rows } = await pool.query(
      `INSERT INTO contributor (name)
      VALUES ($1)
      RETURNING *`, 
      [name]
    );

    return new Contributor(rows[0]);
  }

  static async findByMachine(machine) {
    const { rows } = await pool.query(
      `SELECT name FROM contributor c
      FULL OUTER JOIN contributor_machine cm
      ON cm.contributor_id = c.contributor_id
      JOIN machine m
      ON cm.machine_id = m.machine_id
      WHERE m.machine_id = ($1) 
      `, [machine]
    );

    return rows.map(row => row.name);
  }
}
