import DealCard from "./DealCard";
import TopPicks from "./TopPicks";
import PremiumCard from "./PremiumCard";
import WhatsNew from "./WhatsNew";
import DailyReward from "./DailyReward";
import UpcomingReleases from "./UpcomingReleases";


function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <DealCard />
      <DailyReward />
      <UpcomingReleases />


      <TopPicks />

      <PremiumCard />

      <WhatsNew />
    </aside>
  );
}

export default RightSidebar;