import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import blackPerson from "/src/assets/icons/black-users.webp";
import singleStar from "/src/assets/icons/single-star.webp";
import emptyBookmark from "/src/assets/icons/emptyblack-bookmark.webp";
import filledBookmark from "/src/assets/icons/filledbookmark.webp";

const Bookmark = () => {
  const [cardData, setCardData] = useState([
    {
      id: 1,
      image:
        "https://m.media-amazon.com/images/I/91KG9kdRyXL._AC_UF1000,1000_QL80_.jpg",
      author: "William Shakespeare",
      title: "Hamlet",
      year: "1603",
      price: "Rp. 70.000",
      rentalFee: "Rp. 5.000",
      readers: 300,
      rating: 4.9,
      category: "Drama",
      isBookmarked: true,
    },
    {
      id: 2,
      image:
        "https://m.media-amazon.com/images/I/51smJ1MRisL._AC_UF894,1000_QL80_.jpg",
      author: "Arthur Miller",
      title: "The Crucible",
      year: "1953",
      price: "Rp. 60.000",
      rentalFee: "Gratis",
      readers: 150,
      rating: 4.5,
      category: "Drama",
      isBookmarked: true,
    },
    {
      id: 3,
      image:
        "https://m.media-amazon.com/images/I/81oHM-dzefL._AC_UF1000,1000_QL80_.jpg",
      author: "Leo Tolstoy",
      title: "War and Peace",
      year: "1869",
      price: "Rp. 110.000",
      rentalFee: "Rp. 15.000",
      readers: 130,
      rating: 4.7,
      category: "Novel",
      isBookmarked: true,
    },
    {
      id: 4,
      image:
        "https://pup-assets.imgix.net/onix/images/9780691191812.jpg",
      author: "Albert Einstein",
      title: "Relativity",
      year: "1916",
      price: "Rp. 85.000",
      rentalFee: "Rp. 7.000",
      readers: 180,
      rating: 4.8,
      category: "Jurnal Ilmiah",
      isBookmarked: false,
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781408855652.jpg",
      author: "J.K. Rowling",
      title: "Harry Potter and the Philosopher's Stone",
      year: "1997",
      price: "Rp. 100.000",
      rentalFee: "Rp. 10.000",
      readers: 220,
      rating: 4.9,
      category: "Novel",
      isBookmarked: false,
    },
    {
      id: 6,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1507838358i/6336454.jpg",
      author: "Tennessee Williams",
      title: "A Streetcar Named Desire",
      year: "1947",
      price: "Rp. 50.000",
      rentalFee: "Rp. 3.000",
      readers: 180,
      rating: 4.6,
      category: "Drama",
      isBookmarked: true,
    },
    {
      id: 7,
      image:
        "https://m.media-amazon.com/images/I/712cDO7d73L.jpg",
      author: "J.R.R. Tolkien",
      title: "The Hobbit",
      year: "1937",
      price: "Rp. 120.000",
      rentalFee: "Rp. 12.000",
      readers: 250,
      rating: 4.8,
      category: "Novel",
      isBookmarked: true,
    },
    {
      id: 8,
      image:
        "https://m.media-amazon.com/images/I/61y6vgESsEL._AC_UF1000,1000_QL80_.jpg",
      author: "Marie Curie",
      title: "Radioactivity Research",
      year: "1921",
      price: "Rp. 90.000",
      rentalFee: "Rp. 8.000",
      readers: 100,
      rating: 4.4,
      category: "Jurnal Ilmiah",
      isBookmarked: true,
    },
  ]);

  const bookmarkedBooks = cardData.filter((book) => book.isBookmarked);

  const booksByCategory = bookmarkedBooks.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {});

  const sortedCategories = Object.keys(booksByCategory).sort();

  return (
    <Container fluid className="px-0">
      {sortedCategories.map((category) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h4
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "2px",
                height: "24px",
                backgroundColor: "#42CBF7",
                marginRight: "10px",
                display: "inline-block",
              }}
            ></span>
            {category}
          </h4>

          <div
            style={{
              width: "100%",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "16px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "inline-flex", gap: "16px" }}>
              {booksByCategory[category].map((book) => (
                <div
                  key={book.id}
                  style={{
                    minWidth: "320px",
                    maxWidth: "500px",
                    flexShrink: 0,
                  }}
                >
                  <div className="card">
                    <div className="card-body">
                      <Row className="align-items-start">
                        <Col xs="auto">
                          <img
                            src={book.image}
                            width="156"
                            height="230"
                            alt="Book Cover"
                            className="rounded"
                          />
                        </Col>
                        <Col>
                          <p className="mb-1">
                            Pengarang{" "}
                            <span style={{ color: "#3C64EF" }}>
                              {book.author}
                            </span>
                          </p>
                          <h5 className="fw-bold pt-2">{book.title}</h5>
                          <p className="mb-1">{book.year}</p>
                          <p className="text-left fw-bold fs-5">{book.price}</p>
                          <button
                            type="button"
                            className="btn"
                            style={{
                              backgroundColor:
                                book.rentalFee === "Gratis"
                                  ? "#d4f7d4"
                                  : "#F9D48D",
                              color:
                                book.rentalFee === "Gratis"
                                  ? "#28a745"
                                  : "#DF970C",
                              width: "280px",
                              borderRadius: "8px",
                              border: "none",
                              padding: "6px 25px",
                              fontSize: "16px",
                              cursor: "pointer",
                            }}
                          >
                            {book.rentalFee === "Gratis"
                              ? "Gratis untuk dibaca"
                              : `${book.rentalFee} untuk membaca`}
                          </button>
                          <div
                            className="d-flex align-items-center justify-content-start"
                            style={{ marginTop: "20px" }}
                          >
                            <div
                              className="d-flex align-items-center"
                              style={{ marginRight: "16px" }}
                            >
                              <img
                                src={blackPerson}
                                alt="Person Icon"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  marginRight: "4px",
                                }}
                              />
                              <span style={{ fontSize: "16px" }}>
                                {book.readers}
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <img
                                src={singleStar}
                                alt="Star Icon"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  marginRight: "4px",
                                }}
                              />
                              <span style={{ fontSize: "16px" }}>
                                {book.rating}
                              </span>
                            </div>
                            <div className="d-flex align-items-center ms-auto">
                              <img
                                src={
                                  book.isBookmarked
                                    ? filledBookmark
                                    : emptyBookmark
                                }
                                alt="Bookmark Icon"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Bookmark;
