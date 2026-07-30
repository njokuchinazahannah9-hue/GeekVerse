import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function MediaCard({
  id,
  image,
  title,
  subtitle,
  rating,
  type = "movie",
}) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  function handleAddToCart(e) {
    e.preventDefault();

    addToCart({
      id,
      title,
      image,
      poster_path: image.includes("image.tmdb.org")
        ? image.replace(
            "https://image.tmdb.org/t/p/w500",
            ""
          )
        : null,
      vote_average: Number(rating) || 0,
      release_date: subtitle,
      type,
    });

    alert(`${title} added to cart!`);
  }

  function handleWishlist(e) {
    e.preventDefault();

    addToWishlist({
      id,
      title,
      image,
      poster_path: image.includes("image.tmdb.org")
        ? image.replace(
            "https://image.tmdb.org/t/p/w500",
            ""
          )
        : null,
      vote_average: Number(rating) || 0,
      release_date: subtitle,
      type,
    });

    alert(`${title} added to wishlist!`);
  }

  return (
    <Link
      to={
        type === "movie"
          ? `/movie/${id}`
          : type === "manga"
          ? `/manga/${id}`
          : type === "comic"
          ? `/comic/${id}`
          : type === "book"
          ? `/book/${id}`
          : "#"
      }
    >
      <div className="movie-card">

        <div className="movie-image">

          <img src={image} alt={title} />

          {rating && (
            <span className="movie-rating">
              <FaStar />
              {rating}
            </span>
          )}

        </div>

        <div className="movie-info">

          <h3>{title}</h3>

          <p>{subtitle}</p>

          <div className="card-actions">

            <button
              className="wishlist-mini"
              onClick={handleWishlist}
            >
              <FiHeart />
            </button>

            <button
              className="cart-btn"
              onClick={handleAddToCart}
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

export default MediaCard;