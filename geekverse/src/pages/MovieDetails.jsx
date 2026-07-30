import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../services/tmdb";
import SimilarMovies from "../components/SimilarMovies";
import {
  toggleWishlist,
  isWishlisted,
} from "../utils/wishlist";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // Movie Details
        const movieRes = await tmdb.get(`/movie/${id}`);
        setMovie(movieRes.data);

        // Check Wishlist
        setSaved(isWishlisted(movieRes.data.id));

        // Cast
        const castRes = await tmdb.get(`/movie/${id}/credits`);
        setCast(castRes.data.cast.slice(0, 8));

        // Trailer
        const videoRes = await tmdb.get(`/movie/${id}/videos`);

        const officialTrailer = videoRes.data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (officialTrailer) {
          setTrailer(officialTrailer.key);
        } else {
          setTrailer("");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <h2 className="loading">Loading...</h2>;
  }

  function handleWishlist() {
    const status = toggleWishlist(movie);
    setSaved(status);
  }

  return (
    <div className="movie-details">
      {/* Backdrop */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="overlay"></div>
      </div>

      {/* Movie Info */}
      <div className="details-container">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="movie-content">
          <h1>{movie.title}</h1>

          <div className="movie-meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
          </div>

          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p className="overview">{movie.overview}</p>

          <div className="movie-buttons">
            <button
              className="watch-btn"
              onClick={() => setShowTrailer(true)}
              disabled={!trailer}
            >
              ▶ Watch Trailer
            </button>

            <button
              className={`wishlist-btn ${saved ? "saved" : ""}`}
              onClick={handleWishlist}
            >
              {saved ? "❤️ Saved" : "🤍 Add to Wishlist"}
            </button>
          </div>

          <div className="movie-stats">
            <div>
              <span>Runtime</span>
              <h4>{movie.runtime} min</h4>
            </div>

            <div>
              <span>Language</span>
              <h4>{movie.original_language.toUpperCase()}</h4>
            </div>

            <div>
              <span>Popularity</span>
              <h4>{Math.round(movie.popularity)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <section className="cast-section">
        <h2>Top Cast</h2>

        <div className="cast-grid">
          {cast.map((actor) => (
            <div className="cast-card" key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
              />

              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Movies */}
      <SimilarMovies />

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="trailer-modal"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;