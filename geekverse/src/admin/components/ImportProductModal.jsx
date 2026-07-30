import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import {
  searchMovies,
  getPopularMovies,
} from "../services/movieService";

const IMAGE_URL = "https://image.tmdb.org/t/p/w200";

function ImportProductModal({
  open,
  onClose,
  onImport,
}) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    loadPopularMovies();
    setQuery("");
  }, [open]);

  async function loadPopularMovies() {
    try {
      setLoading(true);

      const data = await getPopularMovies();

      setMovies(data || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);

      const results = await searchMovies(value);

      setMovies(results || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleImport(movie) {
    if (!onImport) return;

    onImport(movie);

    onClose();
  }

  // IMPORTANT:
  // Hooks have already run above.
  // It is now safe to stop rendering.
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal import-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Import Movie</h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="movie-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search TMDB..."
              value={query}
              onChange={handleSearch}
            />
          </div>

          {loading ? (
            <p className="loading">
              Loading movies...
            </p>
          ) : movies.length === 0 ? (
            <p className="loading">
              No movies found.
            </p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_URL}${movie.poster_path}`
                        : "https://placehold.co/200x300?text=No+Image"
                    }
                    alt={movie.title}
                  />

                  <h4>{movie.title}</h4>

                  <p>
                    {movie.release_date || "Unknown"}
                  </p>

                  <button
                    className="save-btn"
                    onClick={() => handleImport(movie)}
                  >
                    Import
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportProductModal;