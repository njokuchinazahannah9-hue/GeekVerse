import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import mangadex from "../services/mangadex";
import { getCoverUrl } from "../services/mangaCover";

function MangaHero() {
  const [manga, setManga] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await mangadex.get("/manga", {
          params: {
            limit: 6,
            includes: ["cover_art"],
            availableTranslatedLanguage: ["en"],
            order: {
              followedCount: "desc",
            },
          },
        });

        console.log("MangaDex Response:", res.data);

        const formatted = res.data.data
          .map((item) => {
            const description =
              item.attributes.description?.en ||
              Object.values(item.attributes.description || {})[0] ||
              "No description available.";

            return {
              id: item.id,

              title:
                item.attributes.title?.en ||
                Object.values(item.attributes.title || {})[0] ||
                "Untitled",

              description: description
                .replace(/\[.*?\]\(.*?\)/g, "")
                .replace(/https?:\/\/\S+/g, "")
                .replace(/\*\*/g, "")
                .trim(),

              status: item.attributes.status || "Unknown",

              year: item.attributes.year || "Unknown",

              cover: getCoverUrl(
                item,
                item.relationships || []
              ),
            };
          })
          .filter((item) => item.cover);

        console.log("Formatted Manga:", formatted);

        setManga(formatted);
      } catch (err) {
        console.error("Hero Error:", err);
      }
    }

    fetchHero();
  }, []);

  console.log("Current Hero State:", manga);

  if (!manga.length) {
    return null;
  }

  const item = manga[currentSlide];

  function nextSlide() {
    setCurrentSlide((prev) =>
      prev === manga.length - 1 ? 0 : prev + 1
    );
  }

  function previousSlide() {
    setCurrentSlide((prev) =>
      prev === 0 ? manga.length - 1 : prev - 1
    );
  }

  return (
    <section
      className="manga-hero"
      style={{
        backgroundImage: `url(${item.cover})`,
      }}
    >
      <div className="manga-hero-overlay">

        <span className="hero-tag">
          📚 Featured Manga
        </span>

        <h1>{item.title}</h1>

        <div className="manga-meta">
          <span>📖 {item.status}</span>
          <span>📅 {item.year}</span>
        </div>

        <p className="hero-description">
          {item.description.length > 250
            ? item.description.slice(0, 250) + "..."
            : item.description}
        </p>

        <div className="hero-buttons">

          <button
            className="watch-btn"
            onClick={() =>
              navigate(`/manga/${item.id}`)
            }
          >
            📖 Read Now
          </button>

          <button
            className="details-btn"
            onClick={() =>
              navigate(`/manga/${item.id}`)
            }
          >
            Details
          </button>

        </div>

        <div className="hero-dots">
          {manga.map((_, index) => (
            <span
              key={index}
              className={
                currentSlide === index
                  ? "active-dot"
                  : ""
              }
              onClick={() =>
                setCurrentSlide(index)
              }
            />
          ))}
        </div>

      </div>

      <button
        className="hero-arrow left"
        onClick={previousSlide}
      >
        <FiChevronLeft />
      </button>

      <button
        className="hero-arrow right"
        onClick={nextSlide}
      >
        <FiChevronRight />
      </button>
    </section>
  );
}

export default MangaHero;