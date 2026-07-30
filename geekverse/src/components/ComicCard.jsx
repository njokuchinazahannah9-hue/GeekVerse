import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function ComicCard({ comic }) {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  function handleWishlist(e) {
    e.preventDefault();

    addToWishlist({
      ...comic,
      type: "comic",
    });

    alert(`${comic.name} added to wishlist!`);
  }

  function handleCart(e) {
    e.preventDefault();

    addToCart({
      ...comic,
      title: comic.name,
      image: comic.image?.medium_url,
      poster_path: null,
      vote_average: 8,
      release_date: comic.cover_date,
      type: "comic",
    });

    alert(`${comic.name} added to cart!`);
  }

  return (
    <Link
      to={`/comic/${comic.id}`}
      className="movie-link"
    >
      <div className="movie-card">
        <div className="movie-image">
          <img
            src={comic.image?.medium_url}
            alt={comic.name}
          />

          <span className="movie-rating">
            <FaStar />
            8.0
          </span>
        </div>

        <div className="movie-info">
          <h3>{comic.name}</h3>

          <p>{comic.volume?.name || "Comic Series"}</p>

          <div className="card-actions">
            <button
              className="wishlist-mini"
              onClick={handleWishlist}
            >
              <FiHeart />
            </button>

            <button
              className="cart-btn"
              onClick={handleCart}
            >
              <FiShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ComicCard;