import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import tmdb from "../services/tmdb";
import { useWishlist } from "../context/WishlistContext";

import "../styles/HeroBanner.css";

function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const navigate = useNavigate();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  // Fetch Trending Movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await tmdb.get(
          "/trending/movie/week"
        );

        setMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, []);

  // Auto Slider
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === movies.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // Fetch Trailer
  useEffect(() => {
    if (movies.length === 0) return;

    async function fetchTrailer() {
      try {
        const movie = movies[currentSlide];

        const response = await tmdb.get(
          `/movie/${movie.id}/videos`
        );

        const trailer = response.data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey("");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrailer();
  }, [currentSlide, movies]);

  function nextSlide() {
    setCurrentSlide((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1
    );
  }

  function previousSlide() {
    setCurrentSlide((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  }

  if (movies.length === 0) {
    return (
      <section className="hero-banner">
        <h2>Loading...</h2>
      </section>
    );
  }

  const movie = movies[currentSlide];

  const isWishlisted = wishlist.some(
    (item) => item.id === movie.id
  );

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(5,5,10,.25),
            rgba(5,5,10,.9)
          ),
          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
        `,
      }}
    >
      <div className="hero-overlay">

        <span className="hero-tag">
          🔥 Trending Now
        </span>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>
            ⭐ {movie.vote_average.toFixed(1)}
          </span>

          <span>
            📅 {movie.release_date?.slice(0, 4)}
          </span>
        </div>

        <p className="hero-description">
          {movie.overview}
        </p>

        <div className="hero-buttons">

          <button
            className="watch-btn"
            onClick={() => setShowTrailer(true)}
          >
            ▶ Watch Trailer
          </button>

          <button
            className="wishlist-btn"
            onClick={() => {
              if (isWishlisted) {
                removeFromWishlist(movie.id);
              } else {
                addToWishlist(movie);
              }
            }}
          >
            {isWishlisted ? (
              <FaHeart />
            ) : (
              <FiHeart />
            )}

            {isWishlisted
              ? "Saved"
              : "My List"}
          </button>

          <button
            className="details-btn"
            onClick={() =>
              navigate(`/movie/${movie.id}`)
            }
          >
            More Details
          </button>

        </div>

        <div className="hero-dots">

          {movies.map((_, index) => (
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
        ❮
      </button>

      <button
        className="hero-arrow right"
        onClick={nextSlide}
      >
        ❯
      </button>

      {showTrailer && trailerKey && (

        <div
          className="trailer-modal"
          onClick={() =>
            setShowTrailer(false)
          }
        >

          <div
            className="trailer-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={movie.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

          </div>

        </div>

      )}

    </section>
  );
}

export default HeroBanner;