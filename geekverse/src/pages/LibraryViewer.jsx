import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


function LibraryViewer() {
  const { id } = useParams();
  const { user } = useUser();

  const item = user.purchaseHistory?.find(
    (movie) => movie.id === id
  );

  if (!item) {
    return <h1>Item not found.</h1>;
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div className="viewer-page">

          <img
            src={item.image}
            alt={item.title}
            className="viewer-poster"
          />

          <h1>{item.title}</h1>

          <p>Status: {item.status}</p>

          <button className="watch-btn">
            ▶ Watch / Read
          </button>

        </div>
      </main>

     
    </div>
  );
}

export default LibraryViewer;