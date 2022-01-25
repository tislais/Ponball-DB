import pool from '../utils/pool.js';

export default class Machine {
  machineId;
  ipdb;
  title;
  type;
  manufacturerId;
  date;
  manufacturer;
  production;
  mpuId;
  theme;
  specialty;
  features;
  design;
  art;
  dotsAnimation;
  mechanics;
  sound;
  software;
  notes;
  ruleSheets;
  roms;
  docs;

  constructor(row) {
    this.machineId = row.machine_id;
    this.ipdb = Number(row.ipdb_id);
    this.title = row.title;
    this.type = row.type;
    this.manufacturerId = row.manufacturer_id;
    this.date = row.manufacture_date;
    this.manufacturer = row.manufacturer_name;
    this.production = row.production;
    this.mpu = row.mpu_id;
    this.theme = row.theme;
    this.specialty = row.specialty;
    this.features = row.features;
    this.design = row.design;
    this.art = row.art;
    this.dotsAnimation = row.dots_animation;
    this.mechanics = row.mechanics;
    this.sound = row.sound;
    this.software = row.software;
    this.notes = row.notes;
    this.ruleSheets = row.rule_sheets;
    this.roms = row.roms;
    this.docs = row.docs;
  }

  static async insert({
    ipdbId,
    title,
    type,
    manufacturerId,
    manufactureDate,
    production,
    mpuId,
    theme,
    specialty,
    features,
    design,
    art,
    dotsAnimation,
    mechanics,
    sound,
    software,
    notes,
    ruleSheets,
    roms,
    docs,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO machine
      (ipdb_id, title, type, manufacturer_id, manufacture_date, production, mpu_id, specialty, design, art, dots_animation, mechanics, sound, software, rule_sheets, roms, docs, theme, features, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [
        ipdbId,
        title,
        type,
        manufacturerId,
        manufactureDate,
        production,
        mpuId,
        specialty,
        design,
        art,
        dotsAnimation,
        mechanics,
        sound,
        software,
        ruleSheets,
        roms,
        docs,
        theme,
        features,
        notes,
      ]
    );

    return new Machine(rows[0]);
  }

  static async findAll(query) {
    let { limit, offset } = query;
    if (!limit) {
      limit = 50;
    }
    if (!offset) {
      offset = 0;
    }
    const { rows } = await pool.query(
      `
      SELECT ipdb_id, title, manufacturer_name, manufacture_date FROM machine
      INNER JOIN manufacturer ON manufacturer.manufacturer_id = machine.manufacturer_id
      WHERE machine_id > $2
      LIMIT $1
    `,
      [limit, offset]
    );
    return rows.map((row) => new Machine(row));
  }

  static async findByIpdbId(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM machine WHERE ipdb_id=($1)
    `,
      [id]
    );
    return rows[0];
  }
}
