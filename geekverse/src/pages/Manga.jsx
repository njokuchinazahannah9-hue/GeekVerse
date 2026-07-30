import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import MangaHero from "../components/MangaHero";
import MangaRow from "../components/MangaRow";

function Manga() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <MangaHero />

        <section className="trending">
          <div className="movies-header">
            <h1>📚 Manga</h1>

            <p>
              Discover thousands of manga from MangaDex.
            </p>
          </div>

          <MangaRow
            title="🔥 Popular Manga"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&order[followedCount]=desc"
          />

          <MangaRow
            title="⭐ Highest Rated"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&order[rating]=desc"
          />

          <MangaRow
            title="🆕 Recently Added"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&order[createdAt]=desc"
          />

          <MangaRow
            title="📅 Latest Updates"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&order[updatedAt]=desc"
          />

          <MangaRow
            title="✅ Completed"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&status[]=completed"
          />

          <MangaRow
            title="🚀 Ongoing"
            endpoint="/manga?limit=20&includes[]=cover_art&availableTranslatedLanguage[]=en&status[]=ongoing"
          />
        </section>
      </main>
    </div>
  );
}

export default Manga;