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
}
