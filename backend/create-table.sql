-- create-table.sql
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL CHECK (length(content) >= 1 AND length(content) <= 1024),
    created_at INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 0 CHECK (status IN (0, 1)),
    completed_at INTEGER
);
