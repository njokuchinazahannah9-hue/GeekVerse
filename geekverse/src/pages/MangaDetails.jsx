import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import mangadex from "../services/mangadex";
import { getCoverUrl } from "../services/mangaCover";

import "../styles/mangadetails.css";

function MangaDetails() {
  const { id } = useParams();

  const [manga, setManga] = useState(null);
  const [cover, setCover] = useState("");

  useEffect(() => {
    async function fetchManga() {
      try {
        const response = await mangadex.get(
          `/manga/${id}?includes[]=cover_art`
        );

        const data = response.data.data;

        setManga(data);

        setCover(
          getCoverUrl(
            data,
            data.relationships
          )
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchManga();
  }, [id]);

  if (!manga) {
    return (
      <h2 className="loading">
        Loading...
      </h2>
    );
  }

  const attr = manga.attributes;

  const title =
    attr.title.en ||
    Object.values(attr.title)[0] ||
    "Untitled";

  const description = (
    attr.description.en ||
    Object.values(
      attr.description || {}
    )[0] ||
    "No description available."
  )
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return (
    <div className="manga-details">

      {/* Backdrop */}

      <div
        className="manga-backdrop"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="manga-overlay"></div>
      </div>

      {/* Content */}

      <div className="manga-container">

        <img
          className="manga-poster"
          src={cover}
          alt={title}
        />

        <div className="manga-content">

          <h1>{title}</h1>

          <div className="manga-meta">

            <span>
              📖 {attr.status}
            </span>

            <span>
              🔞 {attr.contentRating}
            </span>

            <span>
              📅 {attr.year || "Unknown"}
            </span>

            <span>
              🌍{" "}
              {attr.originalLanguage?.toUpperCase()}
            </span>

          </div>

          <div className="genres">

            {attr.tags
              ?.filter(
                (tag) =>
                  tag.attributes.name.en
              )
              .map((tag) => (
                <span key={tag.id}>
                  {tag.attributes.name.en}
                </span>
              ))}

          </div>

          <p className="overview">
            {description}
          </p>

          <div className="movie-buttons">

            <button className="watch-btn">
              📖 Read Manga
            </button>

            <button className="wishlist-btn">
              ❤️ Add Wishlist
            </button>

          </div>

          <div className="movie-stats">

            <div>

              <span>Status</span>

              <h4>
                {attr.status}
              </h4>

            </div>

            <div>

              <span>Content Rating</span>

              <h4>
                {attr.contentRating}
              </h4>

            </div>

            <div>

              <span>Year</span>

              <h4>
                {attr.year || "Unknown"}
              </h4>

            </div>

            <div>

              <span>Language</span>

              <h4>
                {attr.originalLanguage?.toUpperCase()}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MangaDetails;