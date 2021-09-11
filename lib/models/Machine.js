import pool from '../utils/pool.js';

export default class Machine {
  id;
  ipdbId;
  title;
  type;
  manufacturer;
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

  constructor(row) {
    this.id = row.id;
    this.ipdbId = row.ipdb_id;
    this.title = row.title;
    this.type = row.type;
    this.manufacturer = row.manufacturer;
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
  }

  static async insert({ 
    ipdbId, 
    title, 
    type, 
    manufacturer, 
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
    sound
  }) {
    
    const { rows } = await pool.query(
      `INSERT INTO machines
      (ipdb_id, title, type, manufacturer, manufacture_date, production, mpu, theme, specialty, features, design, art, dots_animation, mechanics, sound)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [ipdbId, title, type, manufacturer, manufactureDate, production, mpu, theme, specialty, features, design, art, dotsAnimation, mechanics, sound]
    );

    return new Machine(rows[0]);
  }
}


