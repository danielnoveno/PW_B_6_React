import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Row, Col } from "react-bootstrap";
import ManyUser from "/src/assets/icons/filled-users.webp";
import bookRent from "/src/assets/icons/color-book.webp";
import bookDownload from "/src/assets/icons/unduhcolor-icon.webp";
import bookUpload from "/src/assets/icons/upload-icon.webp";
import yellowPencil from "/src/assets/icons/pencil-edit-yellow.webp";
import singleStar from "/src/assets/icons/single-star.webp";

const DashboardAdmin = () => {
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
        "https://ew.com/thmb/rvat6WP-MplFuFNA4xJ-aGKEADc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9781408855652-png-c57764456b554308ae1398474caab3c2.jpg",
      author: "J.K. Rowling",
      title: "Harry Potter",
      year: "1997",
      price: "Rp. 100.000",
      rentalFee: "Rp. 10.000",
      readers: 120,
      rating: 4.8,
      category: "Fantasy",
      isBookmarked: false,
    },
    {
      id: 3,
      image:
        "https://m.media-amazon.com/images/I/61ZewDE3beL.jpg",
      author: "George Orwell",
      title: "1984",
      year: "1949",
      price: "Rp. 80.000",
      rentalFee: "Rp. 8.000",
      readers: 90,
      rating: 4.7,
      category: "Politik",
      isBookmarked: false,
    },
    {
      id: 4,
      image:
        "https://ebooks.gramedia.com/ebook-covers/84217/image_highres/BLK_TWOTW1682674633356.png",
      author: "H.G. Wells",
      title: "The War of the Worlds",
      year: "1898",
      price: "Rp. 70.000",
      rentalFee: "Rp. 5.000",
      readers: 150,
      rating: 4.5,
      category: "Sci-Fi",
      isBookmarked: false,
    },
    {
      id: 5,
      image:
        "https://m.media-amazon.com/images/I/61lBRY5h+NL._AC_UF1000,1000_QL80_.jpg",
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
        "https://m.media-amazon.com/images/I/71lE-E7UrdL._AC_UF894,1000_QL80_.jpg",
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

  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]); 
  const [books, setBooks] = useState([]);

  // Panggil API untuk mendapatkan jumlah pengguna
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/count");
        setUserCount(response.data.total_users); // Simpan jumlah pengguna
      } catch (error) {
        console.error("Gagal mengambil jumlah pengguna:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedUsers = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers); // Simpan data sebagai array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buku/admin");
        setBooks(response.data); 
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      }
    };

    fetchBooks();
    fetchUsers();
    fetchUserCount();
  }, []);

  return (
    <Container fluid className="px-0">
      {/* Section Cards */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flex: 1 }}>
        <Row className="align-items-center">
          <div
            style={{
              display: "flex",
              gap: "20px", // Jarak antar card
              justifyContent: "space-between", // Distribusi card dalam kontainer
              flexWrap: "wrap", // Wrap ke bawah jika tidak cukup ruang
              whiteSpace: "normal", // Mencegah "nowrap" agar lebih fleksibel
            }}
          >
            {/* Card 1 */}
            <div
              className="card"
              style={{
                width: "300px",
                height: "130px",
                flex: "1 1 300px", // Basis 300px, bisa grow/shrink
                maxWidth: "300px",
              }}
            >
              <div className="card-body">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={ManyUser}
                      width="80"
                      height="80"
                      alt="Icon Pengguna"
                      className="rounded-circle"
                    />
                  </Col>
                  <Col>
                    <h1 className="card-title mb-0">{userCount}</h1>
                    <p className="card-text">Pengguna</p>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="card"
              style={{
                width: "300px",
                height: "130px",
                flex: "1 1 300px", // Basis 300px, bisa grow/shrink
                maxWidth: "300px",
              }}
            >
              <div className="card-body">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={bookRent}
                      width="80"
                      height="80"
                      alt="Icon Buku Terpinjam"
                      className="rounded-circle"
                    />
                  </Col>
                  <Col>
                    <h1 className="card-title mb-0">710</h1>
                    <p className="card-text">Buku Terpinjam</p>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="card"
              style={{
                width: "300px",
                height: "130px",
                flex: "1 1 300px",
                maxWidth: "300px",
              }}
            >
              <div className="card-body">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={bookDownload}
                      width="80"
                      height="80"
                      alt="Icon Buku Terunduh"
                      className="rounded-circle"
                    />
                  </Col>
                  <Col>
                    <h1 className="card-title mb-0">970</h1>
                    <p className="card-text">Buku Terunduh</p>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="card"
              style={{
                width: "300px",
                height: "130px",
                flex: "1 1 300px",
                maxWidth: "300px",
              }}
            >
              <div className="card-body">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={bookUpload}
                      width="80"
                      height="80"
                      alt="Icon Buku Terunggah"
                      className="rounded-circle"
                    />
                  </Col>
                  <Col>
                    <h1 className="card-title mb-0">5500</h1>
                    <p className="card-text">Buku Terunggah</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Row>
          {/* Section Tabel */}
          <div style={{ marginTop: "40px", width:"100%", maxWidth:"1380px" }}>
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
              Daftar Pengguna
            </h4>
            <div
              className="border rounded p-2"
              style={{ backgroundColor: "#fff" }}
            >
              <Table
                bordered
                hover
                responsive
                style={{
                  borderColor: "white",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    {/* <th></th> */}
                    <th>ID PENGGUNA</th>
                    <th>NAMA USER</th>
                    <th>EMAIL</th>
                    <th>TERPINJAM</th>
                    <th>TERUNDUH</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {/* <td>
                        <input type="checkbox" />
                      </td> */}
                      <td style={{ color: "#007bff" }}>{user.id}</td>
                      <td style={{ textAlign: "center", color: "#007bff" }}>
                        {`${user.nama_depan || ""} ${user.nama_belakang || ""}`}
                      </td>
                      <td style={{ color: "#007bff" }}>{user.email}</td>
                      <td style={{ textAlign: "center", color: "#007bff" }}>
                        {user.borrowed || 0}
                      </td>
                      <td style={{ textAlign: "center", color: "#007bff" }}>
                        {user.downloaded || 0}
                      </td>
                      {/* <td className="text-center">
                        <img
                          src={yellowPencil}
                          width="30"
                          height="30"
                          alt="Edit"
                          style={{ cursor: "pointer" }}
                        />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
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
              Daftar Buku
            </h4>
            <div
              className="border rounded p-2"
              style={{ backgroundColor: "#fff", border: "1px solid #3C64EF" }}
            >
              <Table
                bordered
                hover
                responsive
                style={{
                  textAlign: "center",
                  borderColor: "white",
                }}
              >
                <thead>
                  <tr>
                    {/* <th></th> */}
                    <th>ID BUKU</th>
                    <th>NAMA BUKU</th>
                    <th>PENERBIT</th>
                    <th>HALAMAN</th>
                    <th>RATING</th>
                    <th>ISSN</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={index} style={{ verticalAlign: "middle" }}>
                      {/* <td>
                        <input type="checkbox" />
                      </td> */}
                      <td style={{ color: "#007bff" }}>{book.id}</td>
                      <td style={{ color: "#007bff" }}>{book.judul}</td>
                      <td style={{ color: "#007bff" }}>{book.penerbit}</td>
                      <td style={{ color: "#007bff" }}>{book.halaman}</td>
                      <td>
                        {/* Menampilkan bintang sesuai rating */}
                        {[...Array(parseInt(book.rating || 0))].map((_, i) => (
                          <img
                            key={i}
                            src={singleStar}
                            alt="Star Icon"
                            width="20"
                            height="20"
                            style={{ marginRight: "2px" }}
                          />
                        ))}
                      </td>
                      <td style={{ color: "#007bff" }}>{book.ISBN}</td>
                      {/* <td className="text-center">
                        <img
                          src={yellowPencil}
                          width="30"
                          height="30"
                          alt="Edit"
                          style={{ cursor: "pointer" }}
                        />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
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
              Banyak Disukai
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardAdmin;
