import tmdb from "../../services/tmdb";

export async function searchMovies(query) {
  try {
    const response = await tmdb.get("/search/movie", {
      params: {
        query,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("TMDB Search Error:", error);
    return [];
  }
}

export async function getPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular");

    return response.data.results;
  } catch (error) {
    console.error("TMDB Popular Error:", error);
    return [];
  }
}