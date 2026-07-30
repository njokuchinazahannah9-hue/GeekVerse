import { FaStar } from "react-icons/fa";

function ComicRating() {
  return (
    <div className="comic-rating">

      <FaStar />

      <FaStar />

      <FaStar />

      <FaStar />

      <FaStar
        style={{
          opacity: .3
        }}
      />

      <span>4.8</span>

    </div>
  );
}

export default ComicRating;