import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap"; // Import Modal and Button
import { Link, useLocation, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import "./AdminSideBarCollapse.css";
import minimizeSideImg from "../assets/icons/minimizesider.webp";
import dashboardIcon from "../assets/icons/dashboard-icon.webp";
import ManageBukuIcon from "../assets/icons/books.webp";
import ManageUserIcon from "../assets/icons/people.webp";
import UnggahIcon from "../assets/icons/document-upload.webp";
import userIcon from "../assets/icons/user-icon.webp";
import logoutIcon from "../assets/icons/logout-icon.webp";

const AdminSidebarCollapse = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate instead of history

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActiveRoute = (route) => location.pathname === route;

  const handleLogout = () => {
    // Implement the logout logic, like clearing cookies or tokens
    console.log("Admin logged out");
    setShowModal(false); // Close modal after logout
    navigate("/"); // Redirect to login page
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
            <Link to="/admin">DIGILIBRARY</Link>
          </div>
        </div>
        <Nav className="sidebar-nav generalMenu flex-column">
          {/* Sidebar menu items */}
          <Nav.Item className="sidebar-item">
            <Link
              to="/admin/dashboard"
              className={`subMenuSidebar ${
                isActiveRoute("/admin/dashboard") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <img
                  src={dashboardIcon}
                  width="26"
                  height="26"
                  alt="dashboard"
                />
                <div className="mr-8 textsidebar sidebar-link">Dashboard</div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/admin/manage-buku"
              className={`subMenuSidebar ${
                isActiveRoute("/admin/manage-buku") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <img
                  src={ManageBukuIcon}
                  width="26"
                  height="26"
                  alt="manage buku"
                />
                <div className="mr-8 textsidebar sidebar-link">
                  Manajemen Buku
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/admin/manage-user"
              className={`subMenuSidebar ${
                isActiveRoute("/admin/manage-user") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <img
                  src={ManageUserIcon}
                  width="26"
                  height="26"
                  alt="manage user"
                />
                <div className="mr-8 textsidebar sidebar-link">
                  Manajemen Pengguna
                </div>
              </div>
            </Link>
          </Nav.Item>

          <Nav.Item className="sidebar-item">
            <Link
              to="/admin/unggah-buku"
              className={`subMenuSidebar ${
                isActiveRoute("/admin/unggah-buku") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <img
                  src={UnggahIcon}
                  width="26"
                  height="26"
                  alt="unggah buku"
                />
                <div className="mr-8 textsidebar sidebar-link">Unggah Buku</div>
              </div>
            </Link>
          </Nav.Item>

          <div className="divider"></div>

          <Nav.Item className="sidebar-item">
            <Link
              to="/admin/profile"
              className={`subMenuSidebar ${
                isActiveRoute("/admin/profile") ? "primary" : "secondary"
              }`}
            >
              <div className="baseSubMenu">
                <img src={userIcon} width="26" height="26" alt="profile" />
                <div className="mr-8 textsidebar sidebar-link">Profile</div>
              </div>
            </Link>
          </Nav.Item>

          {/* Logout item */}
          <Nav.Item className="sidebar-item">
            <div
              className="subMenuSidebar secondary"
              onClick={() => setShowModal(true)} // Show modal on click
            >
              <div className="baseSubMenu">
                <img src={logoutIcon} width="26" height="26" alt="logout" />
                <div className="mr-8 textsidebar sidebar-link secondary">
                  Keluar
                </div>
              </div>
            </div>
          </Nav.Item>
        </Nav>
      </aside>

      {/* Logout confirmation modal */}
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

export default AdminSidebarCollapse;
