import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";

function ComicActions({
  comic,
  addToWishlist,
  addToCart,
}) {
  return (
    <div className="comic-actions">

      <button
        className="wishlist-btn"
        onClick={() => addToWishlist(comic)}
      >
        <FaHeart />
        Wishlist
      </button>

      <button
        className="cart-btn"
        onClick={() => addToCart(comic)}
      >
        <FaShoppingCart />
        Cart
      </button>

      <button className="buy-btn">
        <FaBolt />
        Buy Now
      </button>

    </div>
  );
}

export default ComicActions;