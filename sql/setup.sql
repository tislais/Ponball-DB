DROP TABLE IF EXISTS machines;

CREATE TABLE machines (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ipdb_id BIGINT,
  title TEXT,
  type TEXT,
  manufacturer TEXT,
  manufacture_date TEXT,
  production TEXT,
  mpu TEXT,
  theme TEXT,
  specialty TEXT
)
