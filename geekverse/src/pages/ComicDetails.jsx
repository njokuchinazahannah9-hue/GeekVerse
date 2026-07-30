import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaBolt,
} from "react-icons/fa";

import { getComicDetails } from "../services/comicvine";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function ComicDetails() {
  const { id } = useParams();

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadComic() {
      try {
        const data = await getComicDetails(id);
        setComic(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadComic();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          padding: "40px",
          fontSize: "25px",
        }}
      >
        Loading Comic...
      </div>
    );
  }

  if (!comic) {
    return (
      <div
        style={{
          color: "white",
          padding: "40px",
        }}
      >
        Comic not found.
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div className="comic-details">

          <Link className="back-btn" to="/comics">
            ← Back to Comics
          </Link>

          <div className="comic-header">

            <img
              className="comic-cover"
              src={comic.image?.super_url}
              alt={comic.name}
            />

            <div className="comic-content">

              <h1>{comic.name}</h1>

              <div className="comic-rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar style={{ opacity: .3 }} />

                <span>4.8 Rating</span>
              </div>

              <div className="comic-meta">

                <p>
                  <strong>Volume:</strong>{" "}
                  {comic.volume?.name}
                </p>

                <p>
                  <strong>Issue:</strong>{" "}
                  #{comic.issue_number}
                </p>

                <p>
                  <strong>Publisher:</strong>{" "}
                  {comic.publisher?.name ||
                    comic.volume?.publisher?.name ||
                    "Marvel Comics"}
                </p>

                <p>
                  <strong>Release:</strong>{" "}
                  {comic.cover_date ||
                    comic.date_added ||
                    "Coming Soon"}
                </p>

              </div>

              <div
                className="comic-description"
                dangerouslySetInnerHTML={{
                  __html:
                    comic.description ||
                    comic.deck ||
                    "<p>No description available.</p>",
                }}
              />

              {/* Description */}

<div
  className="comic-description"
  dangerouslySetInnerHTML={{
    __html:
      comic.description ||
      "<p>No description available.</p>",
  }}
/>

{/* Characters */}

{comic.characters?.length > 0 && (
  <div className="info-section">
    <h2>Characters</h2>

    <div className="tags">
      {comic.characters.map((character) => (
        <span
          key={character.id}
          className="tag"
        >
          🦸 {character.name}
        </span>
      ))}
    </div>
  </div>
)}

{/* Teams */}

{comic.teams?.length > 0 && (
  <div className="info-section">
    <h2>Teams</h2>

    <div className="tags">
      {comic.teams.map((team) => (
        <span
          key={team.id}
          className="tag"
        >
          ⚔️ {team.name}
        </span>
      ))}
    </div>
  </div>
)}

{/* Locations */}

{comic.locations?.length > 0 && (
  <div className="info-section">
    <h2>Locations</h2>

    <div className="tags">
      {comic.locations.map((location) => (
        <span
          key={location.id}
          className="tag"
        >
          📍 {location.name}
        </span>
      ))}
    </div>
  </div>
)}

{/* Story Arcs */}

{comic.storyArcs?.length > 0 && (
  <div className="info-section">
    <h2>Story Arcs</h2>

    <div className="tags">
      {comic.storyArcs.map((arc) => (
        <span
          key={arc.id}
          className="tag"
        >
          📖 {arc.name}
        </span>
      ))}
    </div>
  </div>
)}

              <div className="comic-actions">

                <button
                  className="wishlist-btn"
                  onClick={() =>
                    addToWishlist(comic)
                  }
                >
                  <FaHeart />
                  Wishlist
                </button>

                <button
                  className="cart-btn"
                  onClick={() =>
                    addToCart(comic)
                  }
                >
                  <FaShoppingCart />
                  Cart
                </button>

                <button className="buy-btn">
                  <FaBolt />
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>

    
    </div>
  );
}

export default ComicDetails;