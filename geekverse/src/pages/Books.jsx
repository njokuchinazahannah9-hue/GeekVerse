import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import MediaCard from "../components/MediaCard";
import openLibrary from "../services/openLibrary";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await openLibrary.get(
          "/search.json?q=fiction&limit=20"
        );

        setBooks(response.data.docs);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <section className="trending">

          <div className="trending-header">
            <h2>📖 Popular Books</h2>
          </div>

          <div className="movies-grid">
            {books.map((book, index) => (
              <MediaCard
                key={index}
               id={book.key.replace("/works/", "")}
                image={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : "https://via.placeholder.com/300x450?text=No+Cover"
                }
                title={book.title}
                subtitle={
                  book.author_name
                    ? book.author_name[0]
                    : "Unknown Author"
                }
                rating={4.8}
                type="book"
              />
            ))}
          </div>

        </section>
      </main>

    </div>
  );
}

export default Books;