const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "university_info.json");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Fixed admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "123",
};

// Load university data from JSON file
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save university data to JSON file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
}

// Routes

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    req.session.admin = true;
    return res.json({ message: "Login successful" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
});

// Get all programs (user view)
app.get("/programs", (req, res) => {
  const data = loadData();
  res.json(data);
});

// Add a new program (admin only)
app.post("/admin/programs", (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const {
    major,
    university,
    curriculum,
    duration,
    tuition,
    location,
    contact,
  } = req.body;

  if (
    !major ||
    !university ||
    !curriculum ||
    !duration ||
    !tuition ||
    !location ||
    !contact
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = loadData();
  if (!data[major]) {
    data[major] = [];
  }

  data[major].push({
    university,
    curriculum,
    duration,
    tuition,
    location,
    contact,
  });

  saveData(data);
  res.json({ message: "Program added successfully" });
});

// Update an existing program (admin only)
app.put("/admin/programs", (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const {
    major,
    university,
    curriculum,
    duration,
    tuition,
    location,
    contact,
  } = req.body;

  if (
    !major ||
    !university ||
    !curriculum ||
    !duration ||
    !tuition ||
    !location ||
    !contact
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = loadData();

  if (!data[major]) {
    return res.status(404).json({ error: "Major not found" });
  }

  const programIndex = data[major].findIndex(
    (p) => p.university === university
  );

  if (programIndex === -1) {
    return res.status(404).json({ error: "Program not found" });
  }

  data[major][programIndex] = {
    university,
    curriculum,
    duration,
    tuition,
    location,
    contact,
  };

  saveData(data);
  res.json({ message: "Program updated successfully" });
});

// Delete a program (admin only)
app.delete("/admin/programs", (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { major, university } = req.body;

  if (!major || !university) {
    return res.status(400).json({ error: "Major and university are required" });
  }

  const data = loadData();

  if (!data[major]) {
    return res.status(404).json({ error: "Major not found" });
  }

  data[major] = data[major].filter((p) => p.university !== university);

  saveData(data);
  res.json({ message: "Program deleted successfully" });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "view_programs.html"));
});

app.get("/admin", (req, res) => {
  if (!req.session.admin) {
    return res.redirect("/login.html");
  }
  res.sendFile(path.join(__dirname, "public", "admin_dashboard.html"));
});

// Serve login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
