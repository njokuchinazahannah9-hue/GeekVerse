import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/responsive.css";
import "./styles/dailyReward.css";
import "./styles/upcoming.css";
import "./styles/settings.css";
import "./styles/comics.css";
import "./index.css";
import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/category.css";
import "./styles/trending.css";
import "./styles/rightSidebar.css";
import "./styles/DealCard.css";
import "./styles/TopPicks.css";
import "./styles/premiumcard.css";
import "./styles/WhatsNew.css";
import "./styles/SpecialOffer.css";
import "./styles/MovieCard.css";
import "./styles/MovieDetails.css";
import "./styles/Cart.css";
import "./styles/notifications.css";
import "./styles/profile.css";
import "./styles/profile2.css";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/comics.css";
import "./styles/comicDetails.css";
import "./styles/responsive.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      
        <AuthProvider>
          <UserProvider>
            <WishlistProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </WishlistProvider>
          </UserProvider>
        </AuthProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
