import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import "../styles/Premium.css";

function Premium() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-area">

        <TopNavbar />

        <section className="premium-page">

          <div className="premium-hero">

            <h1>👑 GeekVerse Premium</h1>

            <p>
              Upgrade your GeekVerse experience and unlock unlimited entertainment.
            </p>

          </div>

          <div className="plans">

            <div className="plan-card">

              <h2>Monthly</h2>

              <h1>$10</h1>

              <p>/month</p>

              <button>
                Choose Plan
              </button>

            </div>

            <div className="plan-card popular">

              <span className="badge">
                MOST POPULAR
              </span>

              <h2>Yearly</h2>

              <h1>$90</h1>

              <p>/year</p>

              <small>Save 25%</small>

              <button>
                Choose Plan
              </button>

            </div>

          </div>

          <div className="premium-features">

            <h2>Everything Included</h2>

            <div className="feature-grid">

              <div>🎬 Unlimited Movies</div>

              <div>📖 Unlimited Manga</div>

              <div>📚 Unlimited Books</div>

              <div>🦸 Unlimited Comics</div>

              <div>⬇ Download Content</div>

              <div>🚫 No Ads</div>

              <div>🪙 Bonus Geek Coins</div>

              <div>🤖 AI Recommendations</div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Premium;