import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const { user, updateUser } = useUser();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (user.wallet < total) {
      alert(
        `Insufficient wallet balance.

Wallet: $${user.wallet.toFixed(2)}

Cart Total: $${total.toFixed(2)}`
      );
      return;
    }

    const confirmed = window.confirm(
      `Checkout?

Total: $${total.toFixed(2)}

Wallet After Purchase: $${(
        user.wallet - total
      ).toFixed(2)}`
    );

    if (!confirmed) return;

    await updateUser({
      wallet: user.wallet - total,

      orders:
        (user.orders || 0) + cart.length,

      geekCoins:
        (user.geekCoins || 0) +
        Math.floor(total),

      purchaseHistory: [
        ...(user.purchaseHistory || []),

        ...cart.map((item) => ({
          id: crypto.randomUUID(),

          title: item.title,

          image:
            item.image ||
            `https://image.tmdb.org/t/p/w500${item.poster_path}`,

          price: item.price,

          quantity: item.quantity,

          date: new Date().toLocaleDateString(),

          status: "Purchased",
        })),
      ],
    });

    clearCart();

    alert("🎉 Purchase Successful!");
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div className="cart-page">
          <h1>🛒 Shopping Cart</h1>

          {cart.length === 0 ? (
            <h2>Your cart is empty.</h2>
          ) : (
            <>
              {cart.map((movie) => (
                <div
                  key={movie.id}
                  className="cart-item"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <div className="cart-info">
                    <h2>{movie.title}</h2>

                    <p>
                      $
                      {Number(
                        movie.price || 0
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div className="cart-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(movie.id)
                      }
                    >
                      -
                    </button>

                    <span>{movie.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(movie.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(movie.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h2>
                Total: ${total.toFixed(2)}
              </h2>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </main>

    </div>
  );
}

export default Cart;