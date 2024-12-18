import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../api/apiAuth";
import { useAuth } from "../contexts/AuthContext";
import "./SideBarCollapse.css";
// Import icons
import minimizeSideImg from "../assets/icons/minimizesider.webp";
import dashboardIcon from "../assets/icons/dashboard-icon.webp";
import bookmarkIcon from "../assets/icons/bookmark-icon.webp";
import myDigiIcon from "../assets/icons/mydigi-icon.webp";
import unduhanIcon from "../assets/icons/unduhan-icon.webp";
import transaksiIcon from "../assets/icons/transaksi-icon.webp";
import userIcon from "../assets/icons/user-icon.webp";
import logoutIcon from "../assets/icons/logout-icon.webp";
import riwayatIcon from "../assets/icons/riwayat-icon.webp";

const SidebarCollapse = ({ userData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      logout(); // This will clear the auth context state
      setShowModal(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <div className="wrapper">
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <img
              src={minimizeSideImg}
              alt="toggle sidebar"
              width="30"
              height="30"
            />
          </button>
          <div className="sidebar-logo">
            <Link to="/">DIGILIBRARY</Link>
          </div>
        </div>
        <Nav className="sidebar-nav generalMenu flex-column">
          <Nav.Item className="sidebar-item">
            <Link
              to="/dashboard"
              className={`subMenuSidebar ${
                isActiveRoute("/dashboard") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={dashboardIcon}
                    width="26"
                    height="26"
                    alt="dashboard"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/dashboard") ? "primary" : "secondary"
                  }`}
                >
                  Dashboard
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/bookmark"
              className={`subMenuSidebar ${
                isActiveRoute("/bookmark") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={bookmarkIcon}
                    width="26"
                    height="26"
                    alt="bookmark"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/bookmark") ? "primary" : "secondary"
                  }`}
                >
                  Bookmark
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/digilibrary"
              className={`subMenuSidebar ${
                isActiveRoute("/digilibrary") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={myDigiIcon}
                    width="26"
                    height="26"
                    alt="my digilibrary"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/digilibrary") ? "primary" : "secondary"
                  }`}
                >
                  My DigiLibrary
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/unduhan"
              className={`subMenuSidebar ${
                isActiveRoute("/unduhan") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={unduhanIcon}
                    width="26"
                    height="26"
                    alt="downloads"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/unduhan") ? "primary" : "secondary"
                  }`}
                >
                  Unduhan
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/transaksi"
              className={`subMenuSidebar ${
                isActiveRoute("/transaksi") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={transaksiIcon}
                    width="26"
                    height="26"
                    alt="transactions"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/transaksi") ? "primary" : "secondary"
                  }`}
                >
                  Transaksi
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/riwayat"
              className={`subMenuSidebar ${
                isActiveRoute("/riwayat") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img
                    src={riwayatIcon}
                    width="26"
                    height="26"
                    alt="transactions"
                  />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/riwayat") ? "primary" : "secondary"
                  }`}
                >
                  Riwayat
                </div>
              </div>
            </Link>
          </Nav.Item>

          <div className="divider"></div>

          <Nav.Item className="sidebar-item">
            <Link
              to="/profile"
              state={{ userData }}
              className={`subMenuSidebar ${
                isActiveRoute("/profile") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img src={userIcon} width="26" height="26" alt="profile" />
                </div>
                <div
                  className={`mr-8 textsidebar sidebar-link ${
                    isActiveRoute("/profile") ? "primary" : "secondary"
                  }`}
                >
                  Profile
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <div
              className="subMenuSidebar secondary"
              onClick={() => setShowModal(true)} // Menampilkan modal saat klik
            >
              <div className="baseSubMenu">
                <div className="iconBaseTwoToneDashboard">
                  <img src={logoutIcon} width="26" height="26" alt="logout" />
                </div>
                <div className="mr-8 textsidebar sidebar-link secondary">
                  Keluar
                </div>
              </div>
            </div>
          </Nav.Item>
        </Nav>
      </aside>

      {/* Modal Konfirmasi Logout */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Keluar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Iya
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="main m-1">
        <div className="content-wrapper" />
      </div>
    </div>
  );
};

export default SidebarCollapse;
