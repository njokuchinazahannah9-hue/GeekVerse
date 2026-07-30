import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import MovieCard from "../components/MovieCard";
import MovieRow from "../components/MovieRow";
import MoviesHero from "../components/MoviesHero";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        let response;

        if (search.trim()) {
          response = await tmdb.get(
            `/search/movie?query=${search}`
          );
        } else {
          response = await tmdb.get(
            `/movie/popular?page=1`
          );
        }

        setMovies(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
  }, [search]);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />
        <MoviesHero />

        <section className="trending">

          {/* Header */}

          <div className="movies-header">

            <h1>🎬 Movies</h1>

            <p>
              Discover thousands of movies from around the world.
            </p>

          </div>

          {/* Search */}

          <input
            className="movie-search"
            placeholder="Search Movies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* Search Results */}

          {search.trim() ? (

            <div>

              <div className="section-title">

                <h2>
                  Search Results
                </h2>

                <span>
                  {movies.length} Results
                </span>

              </div>

              <div className="movies-grid">

                {movies.map((movie) => (

                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average.toFixed(1)}
                    category={movie.release_date?.substring(
                      0,
                      4
                    )}
                  />

                ))}

              </div>

            </div>

          ) : (

            <>
              <MovieRow
                title="🔥 Popular Movies"
                endpoint="/movie/popular"
              />

              <MovieRow
                title="⭐ Top Rated"
                endpoint="/movie/top_rated"
              />

              <MovieRow
                title="🎬 Now Playing"
                endpoint="/movie/now_playing"
              />

              <MovieRow
                title="🚀 Upcoming"
                endpoint="/movie/upcoming"
              />

              <MovieRow
                title="💥 Action"
                endpoint="/discover/movie?with_genres=28"
              />

              <MovieRow
                title="🗺 Adventure"
                endpoint="/discover/movie?with_genres=12"
              />

              <MovieRow
                title="😂 Comedy"
                endpoint="/discover/movie?with_genres=35"
              />

              <MovieRow
                title="👻 Horror"
                endpoint="/discover/movie?with_genres=27"
              />

              <MovieRow
                title="❤️ Romance"
                endpoint="/discover/movie?with_genres=10749"
              />

              <MovieRow
                title="🚀 Science Fiction"
                endpoint="/discover/movie?with_genres=878"
              />

              <MovieRow
                title="🕵 Mystery"
                endpoint="/discover/movie?with_genres=9648"
              />

              <MovieRow
                title="🎭 Drama"
                endpoint="/discover/movie?with_genres=18"
              />

              <MovieRow
                title="👨‍👩‍👧 Family"
                endpoint="/discover/movie?with_genres=10751"
              />

              <MovieRow
                title="⚔ War"
                endpoint="/discover/movie?with_genres=10752"
              />

              <MovieRow
                title="📜 History"
                endpoint="/discover/movie?with_genres=36"
              />

              <MovieRow
                title="🎵 Music"
                endpoint="/discover/movie?with_genres=10402"
              />
            </>

          )}

        </section>
      </main>
    </div>
  );
}

export default Movies;