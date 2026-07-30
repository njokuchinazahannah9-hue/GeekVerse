// Get wishlist
export function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// Save wishlist
export function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Add or remove movie
export function toggleWishlist(movie) {
  const wishlist = getWishlist();

  const exists = wishlist.find((item) => item.id === movie.id);

  if (exists) {
    const updated = wishlist.filter((item) => item.id !== movie.id);
    saveWishlist(updated);
    return false;
  }

  wishlist.push(movie);
  saveWishlist(wishlist);
  return true;
}

// Check if movie exists
export function isWishlisted(id) {
  return getWishlist().some((movie) => movie.id === id);
}