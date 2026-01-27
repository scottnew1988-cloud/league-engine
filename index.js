import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/admin/generate-fixtures", (req, res) => {
  const { season_name } = req.body;

  if (!season_name) {
    return res.status(400).json({
      ok: false,
      error: "season_name is required"
    });
  }

  res.json({
    ok: true,
    message: "League Engine bootstrap received",
    season_name
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`League Engine running on port ${PORT}`);
});
