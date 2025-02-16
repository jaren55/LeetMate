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
    topics TEXT, 
    timezone TEXT
  )`);

  // Insert some dummy users
  const stmt = db.prepare("INSERT INTO users (name, level, topics, timezone) VALUES (?, ?, ?, ?)");
  stmt.run("Alice", "Intermediate", "Arrays, DP", "EST");
  stmt.run("Bob", "Beginner", "Strings, Sorting", "EST");
  stmt.run("Charlie", "Advanced", "Graphs, Recursion", "PST");
  stmt.run("Daisy", "Intermediate", "Bit Manipulation, Math", "CST");
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
  const { name, level, topics, timezone } = req.body; // Ensure timezone is also in the body
  if (!name || !level || !topics || !timezone) {
    return res.status(400).json({ error: "All fields (name, level, topics, timezone) are required" });
  }
  
  db.run("INSERT INTO users (name, level, topics, timezone) VALUES (?, ?, ?, ?)", [name, level, topics, timezone], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, level, topics, timezone });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
