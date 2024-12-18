import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

// Import payment images
import bca from "../../assets/images/pembayaran/bca.webp";
import briva from "../../assets/images/pembayaran/briva.webp";
import mandiri from "../../assets/images/pembayaran/mandiri.webp";
import qris from "../../assets/images/pembayaran/qris.webp";
import bni from "../../assets/images/pembayaran/bni.webp";
import octo from "../../assets/images/pembayaran/octo.png";
import ovo from "../../assets/images/pembayaran/ovo.webp";
import spay from "../../assets/images/pembayaran/spay.webp";

const cardData = [
  {
    id: 1,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1646470594i/60129536.jpg",
    author: "Toshikazu Kawaguchi",
    title: "Home Sweet Loan",
    price: 150000,
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/32/bf/e8/32bfe8ee22f297b8848d832918a3dd6b.jpg",
    author: "Alberto Rey",
    title: "The Crimez of Streamfield",
    price: 150000,
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/1b/2b/14/1b2b147ccc5469c73462d3971fab1eb7.jpg",
    author: "Eve Shi",
    title: "Hackday",
    price: 69000,
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/e8/42/46/e84246bbff26ce461a605ca551e3e904.jpg",
    author: "Elian Dani",
    title: "IDEA",
    price: 139000,
  },
];

const Transaksi = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [duration, setDuration] = useState({});
  const [showEwalletDetails, setShowEwalletDetails] = useState(false);
  const [showVirtualAccountDetails, setShowVirtualAccountDetails] =
    useState(false);
  const [selectedPayment, setSelectedPayment] = useState(""); // Track selected payment

  const [clickedDownload, setClickedDownload] = useState({});
  const [clickedBaca, setClickedBaca] = useState({});

  const handlePayment = () => {
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  };

  // Handle duration change
  const handleDurationChange = (id, increment) => {
    setDuration((prev) => {
      const newValue = (prev[id] || 1) + increment;
      return {
        ...prev,
        [id]: Math.max(newValue, 1),
      };
    });
  };

  // Handle Download button click
  const handleDownloadClick = (id) => {
    setClickedDownload((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle status click for Download
    }));
    setClickedBaca((prev) => ({
      ...prev,
      [id]: false, // Reset status click for Baca
    }));
  };

  // Handle Baca button click
  const handleBacaClick = (id) => {
    setClickedBaca((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle status click for Baca
    }));
    setClickedDownload((prev) => ({
      ...prev,
      [id]: false, // Reset status click for Download
    }));
  };

  // Calculate price based on whether Download or Baca is clicked
  const calculatePrice = (item) => {
    if (clickedBaca[item.id]) {
      // 30% discount for Baca
      return item.price * 0.7;
    }
    return item.price; // Default price for Download
  };

  // Calculate total price
  const calculateTotal = () => {
    return cardData.reduce(
      (total, item) => total + calculatePrice(item) * (duration[item.id] || 1),
      0
    );
  };

  // Calculate additional charges for each payment method
  const calculatePaymentPrice = (basePrice, paymentMethod) => {
    switch (paymentMethod) {
      case "qris":
        return basePrice + 0;
      case "ovo":
      case "spay":
        return basePrice + 1000;
      case "bca":
      case "briva":
      case "mandiri":
        return basePrice + 3000;
      default:
        return basePrice;
    }
  };

  const toggleEwalletDetails = () => setShowEwalletDetails((prev) => !prev);
  const toggleVirtualAccountDetails = () =>
    setShowVirtualAccountDetails((prev) => !prev);

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={8}>
          {cardData.map((item) => (
            <Card key={item.id} className="mb-4 shadow-sm rounded p-3">
              <Row className="align-items-center">
                <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </Col>
                <Col xs={12} sm={10}>
                  <div className="p-2">
                    <h4 className="mb-1 fw-bold text-start">{item.title}</h4>
                    <p
                      className="text-muted text-start mb-2"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {item.author}
                    </p>

                    {/* Harga di sebelah kiri */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span
                        className="fw-semibold"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Harga:{" "}
                        {clickedBaca[item.id]
                          ? `Rp ${(item.price * 0.7).toLocaleString()}`
                          : `Rp ${item.price.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-end">
                      {/* Tombol Download dan Baca */}
                      <div className="d-flex gap-2">
                        <Button
                          variant="warning"
                          size="md"
                          style={{
                            backgroundColor: clickedDownload[item.id]
                              ? "#DF970C"
                              : "#FFECB3",
                            borderColor: clickedDownload[item.id]
                              ? "#FFECB3"
                              : "#DF970C",
                            color: clickedDownload[item.id]
                              ? "#FFECB3"
                              : "#DF970C",
                          }}
                          onClick={() => handleDownloadClick(item.id)}
                        >
                          Download
                        </Button>
                        <Button
                          variant="success"
                          size="md"
                          style={{
                            backgroundColor: clickedBaca[item.id]
                              ? "#388E3C"
                              : "#C8E6C9",
                            borderColor: clickedBaca[item.id]
                              ? "#C8E6C9"
                              : "#388E3C",
                            color: clickedBaca[item.id] ? "#C8E6C9" : "#388E3C",
                          }}
                          onClick={() => handleBacaClick(item.id)}
                        >
                          Baca
                        </Button>
                      </div>

                      {/* Durasi */}
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleDurationChange(item.id, -1)}
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="mx-2 text-center"
                          style={{
                            width: "50px",
                            height: "30px",
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            border: "1px solid #ced4da",
                            borderRadius: "5px",
                          }}
                          value={duration[item.id] || 1}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              parseInt(e.target.value, 10) || 1
                            );
                            setDuration((prev) => ({
                              ...prev,
                              [item.id]: value,
                            }));
                          }}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleDurationChange(item.id, 1)}
                        >
                          +
                        </Button>
                        <span className="ms-2">Hari</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                Jumlah Total
              </Card.Title>
              <Card.Text
                className="h3 fw-bold"
                style={{ color: "black", fontSize: "2rem" }}
              >
                Rp {calculateTotal().toLocaleString()}
              </Card.Text>
              <Card.Title className="mt-4">Metode Pembayaran</Card.Title>

              {/* E-wallet */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>E-Wallet</h5>
                  <ChevronDown
                    className="cursor-pointer"
                    onClick={toggleEwalletDetails}
                    style={{
                      transform: showEwalletDetails
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    }}
                  />
                </div>

                <div className="mt-2">
                  <div className="payment-method-scroll">
                    <Button
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => setSelectedPayment("qris")}
                    >
                      <img
                        src={qris}
                        alt="QRIS"
                        style={{ width: "70px", height: "25px" }}
                      />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => setSelectedPayment("ovo")}
                    >
                      <img
                        src={ovo}
                        alt="OVO"
                        style={{ width: "70px", height: "25px" }}
                      />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSelectedPayment("spay")}
                    >
                      <img
                        src={spay}
                        alt="ShopeePay"
                        style={{ width: "60px", height: "25px" }}
                      />
                    </Button>
                  </div>
                </div>

                {/* E-wallet details */}
                {showEwalletDetails && (
                  <div className="mt-3">
                    {/* QRIS */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "qris"}
                        onChange={() => setSelectedPayment("qris")}
                        label=""
                        className="me-3"
                      />
                      <span>QRIS</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "qris"
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* OVO */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "ovo"}
                        onChange={() => setSelectedPayment("ovo")}
                        label=""
                        className="me-3"
                      />
                      <span>OVO</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "ovo"
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* ShopeePay */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "spay"}
                        onChange={() => setSelectedPayment("spay")}
                        label=""
                        className="me-3"
                      />
                      <span>ShopeePay</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "spay"
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Virtual Account */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Virtual Account</h5>
                  <ChevronDown
                    className="cursor-pointer"
                    onClick={toggleVirtualAccountDetails}
                    style={{
                      transform: showVirtualAccountDetails
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    }}
                  />
                </div>

                <div className="mt-2">
                  <div className="payment-method-scroll">
                    <Button
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => setSelectedPayment("bca")}
                    >
                      <img
                        src={bca}
                        alt="BCA"
                        style={{ width: "50px", height: "25px" }}
                      />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => setSelectedPayment("briva")}
                    >
                      <img
                        src={briva}
                        alt="BRI"
                        style={{ width: "70px", height: "25px" }}
                      />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSelectedPayment("mandiri")}
                    >
                      <img
                        src={mandiri}
                        alt="Mandiri"
                        style={{ width: "70px", height: "25px" }}
                      />
                    </Button>
                  </div>
                </div>

                {/* Virtual Account details */}
                {showVirtualAccountDetails && (
                  <div className="mt-3">
                    {/* BCA */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "bca"}
                        onChange={() => setSelectedPayment("bca")}
                        label=""
                        className="me-3"
                      />
                      <span>BCA</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "bca"
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* BRI */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "briva"}
                        onChange={() => setSelectedPayment("briva")}
                        label=""
                        className="me-3"
                      />
                      <span>BRI</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "briva"
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* Mandiri */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        checked={selectedPayment === "mandiri"}
                        onChange={() => setSelectedPayment("mandiri")}
                        label=""
                        className="me-3"
                      />
                      <span>Mandiri</span>
                      <span className="ms-auto">
                        Rp{" "}
                        {calculatePaymentPrice(
                          calculateTotal(),
                          "mandiri"
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="primary"
                className="w-100"
                onClick={handlePayment}
                disabled={!selectedPayment}
              >
                Bayar Sekarang
              </Button>

              {/* Success Modal */}
              <Modal
                show={showSuccessModal}
                onHide={handleSuccessModalClose}
                centered
              >
                <Modal.Header closeButton={false} className="border-0">
                  <Modal.Title className="w-100 text-center">
                    Pembayaran Berhasil!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center pb-4">
                  <div className="mb-4">
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ fontSize: "4rem" }}
                    />
                  </div>
                  <p>Transaksi Anda telah berhasil diproses.</p>
                  <Button
                    variant="primary"
                    onClick={handleSuccessModalClose}
                    className="px-4"
                  >
                    OK
                  </Button>
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaksi;
