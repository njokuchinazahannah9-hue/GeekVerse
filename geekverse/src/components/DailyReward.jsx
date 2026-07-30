import { useState } from "react";
import { FiGift } from "react-icons/fi";

function DailyReward() {
  const [claimed, setClaimed] = useState(false);

  function claimReward() {
    if (claimed) return;

    setClaimed(true);

    alert("🎉 Congratulations!\n\nYou received 50 Geek Coins.");
  }

  return (
    <div className="reward-card">

      <h3>
        <FiGift />
        Daily Reward
      </h3>

      <p>
        Log in every day and collect your reward.
      </p>

      <h2>🪙 +50 Geek Coins</h2>

      <button
        disabled={claimed}
        onClick={claimReward}
      >
        {claimed ? "Claimed ✅" : "Claim Reward"}
      </button>

    </div>
  );
}

export default DailyReward;