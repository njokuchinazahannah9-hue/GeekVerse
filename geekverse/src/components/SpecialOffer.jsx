import premiumBg from "../assets/images/premium-bg.png";

function SpecialOffer() {
  return (
    <section className="special-offer">

      <div className="offer-text">

        <span>🔥 Summer Sale</span>

        <h2>
          Discover Premium
          <br />
          Movies, Books &
          Manga
        </h2>

        <p>
          Get up to 50% OFF on selected collections
          for a limited time.
        </p>

        <button>
          Shop Now
        </button>

      </div>

      <div className="offer-image">

        <img
          src={premiumBg}
          alt="Premium"
        />

      </div>

    </section>
  );
}

export default SpecialOffer;