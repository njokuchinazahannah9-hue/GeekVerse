import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import tmdb from "../services/tmdb";
import MovieCard from "./MovieCard";

import "../styles/MovieRow.css";

function MovieRow({
  title,
  endpoint,
  viewAll = "/movies",
}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const rowRef = useRef();

  const navigate = useNavigate();

  // Reset whenever the row changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [endpoint]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await tmdb.get(
          `${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}`
        );

        setMovies((prev) => {
          const merged = [
            ...prev,
            ...response.data.results,
          ];

          // Remove duplicate movies by ID
          return merged.filter(
            (movie, index, self) =>
              index ===
              self.findIndex(
                (m) => m.id === movie.id
              )
          );
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
  }, [endpoint, page]);

  function next() {
    rowRef.current.scrollBy({
      left: 1200,
      behavior: "smooth",
    });

    const maxScroll =
      rowRef.current.scrollWidth -
      rowRef.current.clientWidth;

    if (
      rowRef.current.scrollLeft >
      maxScroll - 1500
    ) {
      setPage((prev) => prev + 1);
    }
  }

  function previous() {
    rowRef.current.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  }

  return (
    <section className="movie-row">

      <div className="movie-row-header">
        <h2>{title}</h2>

        <p
          className="view-all-link"
          onClick={() => navigate(viewAll)}
        >
          View All →
        </p>
      </div>

      <div className="movie-row-wrapper">

        <button
          className="row-arrow left-arrow"
          onClick={previous}
        >
          <FiChevronLeft />
        </button>

        <div
          className="movie-row-scroll"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <div
              className="movie-item"
              key={movie.id}
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                category={movie.release_date?.slice(
                  0,
                  4
                )}
              />
            </div>
          ))}
        </div>

        <button
          className="row-arrow right-arrow"
          onClick={next}
        >
          <FiChevronRight />
        </button>

      </div>

    </section>
  );
}

export default MovieRow;