require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");

const app = express();
const PORT = 3000;

// GitHub Configuration
const GITHUB_OWNER = "Devsfong";
const GITHUB_REPO = "test_json";
const FILE_PATH = "university_info.json";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is set in your environment

if (!GITHUB_TOKEN) {
  console.error("Error: GITHUB_TOKEN is not set in the environment variables.");
  process.exit(1);
}

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

// Helper function to get file content
async function getFileContent() {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
  const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };

  try {
    const response = await axios.get(url, { headers });
    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    return { content, sha: response.data.sha };
  } catch (error) {
    console.error("Error fetching file:", error.response.data);
    throw error;
  }
}

// Helper function to update file content
async function updateFileContent(newContent, sha) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
  const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };
  const data = {
    message: "Update university_info.json",
    content: Buffer.from(newContent).toString("base64"),
    sha,
  };

  try {
    await axios.put(url, data, { headers });
  } catch (error) {
    console.error("Error updating file:", error.response.data);
    throw error;
  }
}

// Load university data from GitHub
async function loadData() {
  const { content } = await getFileContent();
  return JSON.parse(content);
}

// Save university data to GitHub
async function saveData(data) {
  const { sha } = await getFileContent();
  await updateFileContent(JSON.stringify(data, null, 4), sha);
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
app.get("/programs", async (req, res) => {
  const data = await loadData();
  res.json(data);
});

// Add a new program (admin only)
app.post("/admin/programs", async (req, res) => {
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

  const data = await loadData();
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

  await saveData(data);
  res.json({ message: "Program added successfully" });
});

// Update an existing program (admin only)
app.put("/admin/programs", async (req, res) => {
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

  const data = await loadData();

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

  await saveData(data);
  res.json({ message: "Program updated successfully" });
});

// Delete a program (admin only)
app.delete("/admin/programs", async (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { major, university } = req.body;

  if (!major || !university) {
    return res.status(400).json({ error: "Major and university are required" });
  }

  const data = await loadData();

  if (!data[major]) {
    return res.status(404).json({ error: "Major not found" });
  }

  data[major] = data[major].filter((p) => p.university !== university);

  await saveData(data);
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
