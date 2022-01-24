import pool from '../utils/pool.js';

export default class ContributorMachine {
  contributorId;
  machineId;
  roleType;


  constructor(row) {
    this.contributorId = row.contributor_id;
    this.machineId = row.machine_id;
    this.roleType = row.role_type;
  }

  static async insert(contributorId, machineId, roleType) {
    const { rows } = await pool.query(
      `INSERT INTO contributor_machine (contributor_id, machine_id, role_type)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [contributorId, machineId, roleType]
    );

    return new ContributorMachine(rows[0]);
  }

}

