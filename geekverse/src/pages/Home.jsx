import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";

import homeRows from "../data/homeRows";

function Home() {
  const ROWS_PER_LOAD = 6;

  const [visibleRows, setVisibleRows] = useState(
    ROWS_PER_LOAD
  );

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.innerHeight + window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight;

      // Load more rows when user is near bottom
      if (
        scrollPosition >= pageHeight - 800 &&
        visibleRows < homeRows.length
      ) {
        setVisibleRows((prev) =>
          Math.min(
            prev + 3,
            homeRows.length
          )
        );
      }
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [visibleRows]);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">

        <TopNavbar />

        <HeroBanner />

        {homeRows
          .slice(0, visibleRows)
          .map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              endpoint={row.endpoint}
            />
          ))}

        {visibleRows < homeRows.length && (
          <div className="loading-more">
            <div className="loading-spinner"></div>

            <p>Loading more categories...</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Home;