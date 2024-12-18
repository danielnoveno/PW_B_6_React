import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

const bookList = [
  {
    category: "Novel",
    books: [
      {
        id: 1,
        image:
          "https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.jpg",
        bookTitle: "Laut Bercerita",
        authorName: "Leila S. Chudori",
        readProgress: 80, // Persentase selesai membaca
      },
      {
        id: 2,
        image:
          "https://cdn.gramedia.com/uploads/items/9786022912705_kepingan_supernova.jpg",
        bookTitle: "Supernova",
        authorName: "Dee Lestari",
        readProgress: 45, // Persentase selesai membaca
      },
      {
        id: 3,
        image:
          "https://upload.wikimedia.org/wikipedia/id/8/8e/Laskar_pelangi_sampul.jpg",
        bookTitle: "Laskar Pelangi",
        authorName: "Andrea Hirata",
        readProgress: 95, // Persentase selesai membaca
      },
      {
        id: 4,
        image:
          "https://cdn.gramedia.com/uploads/items/9786020331584_Ayahku-Bukan-Pembohong-Cover-Baru-2018.jpg",
        bookTitle: "Ayahku (Bukan) Pembohong",
        authorName: "Tere Liye",
        readProgress: 70, // Persentase selesai membaca
      },
      {
        id: 5,
        image:
          "https://ebooks.gramedia.com/ebook-covers/1682/image_highres/ID_GPU2013MTH02NLM.jpg",
        bookTitle: "Negeri 5 Menara",
        authorName: "Ahmad Fuadi",
        readProgress: 55, // Persentase selesai membaca
      },
      {
        id: 6,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx9Tuv-pvDcPZ2Q4DGG7NBFwIBwx_C5z-MWw&s",
        bookTitle: "Perahu Kertas",
        authorName: "Dee Lestari",
        readProgress: 65, // Persentase selesai membaca
      },
      {
        id: 7,
        image:
          "https://ebooks.gramedia.com/ebook-covers/53333/image_highres/BLK_RDP2020706247.jpg",
        bookTitle: "Ronggeng Dukuh Paruk",
        authorName: "Ahmad Tohari",
        readProgress: 90, // Persentase selesai membaca
      },
    ],
  },
  {
    category: "Drama",
    books: [
      {
        id: 8,
        image:
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/29/4ffa087d-b8d1-403f-b38c-477f070abc44.jpg",
        bookTitle: "Furiously Happy",
        authorName: "Jenny Lawson",
        readProgress: 60, // Persentase selesai membaca
      },
    ],
  },
];

const MydigiPage = () => {
  const [books, setBooks] = useState(bookList);
  const [hoveredButton, setHoveredButton] = useState(null);

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
              display: "flex",
              gap: "25px",
              flexWrap: "nowrap", // Jangan biarkan card berpindah ke bawah
              overflowX: "auto", // Scroll horizontal
              paddingBottom: "20px",
              paddingLeft: "10px",
            }}
          >
            <Row
              style={{
                width: "230px",
                gap: "25px",
                overflowX: "130px",
                whiteSpace: "nowrap",
                paddingBottom: "16px",
                boxSizing: "border-box",
                borderBottom: "1px solid #ddd",
                flexWrap: "nowrap",
              }}
            >
              {category.books.map((book, bookIndex) => (
                <div
                  key={book.id}
                  style={{
                    width: "auto",
                    height: "410px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Gambar Buku */}
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "12px 12px 12px 12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={book.image}
                      alt="Book Cover"
                      style={{
                        width: "195px",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  {/* Detail Buku */}
                  <div
                    style={{
                      padding: "0px 12px 0",
                      display: "flex",
                      marginTop: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#2B2B2B",
                        textAlign: "center",
                      }}
                    >
                      {book.bookTitle}
                    </h5>
                    <p
                      style={{
                        color: "#3C64EF",
                        fontSize: "0.9rem",
                        marginBottom: "2px",
                        textAlign: "center",
                      }}
                    >
                      Oleh {book.authorName}
                    </p>

                    {/* Progress Bar dan Persentase */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "8px",
                          backgroundColor: "#E0E0E0",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${book.readProgress}%`,
                            height: "100%",
                            backgroundColor: "#3C64EF",
                          }}
                        ></div>
                      </div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#666",
                          margin: 0,
                          marginTop: "10px",
                        }}
                      >
                        {book.readProgress}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default MydigiPage;
