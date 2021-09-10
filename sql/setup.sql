DROP TABLE IF EXISTS machines;

CREATE TABLE machines (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ipdb_id BIGINT,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  manufacture_date TEXT NOT NULL,
  production TEXT
)
