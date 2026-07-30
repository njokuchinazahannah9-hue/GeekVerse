import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import MediaCard from "../components/MediaCard";

import { useWishlist } from "../context/WishlistContext";


function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              color: "white",
              marginBottom: "30px",
            }}
          >
            ❤️ My Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <h2 style={{ color: "white" }}>
              No items in wishlist.
            </h2>
          ) : (
            <div className="movies-grid">
              {wishlist.map((item) => {
                const image =
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : item.image?.medium_url ||
                      item.image?.super_url ||
                      "https://via.placeholder.com/500x750?text=No+Image";

                const title =
                  item.title ||
                  item.name ||
                  "Untitled";

                const rating =
                  Number(item.vote_average || 0).toFixed(1);

                const category =
                  item.release_date?.substring(0, 4) ||
                  item.cover_date ||
                  item.issue_number ||
                  "Unknown";

                return (
                <MediaCard
  key={item.id}
  id={item.id}
  title={title}
  image={image}
  rating={rating}
  subtitle={category}
  type={item.image ? "comic" : "movie"}
/>
                );
              })}
            </div>
          )}
        </div>
      </main>

  
    </div>
  );
}

export default Wishlist;