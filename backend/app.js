// app.js
import express from "express";
import sqlite3 from "sqlite3";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Initialize the table if it does not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL CHECK (length(content) >= 1 AND length(content) <= 1024),
        created_at INTEGER NOT NULL,
        status INTEGER NOT NULL DEFAULT 0 CHECK (status IN (0, 1)),
        completed_at INTEGER
    )`);
});

// Task Creation
app.post("/tasks", (req, res) => {
  const { content } = req.body;
  if (!content || content.length < 1 || content.length > 1024) {
    return res
      .status(400)
      .json({ error: "Task content must be between 1 and 1024 characters." });
  }

  const id = uuidv4();
  const createdAt = Date.now();

  db.run(
    "INSERT INTO tasks (id, content, created_at, status) VALUES (?, ?, ?, ?)",
    [id, content, createdAt, 0],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to create task." });
      }
      res.status(201).json({
        id,
        content,
        created_at: createdAt,
        status: 0,
        completed_at: null,
      });
    },
  );
});

// Get Task by ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch task." });
    }
    if (!row) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(row);
  });
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch tasks." });
    }
    res.json(rows);
  });
});

// Update Task Status
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (![0, 1].includes(status)) {
    return res.status(400).json({
      error: "Invalid task status. Use 0 for pending and 1 for completed.",
    });
  }

  const completedAt = status === 1 ? Date.now() : null;

  db.run(
    "UPDATE tasks SET status = ?, completed_at = ? WHERE id = ?",
    [status, completedAt, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update task." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Task not found." });
      }
      res.json({ id, status, completed_at: completedAt });
    },
  );
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete task." });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(204).end();
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
