DROP TABLE IF EXISTS machine;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS manufacturer;

CREATE TABLE manufacturer (
  manufacturer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  trade_name TEXT
);

CREATE TABLE machine (
  machine_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ipdb_id BIGINT,
  title TEXT,
  type TEXT,
  manufacturer_id BIGINT,
  manufacture_date TEXT,
  production TEXT,
  mpu TEXT,
  theme TEXT,
  specialty TEXT,
  features TEXT,
  design TEXT[],
  art TEXT[],
  dots_animation TEXT[],
  mechanics TEXT[],
  sound TEXT[],
  software TEXT[],
  notes TEXT,
  rule_sheets JSONB[],
  roms JSONB[],
  docs JSON[],
  CONSTRAINT fk_manufacturer FOREIGN KEY(manufacturer_id) REFERENCES manufacturer(manufacturer_id)
);

CREATE TABLE label (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label TEXT
);

