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

// ✅ health check
app.get("/", (req, res) => {
  res.status(200).send("League Engine OK");
});

// ✅ the endpoint Base44 needs
app.post("/admin/generate-fixtures", async (req, res) => {
  const { season_name } = req.body || {};
  if (!season_name) {
    return res.status(400).json({ ok: false, error: "season_name is required" });
  }

  // TODO: replace this stub with your real fixture generation logic
  return res.status(200).json({
    ok: true,
    message: "generate-fixtures called",
    season_name
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("League Engine running on port", PORT));

