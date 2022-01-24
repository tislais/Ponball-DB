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
      WHERE name = $1`,
      [name]
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
      `SELECT name FROM machine m
      LEFT JOIN contributor_machine cm
      ON cm.machine_id = m.machine_id
      LEFT JOIN contributor c
      ON c.contributor_id = cm.contributor_id
      WHERE m.ipdb_id = $1
      `,
      [machine]
    );

    return rows.map((row) => row.name);
  }

  static async findByMachineAndRoleType(machine, roleType) {
    const { rows } = await pool.query(
      `SELECT name FROM machine m
      LEFT JOIN contributor_machine cm
      ON cm.machine_id = m.machine_id
      LEFT JOIN contributor c
      ON c.contributor_id = cm.contributor_id
      WHERE m.ipdb_id = $1
      AND cm.role_type = $2
      `,
      [machine, roleType]
    );
    return rows.map((row) => row.name);
  }
}
