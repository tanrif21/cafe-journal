-- Run once in your Neon project's SQL Editor.
-- Does not delete or replace existing records.
CREATE TABLE IF NOT EXISTS cafe_group (
  id TEXT PRIMARY KEY,
  state TEXT NOT NULL,
  revision INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cafe_login_attempts (
  address TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  window_start BIGINT NOT NULL
);
