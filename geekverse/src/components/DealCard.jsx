function DealCard() {
  return (
    <div className="deal-card">

      <div className="deal-header">
        <h2>Deal of the Day</h2>

        <span>12 : 45 : 30</span>
      </div>

      <div className="deal-content">

        <img
          src="https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
          alt="Attack on Titan"
        />

        <div className="deal-info">

          <span className="discount">-40%</span>

          <h3>Attack on Titan</h3>

          <p>Complete Box Set</p>

          <div className="rating">
            ⭐ 4.9 (120)
          </div>

          <div className="price">

            <del>$59.99</del>

            <h2>$35.99</h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DealCard;