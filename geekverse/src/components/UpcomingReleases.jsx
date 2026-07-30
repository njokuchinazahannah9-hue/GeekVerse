import { useEffect, useState } from "react";

function UpcomingReleases() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        const data = await res.json();

        setMovies(data.results.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    }

    fetchUpcoming();
  }, []);

  return (
    <div className="upcoming-card">
      <h3>📅 Upcoming Releases</h3>

      {movies.map((movie) => (
        <div
          key={movie.id}
          className="upcoming-item"
        >
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
          />

          <div>
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingReleases;