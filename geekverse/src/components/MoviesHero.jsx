import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdb from "../services/tmdb";


function MoviesHero() {
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await tmdb.get(
          "/movie/popular?page=1"
        );

        setMovie(res.data.results[0]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchHero();
  }, []);

  if (!movie) return null;

  return (
    <section
      className="movies-hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="movies-hero-overlay">

        <span>🎬 Featured Movie</span>

        <h1>{movie.title}</h1>

        <p>
          {movie.overview}
        </p>

        <button
          onClick={() =>
            navigate(`/movie/${movie.id}`)
          }
        >
          More Details
        </button>

      </div>
    </section>
  );
}

export default MoviesHero;