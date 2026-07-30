import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiStar,
  FiZap,
} from "react-icons/fi";

import "../styles/PremiumModal.css";

function PremiumModal({
  show,
  onClose,
  onUpgrade,
}) {
  const [plan, setPlan] = useState("monthly");

  if (!show) return null;

  return (
    <div className="premium-overlay">

      <div className="premium-modal">

        <button
          className="close-premium"
          onClick={onClose}
        >
          <FiX />
        </button>

        <div className="premium-header">

          <div className="premium-crown">
            👑
          </div>

          <h1>GeekVerse Premium</h1>

          <p>
            Unlock the complete GeekVerse experience.
          </p>

        </div>

        {/* Plans */}

        <div className="premium-plans">

          <div
            className={`plan-card ${
              plan === "monthly"
                ? "active-plan"
                : ""
            }`}
            onClick={() =>
              setPlan("monthly")
            }
          >
            <FiStar />

            <div>
              <h3>Monthly</h3>
              <p>$10 / Month</p>
            </div>

          </div>

          <div
            className={`plan-card ${
              plan === "yearly"
                ? "active-plan"
                : ""
            }`}
            onClick={() =>
              setPlan("yearly")
            }
          >

            <FiZap />

            <div>
              <h3>
                Yearly
                <span className="popular-badge">
                  Most Popular
                </span>
              </h3>

              <p>$90 / Year</p>

              <small>
                Save 25%
              </small>

            </div>

          </div>

        </div>

        {/* Benefits */}

        <div className="premium-benefits">

          <div><FiCheck /> Unlimited Movies</div>

          <div><FiCheck /> Unlimited Manga</div>

          <div><FiCheck /> Unlimited Comics</div>

          <div><FiCheck /> Unlimited Books</div>

          <div><FiCheck /> Download Content</div>

          <div><FiCheck /> No Ads</div>

          <div><FiCheck /> Bonus Geek Coins</div>

        </div>

        <div className="premium-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="upgrade-btn"
            onClick={() =>
              onUpgrade(plan)
            }
          >
            Upgrade Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default PremiumModal;