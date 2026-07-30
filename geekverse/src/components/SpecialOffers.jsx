import bg from "../assets/images/premium-bg.png";

function SpecialOffers() {
  return (
    <section className="special-offer">
      <div className="offer-content">
        <span>LIMITED TIME</span>

        <h2>Special Offers</h2>

        <p>
          Up to <strong>50% OFF</strong> on selected
          movies, manga, books and collectibles.
        </p>

        <button>Shop Now</button>
      </div>

      <div className="offer-image">
        <img src={bg} alt="Offer" />
      </div>
    </section>
  );
}

export default SpecialOffers;