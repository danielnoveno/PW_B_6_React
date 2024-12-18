import React, { useState } from "react";
import { Navbar, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TopNavbar.css";

// Import icons
import profileIcon from "../assets/icons/user-icon.webp";
import searchIcon from "../assets/icons/search-icon.webp";
import bellIcon from "../assets/icons/bell.webp";
import minimizeSideImg from "../assets/icons/minimizesider.webp";
import dashboardIcon from "../assets/icons/dashboard-icon.webp";
import bookmarkIcon from "../assets/icons/bookmark-icon.webp";
import myDigiIcon from "../assets/icons/mydigi-icon.webp";
import unduhanIcon from "../assets/icons/unduhan-icon.webp";
import transaksiIcon from "../assets/icons/transaksi-icon.webp";
import ManageBukuIcon from "../assets/icons/books.webp";
import ManageUserIcon from "../assets/icons/people.webp";
import UnggahIcon from "../assets/icons/document-upload.webp";
import riwayatIcon from "../assets/icons/riwayat-icon.webp";

// Define the icons for each route
const routeIcons = {
  "/dashboard": dashboardIcon,
  "/bookmark": bookmarkIcon,
  "/digilibrary": myDigiIcon,
  "/unduhan": unduhanIcon,
  "/transaksi": transaksiIcon,
  "/riwayat": riwayatIcon,
  "/profile": profileIcon,
  "/edit-profile": profileIcon,
  "/detail-buku": bookmarkIcon,
  "/admin/dashboard": dashboardIcon,
  "/admin/manage-buku": ManageBukuIcon,
  "/admin/manage-user": ManageUserIcon,
  "/admin/unggah-buku": UnggahIcon,
  "/admin/profile": profileIcon,
  "/admin/edit-profile": profileIcon,
};

// Default Props to avoid userData being undefined
const TopNavbar = ({ userData }) => {
  const location = useLocation(); // Get current location

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Map routes to titles
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/bookmark": "Bookmark",
    "/digilibrary": "My DigiLibrary",
    "/unduhan": "Unduhan",
    "/transaksi": "Transaksi",
    "/riwayat": "Riwayat",
    "/profile": "Profile",
    "/edit-profile": "Edit Profile",
    "/detail-buku": "Detail Buku",
    "/admin/dashboard": "Dashboard Admin",
    "/admin/manage-buku": "Manajemen Buku",
    "/admin/manage-user": "Manajemen Pengguna",
    "/admin/unggah-buku": "Unggah Buku",
    "/admin/profile": "Profile Admin",
    "/admin/edit-profile": "Edit Profile Admin",
  };
  

  // Filter menu based on search query
  const filteredRoutes = Object.entries(routeTitles).filter(([path, title]) =>
    title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine the current title
  const currentTitle = routeTitles[location.pathname] || "DigiLibrary";

  // Get the icon for the current route
  const currentIcon = routeIcons[location.pathname] || profileIcon;

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Event handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar className='navbar-wrapper'>
      <div className='nav-content'>
        <div className='nav-title'>
          <img src={currentIcon} alt='Page Icon' className='nav-icon' />
          <span className='title-text'>{currentTitle}</span>
        </div>

        <div className='search-container'>
          <InputGroup>
            <div className='search-icon-wrapper'>
              <img src={searchIcon} alt='Search' className='search-icon' />
            </div>
            <Form.Control
              type='text'
              placeholder='Search'
              className='search-input'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>

          {/* Display search results */}
          {searchQuery && (
            <div className='search-results'>
              {filteredRoutes.map(([path, title]) => (
                <div key={path} className='search-item'>
                  <a href={path}>{title}</a>
                </div>
              ))}
              {filteredRoutes.length === 0 && (
                <p className='no-results'>No results found</p>
              )}
            </div>
          )}
        </div>

        <div className='user-section'>
          <span className='time-display'>{currentTime}</span>

          <div className='user-profile'>
            <Link
              to='/profile'
              state={{ userData }}
              className='d-flex align-items-center text-decoration-none'
              style={{ gap: "10px" }}
            >
              <div className='avatar-container'>
                <span>{userData?.email?.[0]?.toUpperCase() || "G"}</span>
              </div>
              <div className='user-info'>
              <span className="user-name fw-bold">
                {userData?.nama_depan || userData?.nama_belakang
                  ? `${userData?.nama_depan || ""} ${userData?.nama_belakang || ""}`.trim()
                  : userData?.nama || "Guest"}
              </span>
                <span className='user-email text-muted d-block'>
                  {userData?.email || "No Email"}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
