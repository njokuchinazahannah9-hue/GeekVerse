import {
  FiFilm,
  FiBookOpen,
} from "react-icons/fi";

import { PiBooksDuotone } from "react-icons/pi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

const categories = [
  {
    icon: <FiFilm />,
    title: "Movies",
    total: "2,450+"
  },
  {
    icon: <PiBooksDuotone />,
    title: "Manga",
    total: "3,280+"
  },
  {
    icon: <FiBookOpen />,
    title: "Books",
    total: "4,120+"
  },
  {
    icon: <MdOutlineCollectionsBookmark />,
    title: "Comics",
    total: "1,890+"
  }
];

function CategoryRow() {
  return (
    <section className="category-row">
      {categories.map((item, index) => (
        <div className="category-card" key={index}>

          <div className="category-icon">
            {item.icon}
          </div>

          <div>
            <h3>{item.title}</h3>
            <p>{item.total} items</p>
          </div>

        </div>
      ))}
    </section>
  );
}

export default CategoryRow;