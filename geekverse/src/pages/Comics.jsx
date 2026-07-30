import { useEffect, useState } from "react";
import { getPopularComics } from "../services/comicvine";
import ComicCard from "../components/ComicCard";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


function Comics() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComics() {
      try {
        const data = await getPopularComics();
        setComics(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadComics();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div style={{ padding: "30px", color: "white" }}>
          <h1>Comics</h1>

          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="comics-grid">
              {comics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  comic={comic}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      
    </div>
  );
}

export default Comics;