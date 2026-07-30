import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";
import MovieCard from "./MovieCard";

function TrendingSection() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const response = await tmdb.get("/trending/movie/week");
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <section className="trending">
      <div className="trending-header">
        <h2>🔥 Trending Now</h2>

        <button>View All</button>
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average.toFixed(1)}
            category={movie.release_date?.substring(0, 4)}
          />
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;