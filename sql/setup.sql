DROP TABLE IF EXISTS machine, label, manufacturer, mpu, contributor, contributor_machine;

CREATE TABLE manufacturer (
  manufacturer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  manufacturer_name TEXT,
  manufacturer_trade_name TEXT,
  manufacturer_first_year INT4,
  manufacturer_last_year INT4
);

CREATE TABLE mpu (
  mpu_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT
);

CREATE TABLE machine (
  machine_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ipdb_id BIGINT,
  title TEXT,
  type TEXT,
  manufacturer_id BIGINT,
  manufacture_date TEXT,
  production BIGINT,
  mpu_id BIGINT,
  design TEXT[],
  art TEXT[],
  dots_animation TEXT[],
  mechanics TEXT[],
  sound TEXT[],
  software TEXT[],
  specialty TEXT,
  rule_sheets JSONB[],
  roms JSONB[],
  docs JSON[],
  CONSTRAINT fk_manufacturer FOREIGN KEY(manufacturer_id) REFERENCES manufacturer(manufacturer_id),
  CONSTRAINT fk_mpu FOREIGN KEY(mpu_id) REFERENCES mpu(mpu_id),
  features TEXT,
  notes TEXT,
  theme TEXT
);

CREATE TABLE contributor (
  contributor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT
);

CREATE TABLE contributor_machine (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contributor_id BIGINT REFERENCES contributor(contributor_id),
  machine_id BIGINT REFERENCES machine(machine_id),
  role_type TEXT
);

CREATE TABLE label (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label TEXT
);

