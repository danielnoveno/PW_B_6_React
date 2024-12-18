import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Row, Col, Card } from "react-bootstrap";
import bookRead from "/src/assets/icons/terbaca-icon.webp";
import bookReading from "/src/assets/icons/sedang-dibaca.webp";
import downloaded from "/src/assets/icons/terunduh-icon.webp";
import singleStar from "/src/assets/icons/single-star.webp";
import blackPerson from "/src/assets/icons/black-users.webp";
import emptyBookmark from "/src/assets/icons/emptyblack-bookmark.webp";
import filledBookmark from "/src/assets/icons/filledbookmark.webp";

const Dashboard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const cardData = [
    {
      id: 1,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1646470594i/60129536.jpg",
      author: "Almira Bastari",
      title: "Home Sweet Loan",
      year: "2015",
      price: "Rp. 90.000",
      rentalFee: "Gratis",
      readers: 67,
      rating: 4.9,
      category: "Drama",
      isBookmarked: false,
    },
    {
      id: 2,
      image:
        "https://m.media-amazon.com/images/I/91RLDV2lvfL._AC_UF894,1000_QL80_.jpg",
      author: "Peter Brown",
      title: "The Wild Robot",
      year: "2016",
      price: "Rp. 120.000",
      rentalFee: "Rp. 12.000",
      readers: 85,
      rating: 4.7,
      category: "Adventure",
      isBookmarked: false,
    },
    {
      id: 3,
      image:
        "https://m.media-amazon.com/images/I/81Vm5uzEibL._AC_UF894,1000_QL80_.jpg",
      author: "Margot Lee Shetterly",
      title: "Hidden Figures",
      year: "2016",
      price: "Rp. 90.000",
      rentalFee: "Rp. 9.000",
      readers: 95,
      rating: 4.8,
      category: "Biography",
      isBookmarked: false,
    },
    {
      id: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg",
      author: "Andrea Hirata",
      title: "Laskar Pelangi",
      year: "2005",
      price: "Rp. 75.000",
      rentalFee: "Rp. 7.000",
      readers: 120,
      rating: 4.9,
      category: "Drama",
      isBookmarked: false,
    },    
    {
      id: 5,
      image:
        "https://ebooks.gramedia.com/ebook-covers/50298/image_highres/ID_AW2020MTH01AW.jpg",
      author: "Sun Tzu",
      title: "The Art of War",
      year: "5th Century BC",
      price: "Rp. 50.000",
      rentalFee: "Rp. 3.000",
      readers: 250,
      rating: 4.6,
      category: "Sejarah",
      isBookmarked: false,
    },
    {
      id: 6,
      image:
        "https://shop.merriam-webster.com/cdn/shop/products/The-Merriam-Webster-Dictionary-mass-market.jpg?v=1667221153",
      author: "Webster",
      title: "Webster's Dictionary",
      year: "2021",
      price: "Rp. 120.000",
      rentalFee: "Gratis",
      readers: 50,
      rating: 4.3,
      category: "Kamus",
      isBookmarked: false,
    },
    {
      id: 7,
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
      id: 8,
      image:
        "https://m.media-amazon.com/images/I/41xca5fHw3L._AC_UF1000,1000_QL80_.jpg",
      author: "Jamie Oliver",
      title: "5 Ingredients",
      year: "2017",
      price: "Rp. 95.000",
      rentalFee: "Gratis",
      readers: 85,
      rating: 4.9,
      category: "Resep",
      isBookmarked: false,
    },
  ];

  const categories = [
    "All",
    "Sci-Fi",
    "Fantasy",
    "Drama",
    "Politik",
    "Sejarah",
    "Kamus",
    "Jurnal Ilmiah",
    "Resep",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredBooks =
    selectedCategory === "All"
      ? cardData
      : cardData.filter((cardData) => cardData.category === selectedCategory);

  return (
    <Container fluid className="px-0">
      <div style={{ display: "flex", alignItems: "flex-start", }}>
      <Row className="gx-0">
      {/* Elemen kiri */}
      <Col md={8} sm={12} className="p-3">
      <div style={{ flex: 1}}>
      <Row
        className="d-flex align-items-center"
        style={{ flexWrap: "nowrap", gap: "16px", justifyContent: "space-between" }}
      >
        {/* Card 1 */}
        <div style={{ flex: "1 1 0" }}>
          <div className="card" style={{ height: "130px" }}>
            <div className="card-body d-flex align-items-center">
              <img
                src={bookRead}
                width="80"
                height="80"
                alt="Icon Terbaca"
                className="rounded-circle me-3"
              />
              <div>
                <h1 className="card-title mb-0">25</h1>
                <p className="card-text">Sudah Terbaca</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ flex: "1 1 0" }}>
          <div className="card" style={{ height: "130px" }}>
            <div className="card-body d-flex align-items-center">
              <img
                src={bookReading}
                width="80"
                height="80"
                alt="Icon Terbaca"
                className="rounded-circle me-3"
              />
              <div>
                <h1 className="card-title mb-0">20</h1>
                <p className="card-text">Sedang Dibaca</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ flex: "1 1 0" }}>
          <div className="card" style={{ height: "130px" }}>
            <div className="card-body d-flex align-items-center">
              <img
                src={downloaded}
                width="80"
                height="80"
                alt="Icon Terbaca"
                className="rounded-circle me-3"
              />
              <div>
                <h1 className="card-title mb-0">25</h1>
                <p className="card-text">Terunduh</p>
              </div>
            </div>
          </div>
        </div>
      </Row>
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
            Rekomendasi
          </h4>
          <div
            style={{
              width: "100%",
              maxWidth:"1100px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "16px",
              boxSizing: "border-box",
              borderBottom: "1px solid #ddd",
              flexShrink: 1
            }}
          >
            <div style={{ display: "inline-flex", gap: "16px" }}>
              {cardData.map((card) => (
                <div
                  key={card.id}
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
                            src={card.image}
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
                              {card.author}
                            </span>
                          </p>
                          <h5 className="fw-bold pt-2">{card.title}</h5>
                          <p className="mb-1">{card.year}</p>
                          <p className="text-left fw-bold fs-5">{card.price}</p>
                          <button
                            type="button"
                            className="btn"
                            style={{
                              backgroundColor:
                                card.rentalFee === "Gratis"
                                  ? "#d4f7d4"
                                  : "#F9D48D",
                              color:
                                card.rentalFee === "Gratis"
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
                            {card.rentalFee === "Gratis"
                              ? "Gratis untuk dibaca"
                              : `${card.rentalFee} untuk membaca`}
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
                                {card.readers}
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
                                {card.rating}
                              </span>
                            </div>
                            <div className="d-flex align-items-center ms-auto">
                              <img
                                src={
                                  isBookmarked ? filledBookmark : emptyBookmark
                                }
                                alt="Bookmark Icon"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  cursor: "pointer",
                                }}
                                onClick={toggleBookmark}
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
            Trending
          </h4>
          <div
            style={{
              width: "100%",
              maxWidth:"1100px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "16px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: "16px",
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  style={{
                    width: "200px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ padding: "16px", textAlign: "center" }}>
                    <img
                      src={card.image}
                      alt="Book Cover"
                      style={{
                        width: "156px",
                        height: "230px",
                        objectFit: "cover",
                        marginBottom: "16px",
                        borderRadius: "8px",
                      }}
                    />
                    <p
                      style={{
                        margin: "0",
                        color: "#5f6368",
                        fontSize: "14px",
                      }}
                    >
                      Pengarang{" "}
                      <span style={{ color: "#3C64EF", fontWeight: "bold" }}>
                        {card.author}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            Kategori
          </h4>
          <div>
            <div className="d-flex flex-start mb-3" style={{ gap: "10px" }}>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={
                    category === selectedCategory ? "warning" : "primary"
                  }
                  className="px-3 py-2 text-white"
                  style={{
                    borderRadius: "10px",
                    backgroundColor:
                      category === selectedCategory ? "#F2AE2E" : "#033473",
                    border: "none",
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div
              style={{
                width: "100%",
                maxWidth:"1100px",
                overflowX: "auto",
                whiteSpace: "nowrap",
                paddingBottom: "16px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "inline-flex", gap: "16px" }}>
                {filteredBooks.map((cardData, index) => (
                  <Card
                    key={index}
                    className="text-center"
                    style={{
                      border: "none",
                      width: "200px",
                      flexShrink: 0,
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={cardData.image}
                      alt={cardData.title}
                      style={{
                        width: "120px",
                        height: "180px",
                        margin: "0 auto",
                        borderRadius: "8px",
                      }}
                    />
                    <Card.Body>
                      <Card.Text className="h6">{cardData.title}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        </Col>

        {/* Elemen kanan */}
        <Col md={4} sm={12} className="p-3">
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            height: "1300px",
            backgroundColor: "#033473",
            padding: "16px",
            color: "white",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "400px",
            marginLeft: "auto",
            margin:"auto",
            marginRight:"auto"
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTi_W1jo22MUtRtxI3yCM4Q-iWdS5q6Qe8A&s"
            width="156"
            height="230"
            alt="Book Cover"
            className="rounded"
            style={{ marginTop: "20px", borderRadius: "8px" }}
          />
          <h5
            style={{ marginTop: "16px", fontSize: "20px", fontWeight: "bold" }}
          >
            Laut Bercerita
          </h5>
          <p style={{ marginTop: "4px", fontSize: "14px", color: "#B0C4DE" }}>
            Leila S. Chudori
          </p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "12px" }}
          >
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                alt="Star Icon"
                style={{ width: "20px", height: "20px", marginRight: "4px" }}
              />
            ))}
            <span style={{ fontSize: "16px", marginLeft: "8px" }}>4.9</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "16px",
            }}
          >
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "16px", margin: 0, fontWeight: "bold" }}>
                400
              </p>
              <p style={{ fontSize: "12px", color: "#B0C4DE" }}>Pages</p>
            </div>
            <div
              style={{
                borderRight: "1px solid white",
                height: "100%",
                alignSelf: "center",
              }}
            ></div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "16px", margin: 0, fontWeight: "bold" }}>
                643
              </p>
              <p style={{ fontSize: "12px", color: "#B0C4DE" }}>Ratings</p>
            </div>
            <div
              style={{
                borderRight: "1px solid white",
                height: "100%",
                alignSelf: "center",
              }}
            ></div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "16px", margin: 0, fontWeight: "bold" }}>
                110
              </p>
              <p style={{ fontSize: "12px", color: "#B0C4DE" }}>Reviews</p>
            </div>
          </div>
          <p className="text-center fs-6">
            Buku ini terdiri atas dua bagian. Bagian pertama mengambil sudut
            pandang seorang mahasiswa aktivis bernama Laut, menceritakan
            bagaimana Laut dan kawan-kawannya menyusun rencana, berpindah-pindah
            dalam pelarian, hingga tertangkap oleh pasukan rahasia. Sedangkan
            bagian kedua dikisahkan oleh Asmara, adik Laut.
          </p>
          <button className="btn btn-warning text-white rounded-pill px-4 py-2 mt-3">
            Lanjutkan membaca
          </button>
      </div>
        </Col>
    </Row>
    </div>
    </Container>
  );
};

export default Dashboard;
