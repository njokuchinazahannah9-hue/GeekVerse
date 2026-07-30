function TopPicks() {
  return (
    <div className="top-picks">

      <div className="card-header">
        <h3>Top Picks For You</h3>

        <button>View All</button>
      </div>

      <div className="pick-grid">

        <img
          src="https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
          alt=""
        />

        <img
          src="https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
          alt=""
        />

        <img
          src="https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg"
          alt=""
        />

        <img
          src="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
          alt=""
        />

      </div>

    </div>
  );
}

export default TopPicks;