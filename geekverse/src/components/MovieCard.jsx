import { Link } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaPlay,
} from "react-icons/fa";

import {
  FiShoppingCart,
  FiInfo,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function MovieCard({
  id,
  image,
  title,
  category,
  rating = 0,
  type = "movie",
}) {
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const isWishlisted = wishlist.some(
    (item) => item.id === id
  );

  const price = (
    (Math.random() * 10 + 8).toFixed(2)
  );

  function handleAddToCart(e) {
    e.preventDefault();

    addToCart({
      id,
      poster_path:
        image &&
        image.includes("image.tmdb.org")
          ? image.replace(
              "https://image.tmdb.org/t/p/w500",
              ""
            )
          : image,
      title,
      vote_average: Number(rating),
      release_date: category,
      price,
    });

    alert(`${title} added to cart!`);
  }

  function handleWishlist(e) {
    e.preventDefault();

    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        title,
        poster_path:
          image &&
          image.includes("image.tmdb.org")
            ? image.replace(
                "https://image.tmdb.org/t/p/w500",
                ""
              )
            : image,
        vote_average: Number(rating),
        release_date: category,
      });
    }
  }

  const link =
    type === "comic"
      ? `/comic/${id}`
      : `/movie/${id}`;

  return (
    <Link
      to={link}
      className="movie-link"
    >
      <div className="movie-card">

        <img
          className="movie-poster"
          src={
            image ||
            "https://via.placeholder.com/500x750"
          }
          alt={title}
        />

        <div className="movie-overlay">

          <div className="movie-top">

            <span className="movie-score">
              <FaStar />
              {Number(rating).toFixed(1)}
            </span>

            <button
              className="wishlist-icon"
              onClick={handleWishlist}
            >
              <FaHeart
                color={
                  isWishlisted
                    ? "#8b5cf6"
                    : "white"
                }
              />
            </button>

          </div>

          <div className="movie-bottom">

            <h3>{title}</h3>

            <p>{category}</p>

            <h4>${price}</h4>

            <div className="movie-actions">

              <button>
                <FaPlay />
              </button>

              <button
                onClick={handleAddToCart}
              >
                <FiShoppingCart />
              </button>

              <button>
                <FiInfo />
              </button>

            </div>

          </div>

        </div>

      </div>
    </Link>
  );
}

export default MovieCard;