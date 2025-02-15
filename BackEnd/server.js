const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // To parse JSON data

// Set up SQLite database
const db = new sqlite3.Database(":memory:");

// Create users table
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    level TEXT,
    topics TEXT
  )`);

  // Insert some dummy users
  const stmt = db.prepare("INSERT INTO users (name, level, topics) VALUES (?, ?, ?)");
  stmt.run("Alice", "Intermediate", "Arrays, DP");
  stmt.run("Bob", "Beginner", "Strings, Sorting");
  stmt.run("Charlie", "Advanced", "Graphs, Recursion");
  stmt.run("Daisy", "Intermediate", "Bit Manipulation, Math");
  stmt.finalize();
});

// API to get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API to add a new user
app.post("/users", (req, res) => {
  const { name, level, topics } = req.body;
  db.run("INSERT INTO users (name, level, topics) VALUES (?, ?, ?)", [name, level, topics], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, level, topics });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
