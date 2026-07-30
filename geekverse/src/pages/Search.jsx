import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import MovieCard from "../components/MovieCard";

import tmdb from "../services/tmdb";
import jikan from "../services/jikan";

function Search() {
  const [params] = useSearchParams();

  const query = params.get("q");

  const [movies, setMovies] = useState([]);
  const [manga, setManga] = useState([]);

  useEffect(() => {
    async function fetchResults() {
  // Search Movies
  try {
    const movieRes = await tmdb.get(
      `/search/movie?query=${query}`
    );

    setMovies(movieRes.data.results);
  } catch (err) {
    console.log("TMDB Error:", err);
    setMovies([]);
  }

  // Search Manga
  try {
    const mangaRes = await jikan.get(
      `/manga?q=${query}&limit=12`
    );

    setManga(mangaRes.data.data);
  } catch (err) {
    console.log("Jikan Error:", err);
    setManga([]);
  }
}

    fetchResults();
  }, [query]);

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-area">

        <TopNavbar />

        <section className="trending">

          <div className="trending-header">
            <div className="search-header">

  <h1 className="search-title">
    Search Results
  </h1>

  <p className="search-query">
    Results for
    <span>"{query}"</span>
  </p>

</div>
          </div>

         <div className="section-title">

  <h2>📚 Manga</h2>

  <span>
    {manga.length} Results
  </span>

</div>

          <div className="movies-grid">

            {movies.map((movie) => (

              <MovieCard
  key={movie.id}
  id={movie.id}
  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  title={movie.title}
  category={movie.release_date?.substring(0,4)}
  rating={movie.vote_average}
  type="movie"
/>
            ))}

          </div>

          <h3
            style={{
              marginTop: "60px",
              marginBottom: "20px",
            }}
          >
            📚 Manga
          </h3>

          <div className="movies-grid">

            {manga.map((item) => (

              <MediaCard
                key={item.mal_id}
                id={item.mal_id}
                image={item.images.jpg.large_image_url}
                title={item.title}
                subtitle={item.type}
                rating={item.score}
                type="manga"
              />

            ))}

          </div>

        </section>

      </main>

      

    </div>
  );
}

export default Search;