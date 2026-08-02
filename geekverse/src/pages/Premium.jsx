import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Premium.css";

function Premium() {
  const navigate = useNavigate();

  const { user, updateUser } = useUser();

  async function choosePlan(plan) {
    if (user.premium) {
      alert("🎉 You're already a Premium Member!");
      return;
    }

    const price = plan === "Monthly" ? 10 : 90;

    if (user.wallet < price) {
      alert(
        `Insufficient Wallet Balance.\n\nYou need $${price} to purchase this plan.`
      );
      return;
    }

    try {
      await updateUser({
        wallet: user.wallet - price,
        premium: true,
        membership: "Premium",
        geekCoins: (user.geekCoins || 0) + 500,
      });

      alert(
        `🎉 Congratulations!\n\nWelcome to GeekVerse Premium (${plan})!`
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to activate Premium.");
    }
  }

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-area">

        <TopNavbar />

        <section className="premium-page">

          <div className="premium-hero">

            <h1>👑 GeekVerse Premium</h1>

            <p>
              Upgrade your GeekVerse experience and unlock unlimited
              entertainment.
            </p>

          </div>

          <div className="plans">

            {/* Monthly */}

            <div className="plan-card">

              <h2>Monthly</h2>

              <h1>$10</h1>

              <p>/month</p>

              <button
                disabled={user.premium}
                onClick={() => choosePlan("Monthly")}
              >
                {user.premium
                  ? "Premium Active"
                  : "Choose Plan"}
              </button>

            </div>

            {/* Yearly */}

            <div className="plan-card popular">

              <span className="badge">
                MOST POPULAR
              </span>

              <h2>Yearly</h2>

              <h1>$90</h1>

              <p>/year</p>

              <small>Save 25%</small>

              <button
                disabled={user.premium}
                onClick={() => choosePlan("Yearly")}
              >
                {user.premium
                  ? "Premium Active"
                  : "Choose Plan"}
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

              <div>🪙 500 Bonus Geek Coins</div>

              <div>🤖 AI Recommendations</div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Premium;