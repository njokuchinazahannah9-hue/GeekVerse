import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Library() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div className="library-page">

          <h1>📚 My Library</h1>

          {!user.purchaseHistory ||
          user.purchaseHistory.length === 0 ? (

            <h2>
              You haven't purchased anything yet.
            </h2>

          ) : (

            <div className="library-grid">

              {user.purchaseHistory.map((item) => (

                <div
                  className="library-card"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <h3>{item.title}</h3>

                  <button
                    onClick={() =>
                        navigate(`/library/${item.id}`)
                    }
                    >
                    Open
                    </button>
                </div>

              ))}

            </div>

          )}

        </div>
      </main>

      <RightSidebar />
    </div>
  );
}

export default Library;