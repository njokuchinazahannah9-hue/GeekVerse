import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";

function WhatsNew() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await tmdb.get("/movie/now_playing");

        setMovies(res.data.results.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    }

    getMovies();
  }, []);

  return (
    <div className="whats-new">
      <div className="section-title">
        <h3>What's New</h3>

        <button>View All</button>
      </div>

      {movies.map((movie) => (
        <div className="new-item" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="new-info">
            <h4>{movie.title}</h4>

            <p>Now Playing</p>
          </div>

          <span>${(movie.vote_average + 5).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

export default WhatsNew;