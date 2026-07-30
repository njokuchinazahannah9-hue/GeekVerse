import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import openLibrary from "../services/openLibrary";

import "../styles/bookdetails.css";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);

        // Fetch Work Details
        const response = await openLibrary.get(
          `/works/${id}.json`
        );

        setBook(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <h2 className="loading">
        Loading...
      </h2>
    );
  }

  if (!book) {
    return (
      <h2 className="loading">
        Book not found.
      </h2>
    );
  }

  const cover =
    book.covers && book.covers.length
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : "https://via.placeholder.com/400x600?text=No+Cover";

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value ||
        "No description available.";

  return (
    <div className="book-details">

      {/* Hero */}

      <div
        className="book-backdrop"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="book-overlay"></div>
      </div>

      {/* Content */}

      <div className="book-container">

        <img
          src={cover}
          alt={book.title}
          className="book-poster"
        />

        <div className="book-content">

          <h1>{book.title}</h1>

          <div className="book-meta">

            <span>
              📚 First Published:
              {" "}
              {book.first_publish_date ||
                "Unknown"}
            </span>

            <span>
              📖 Subjects:
              {" "}
              {book.subjects?.length || 0}
            </span>

          </div>

          <div className="genres">

            {book.subjects
              ?.slice(0, 10)
              .map((subject) => (
                <span key={subject}>
                  {subject}
                </span>
              ))}

          </div>

          <p className="overview">
            {description}
          </p>

          <div className="movie-buttons">

            <button className="watch-btn">
              📖 Read Book
            </button>

            <button className="wishlist-btn">
              ❤️ Wishlist
            </button>

          </div>

          <div className="movie-stats">

            <div>
              <span>First Published</span>
              <h4>
                {book.first_publish_date ||
                  "Unknown"}
              </h4>
            </div>

            <div>
              <span>Subjects</span>
              <h4>
                {book.subjects?.length || 0}
              </h4>
            </div>

            <div>
              <span>Revision</span>
              <h4>
                {book.revision || "-"}
              </h4>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;