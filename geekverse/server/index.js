import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 GeekVerse Backend Running");
});



app.get("/api/comics", async (req, res) => {
  try {
    const response = await axios.get(
      "https://comicvine.gamespot.com/api/issues/",
      {
        params: {
          api_key: process.env.COMICVINE_API_KEY,
          format: "json",
          sort: "date_added:desc",
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: "Failed to fetch comics",
    });
  }
});



app.get("/api/search", async (req, res) => {
  try {
    const response = await axios.get(
      "https://comicvine.gamespot.com/api/search/",
      {
        params: {
          api_key: process.env.COMICVINE_API_KEY,
          format: "json",
          query: req.query.query,
          resources: "issue",
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: "Search failed",
    });
  }
});


app.get("/api/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/issue/4000-${req.params.id}/`,
      {
        params: {
          api_key: process.env.COMICVINE_API_KEY,
          format: "json",
        },
      }
    );

    const comic = response.data.results;

    res.json({
      ...comic,
      characters: comic.character_credits || [],
      teams: comic.team_credits || [],
      locations: comic.location_credits || [],
      storyArcs: comic.story_arc_credits || [],
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch comic details",
    });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});