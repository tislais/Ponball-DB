DROP TABLE IF EXISTS machine;
DROP TABLE IF EXISTS label;

CREATE TABLE machine (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ipdb_id BIGINT,
  title TEXT,
  type TEXT,
  manufacturer TEXT,
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
  docs JSON[]
);

CREATE TABLE label (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label TEXT
)
