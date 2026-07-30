// Get Cart
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save Cart
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add Movie
export function addToCart(movie) {
  const cart = getCart();

  const exists = cart.find((item) => item.id === movie.id);

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({
      ...movie,
      quantity: 1,
      price:
        Math.floor(movie.vote_average * 4) + 9.99,
    });
  }

  saveCart(cart);
}

// Remove Movie
export function removeFromCart(id) {
  const cart = getCart().filter(
    (movie) => movie.id !== id
  );

  saveCart(cart);
}

// Increase Quantity
export function increaseQuantity(id) {
  const cart = getCart();

  const item = cart.find(
    (movie) => movie.id === id
  );

  if (item) item.quantity++;

  saveCart(cart);
}

// Decrease Quantity
export function decreaseQuantity(id) {
  const cart = getCart();

  const item = cart.find(
    (movie) => movie.id === id
  );

  if (item && item.quantity > 1) {
    item.quantity--;
  }

  saveCart(cart);
}