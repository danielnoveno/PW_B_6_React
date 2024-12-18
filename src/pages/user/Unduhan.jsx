import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

// Import icons
import emptyBookmark from "../../assets/icons/emptyblack-bookmark.webp";
import filledBookmark from "../../assets/icons/filledbookmark.webp";
import singleStar from "../../assets/icons/single-star.webp";
import blackPerson from "../../assets/icons/black-users.webp";

const bookList = [
  {
    category: "Novel",
    books: [
      {
        id: 1,
        authorName: "Pengarang Leila S. Chudori",
        bookTitle: "Laut Bercerita",
        publicationYear: "2015",
        downloadStatus: "Terunduh",
        readButtonLabel: "Baca",
        memberCount: "67",
        ratingValue: "4.9",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUazSXAIraHfh0V20yJQ1J-ZbEVeLvt9VHA&s",
        isBookmarked: false,
      },
      {
        id: 2,
        authorName: "Pengarang Dee Lestari",
        bookTitle: "Supernova",
        publicationYear: "2001",
        downloadStatus: "Belum Terunduh",
        readButtonLabel: "Unduh",
        memberCount: "45",
        ratingValue: "4.8",
        image:
          "https://cdn.gramedia.com/uploads/items/9786022912705_kepingan_supernova.jpg",
        isBookmarked: false,
      },
      {
        id: 3,
        authorName: "Pengarang Andrea Hirata",
        bookTitle: "Laskar Pelangi",
        publicationYear: "2005",
        downloadStatus: "Terunduh",
        readButtonLabel: "Baca",
        memberCount: "120",
        ratingValue: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/id/8/8e/Laskar_pelangi_sampul.jpg",
        isBookmarked: false,
      },
    ],
  },
  {
    category: "Drama",
    books: [
      {
        id: 4,
        authorName: "Penulis Jenny Lawson",
        bookTitle: "Furiously Happy: Buku Humor tentang Hal-Hal Mengerikan",
        publicationYear: "2015",
        downloadStatus: "Terunduh",
        readButtonLabel: "Baca",
        memberCount: "67",
        ratingValue: "4.9",
        image:
          "https://cdn.gramedia.com/uploads/picture_meta/2024/2/12/vfr6hdwuzultthyjw2hcz7.jpg",
        isBookmarked: false,
      },
    ],
  },
];

const UnduhanPage = () => {
  // State untuk daftar buku
  const [books, setBooks] = useState(bookList);
  const [hoveredButton, setHoveredButton] = useState(null); // State for hover effect

  // Fungsi untuk toggle bookmark
  const toggleBookmark = (categoryIndex, bookIndex) => {
    setBooks((prevBooks) =>
      prevBooks.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              books: category.books.map((book, bookIdx) =>
                bookIdx === bookIndex
                  ? { ...book, isBookmarked: !book.isBookmarked }
                  : book
              ),
            }
          : category
      )
    );
  };

  return (
    <Container fluid className="px-0">
      {books.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h4
            style={{
              marginTop: "20px",
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
            {category.category}
          </h4>
          <div
            style={{
              overflowX: "auto",
              paddingBottom: "20px",
              width: "100%",
            }}
          >
            <Row
              style={{
                width: "130px",
                overflowX: "130px",
                whiteSpace: "nowrap",
                paddingBottom: "16px",
                boxSizing: "border-box",
                borderBottom: "1px solid #ddd",
                flexWrap: "nowrap",
              }}
            >
              {category.books.map((book, bookIndex) => (
                <Col
                  key={book.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{
                    flexShrink: 0,
                    minWidth: "500px",
                    maxWidth: "400px",
                  }}
                  className="mb-4"
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
                          <p
                            className="mb-1"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                            title={book.authorName}
                          >
                            Pengarang{" "}
                            <span style={{ color: "#3C64EF" }}>
                              {book.authorName}
                            </span>
                          </p>
                          <h5
                            className="fw-bold pt-2"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                            title={book.bookTitle}
                          >
                            {book.bookTitle}
                          </h5>

                          <p className="mb-1">{book.publicationYear}</p>
                          <p className="text-left fw-bold fs-5">
                            {book.downloadStatus}
                          </p>
                          <Button
                            variant="success"
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              border: "none",
                              padding: "6px 25px",
                              fontSize: "16px",
                              cursor: "pointer",
                              backgroundColor:
                                hoveredButton === book.id
                                  ? "#3C64EF"
                                  : "#D6DFFC",
                              color:
                                hoveredButton === book.id
                                  ? "#D6DFFC"
                                  : "#3C64EF",
                            }}
                            onMouseEnter={() => setHoveredButton(book.id)}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            {book.readButtonLabel}
                          </Button>
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
                                {book.memberCount}
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
                                {book.ratingValue}
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
                                onClick={() =>
                                  toggleBookmark(categoryIndex, bookIndex)
                                }
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default UnduhanPage;
