import {
  FiZap,
  FiTag,
  FiTruck,
} from "react-icons/fi";

import astronaut from "../assets/images/astronaut.png";

function PremiumCard() {
  return (
    <div className="premium-right">

      <div className="premium-text">

        <h2>
          Unlock
          <br />
          Exclusive Perks
        </h2>

        <ul>

          <li>
            <FiZap />
            Early Access
          </li>

          <li>
            <FiTag />
            Member Discounts
          </li>

          <li>
            <FiTruck />
            Free Shipping
          </li>

        </ul>

        <button>Go Premium</button>

      </div>

      <img
        src={astronaut}
        alt="Astronaut"
      />

    </div>
  );
}

export default PremiumCard;