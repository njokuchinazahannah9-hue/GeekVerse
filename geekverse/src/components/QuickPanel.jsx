import DealCard from "./DealCard";
import DailyReward from "./DailyReward";
import UpcomingReleases from "./UpcomingReleases";
import TopPicks from "./TopPicks";
import PremiumCard from "./PremiumCard";
import WhatsNew from "./WhatsNew";

function QuickPanel({ show }) {
  if (!show) return null;

  return (
    <div className="quick-panel">

      <DealCard />

      <DailyReward />

      <UpcomingReleases />

      <TopPicks />

      <PremiumCard />

      <WhatsNew />

    </div>
  );
}

export default QuickPanel;