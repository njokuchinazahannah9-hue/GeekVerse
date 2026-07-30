function TopCategories() {
  return (
    <div className="top-categories">

      <div className="category-header">
        <h3>Top Categories</h3>
      </div>

      <div className="category-circle">

        <div className="circle">

          <div className="circle-center">

            <h2>248</h2>

            <span>Total</span>

          </div>

        </div>

      </div>

      <div className="category-list">

        <div className="category-item">
          <span className="dot purple"></span>
          <p>Movies</p>
          <strong>98</strong>
        </div>

        <div className="category-item">
          <span className="dot blue"></span>
          <p>Manga</p>
          <strong>65</strong>
        </div>

        <div className="category-item">
          <span className="dot green"></span>
          <p>Books</p>
          <strong>45</strong>
        </div>

        <div className="category-item">
          <span className="dot orange"></span>
          <p>Comics</p>
          <strong>28</strong>
        </div>

        <div className="category-item">
          <span className="dot pink"></span>
          <p>Others</p>
          <strong>12</strong>
        </div>

      </div>

    </div>
  );
}

export default TopCategories;