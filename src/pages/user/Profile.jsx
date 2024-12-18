import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Spinner,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import { getUserProfile } from "../../api/apiUser";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./Profile.css";

// Import icons
import userIcon from "../../assets/icons/user-icon.webp";
import searchIcon from "../../assets/icons/search-icon.webp";
import notificationIcon from "../../assets/icons/notification-icon.webp";
import pencilEditIcon from "../../assets/icons/pencil-edit-icon.webp";
import lockIcon from "../../assets/icons/icons-lock-blue-fill.webp";
import languageIcon from "../../assets/icons/fa6-solid-language.webp";
import clockIcon from "../../assets/icons/clock-clockwise.webp";
import trashIcon from "../../assets/icons/tabler-trash-filled.webp";
import api from "../../api/index";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        // Verify user and token exist before making the request
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        console.log("Token exists:", !!token);
        console.log("Stored user exists:", !!storedUser);

        if (!token || !storedUser) {
          throw new Error("No authentication token or user found");
        }

        const profile = await getUserProfile();
        console.log("Profile fetch successful:", profile);

        setUserData(profile);
        setLoading(false);
      } catch (err) {
        console.error("Profile fetch error details:", err);

        // More granular error handling
        if (err.status === 401 || err.status === 403) {
          console.log("Unauthorized - logging out");
          logout();
          navigate("/");
        } else {
          setError(err.message || "Failed to fetch profile");
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [logout, navigate]);

  const handleDeleteAccount = async () => {
    try {
      // Get the current user from localStorage to get the ID
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser || !currentUser.id) {
        throw new Error("User ID not found");
      }

      // Call the delete user API
      await api.delete(`/user/${currentUser.id}`);

      // Logout after successful deletion
      logout();

      // Redirect to login or home page
      navigate("/");

      // Show success toast
      toast.success("Akun berhasil dihapus");
    } catch (error) {
      console.error("Account deletion error:", error);

      // Show error toast
      toast.error(error.response?.data?.message || "Gagal menghapus akun");
    } finally {
      // Close the modal
      setShowDeleteModal(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to format gender
  const formatGender = (gender) => {
    if (gender === "L") return "Laki-laki";
    if (gender === "P") return "Perempuan";
    return "N/A";
  };

  if (loading) {
    return (
      <Container
        fluid
        className="profile-container d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="profile-container">
        <Alert variant="danger">
          {error}
          <button onClick={() => setError(null)} className="btn btn-link">
            Dismiss
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="profile-container">
      {/* Profile Card */}
      <Card className="profile-main-card">
        {/* Profile Picture */}
        <Image
          src={
            userData?.profilePic ||
            "https://i.pinimg.com/736x/b0/4d/c9/b04dc9fdc13efa50c1763336e813f3f2.jpg"
          }
          alt="Profile Picture"
          className="profile-picture"
        />

        {/* Edit Button */}
        <Card.Body>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <Link
              to="/edit-profile"
              className="d-flex align-items-center text-decoration-none"
            >
              <img src={pencilEditIcon} alt="Edit" className="edit-icon me-2" />
              <span className="text-primary fw-bold">Edit</span>
            </Link>
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <h1 className="profile-title">Profile</h1>

            <Row className="profile-details">
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={4} md={3} className="info-label">
                    Nama Depan
                  </Col>
                  <Col>{userData?.nama_depan || "N/A"} {userData?.nama_belakang || ""}</Col>
                </Row>
              </Col>
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={4} md={3} className="info-label">
                    Email
                  </Col>
                  <Col>{userData?.email || "N/A"}</Col>
                </Row>
              </Col>
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={4} md={3} className="info-label">
                    Nomor Telepon
                  </Col>
                  <Col>{userData?.no_telp || "N/A"}</Col>
                </Row>
              </Col>
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={4} md={3} className="info-label">
                    Tanggal Lahir
                  </Col>
                  <Col>{formatDate(userData?.tgl_lahir)}</Col>
                </Row>
              </Col>
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={4} md={3} className="info-label">
                    Jenis Kelamin
                  </Col>
                  <Col>{formatGender(userData?.jenis_kelamin)}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Settings Section */}
      <h2 className="settings-title">Setting</h2>

      {/* Settings Cards */}
      <Card className="settings-card">
        <Card.Body className="settings-item">
          <img src={lockIcon} alt="Lock" className="settings-icon" />
          <Link to="/password" className="settings-link">
            Ubah Password
          </Link>
        </Card.Body>
      </Card>

      <Card className="settings-card">
        <Card.Body className="settings-item">
          <img
            src={languageIcon}
            alt="Language"
            className="settings-icon language-icon"
          />
          <Link
            to="#"
            className="settings-link d-flex justify-content-between w-100"
          >
            <span>Bahasa</span>
            <span className="language-value">Indonesia</span>
          </Link>
        </Card.Body>
      </Card>

      <Card className="settings-card">
        <Card.Body className="settings-item">
          <img src={clockIcon} alt="History" className="settings-icon" />
          <Link to="/reading-history" className="settings-link">
            Riwayat terakhir
          </Link>
        </Card.Body>
      </Card>

      <Card className="settings-card delete-account">
        <Card.Body className="settings-item">
          <img src={trashIcon} alt="Delete" className="settings-icon" />
          <button
            onClick={() => setShowDeleteModal(true)}
            className="settings-link text-danger btn btn-link p-0"
          >
            Hapus Akun
          </button>
        </Card.Body>
      </Card>

      {/* Delete Account Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hapus Akun</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat
          dibatalkan.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Hapus Akun
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
