const BASE_URL = "http://localhost:5000/api";

export async function getPopularComics() {
  const response = await fetch(`${BASE_URL}/comics`);

  if (!response.ok) {
    throw new Error("Failed to fetch comics");
  }

  return await response.json();
}

export async function searchComics(query) {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search comics");
  }

  return await response.json();
}

export async function getComicDetails(id) {
  const response = await fetch(
    `http://localhost:5000/api/comics/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comic details");
  }

  return await response.json();
}