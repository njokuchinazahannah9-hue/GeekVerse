import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../services/tmdb";
import MovieCard from "./MovieCard";

function SimilarMovies() {
  const { id } = useParams();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await tmdb.get(`/movie/${id}/recommendations`);

        setMovies(response.data.results.slice(0, 8));
      } catch (error) {
        console.log(error);
      }
    }

    fetchRecommendations();
  }, [id]);

  return (
    <section className="similar-section">
      <h2>You May Also Like</h2>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
            category={movie.release_date?.substring(0, 4)}
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarMovies;