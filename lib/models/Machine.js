import pool from '../utils/pool.js';

export default class Machine {
  id;
  ipdbId;
  title;
  type;
  manufacturerId;
  manufactureDate;
  production;
  mpu;
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
    this.id = row.id;
    this.ipdbId = row.ipdb_id;
    this.title = row.title;
    this.type = row.type;
    this.manufacturerId = row.manufacturer_id;
    this.manufactureDate = row.manufacture_date;
    this.production = row.production;
    this.mpu = row.mpu;
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
    mpu,
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
    docs
  }) {
    
    const { rows } = await pool.query(
      `INSERT INTO machine
      (ipdb_id, title, type, manufacturer_id, manufacture_date, production, mpu, theme, specialty, features, design, art, dots_animation, mechanics, sound, software, notes, rule_sheets, roms, docs)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [ipdbId, title, type, manufacturerId, manufactureDate, production, mpu, theme, specialty, features, design, art, dotsAnimation, mechanics, sound, software, notes, ruleSheets, roms, docs]
    );

    return new Machine(rows[0]);
  }
}

