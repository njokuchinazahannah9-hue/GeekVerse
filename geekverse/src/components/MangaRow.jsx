import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import MediaCard from "./MediaCard";

import mangadex from "../services/mangadex";
import { getCoverUrl } from "../services/mangaCover";

function MangaRow({ title, endpoint }) {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchRow() {
      try {
        setLoading(true);

        // Always include cover art
        const url = endpoint.includes("?")
          ? `${endpoint}&includes[]=cover_art`
          : `${endpoint}?includes[]=cover_art`;

        const response = await mangadex.get(url);

        const formatted = response.data.data
          .map((item) => ({
            id: item.id,

            title:
              item.attributes.title.en ||
              Object.values(item.attributes.title)[0] ||
              "Untitled",

            subtitle: item.attributes.status,

            image: getCoverUrl(
              item,
              item.relationships
            ),

            rating: "",
          }))
          .filter((item) => item.image);

        setManga(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRow();
  }, [endpoint]);

  function scrollLeft() {
    rowRef.current?.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    rowRef.current?.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
  }

  if (loading) {
    return null;
  }

  if (manga.length === 0) {
    return null;
  }

  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <h2>{title}</h2>

        <p className="view-all-link">
          View All →
        </p>
      </div>

      <div className="movie-row-wrapper">

        <button
          className="row-arrow left-arrow"
          onClick={scrollLeft}
        >
          <FiChevronLeft />
        </button>

        <div
          className="movie-row-scroll"
          ref={rowRef}
        >
          {manga.map((item) => (
            <div
              className="movie-item"
              key={item.id}
            >
              <MediaCard
                id={item.id}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rating={item.rating}
                type="manga"
              />
            </div>
          ))}
        </div>

        <button
          className="row-arrow right-arrow"
          onClick={scrollRight}
        >
          <FiChevronRight />
        </button>

      </div>
    </section>
  );
}

export default MangaRow;