import express from "express";
import cors from "cors";

const app = express();

// allow calls from your Base44 domain (and preview)
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"]
}));

app.use(express.json());

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.status(200).send("League Engine OK");
});

// =========================
// GENERATE FIXTURES
// =========================
app.post("/admin/generate-fixtures", async (req, res) => {
  const { season_name } = req.body || {};

  if (!season_name) {
    return res.status(400).json({
      ok: false,
      error: "season_name is required"
    });
  }

  console.log("📅 Generating fixtures for", season_name);

  // TODO: real fixture generation logic later
  return res.status(200).json({
    ok: true,
    message: "generate-fixtures called",
    season_name
  });
});

// =========================
// DAILY MATCH SIMULATION
// =========================
const CRON_SECRET = process.env.CRON_SECRET || "change-me";

app.post("/admin/simulate-day", async (req, res) => {
  const secret = req.header("x-cron-secret");

  if (secret !== CRON_SECRET) {
    return res.status(401).json({
      ok: false,
      error: "Unauthorized"
    });
  }

  console.log("⚽ Simulating today's matches...");

  // TODO: real match simulation logic later
  return res.json({
    ok: true,
    message: "simulate-day ran"
  });
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("League Engine running on port", PORT)
);

