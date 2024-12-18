import React, { useState, useEffect } from "react";
import { Nav, Navbar, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Bookmark,
  Book,
  Download,
  CreditCard,
  Person,
  BoxArrowRight,
  ChevronLeft,
  Bell,
  Search,
  ChevronDown,
} from "react-bootstrap-icons";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [time, setTime] = useState("");
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: Grid },
    { path: "/bookmark", name: "Bookmark", icon: Bookmark },
    { path: "/my-digilibrary", name: "My DigiLibrary", icon: Book },
    { path: "/unduhan", name: "Unduhan", icon: Download },
    { path: "/transaksi", name: "Transaksi", icon: CreditCard },
    { path: "/profile", name: "Profile", icon: Person },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: isCollapsed ? "80px" : "250px",
          transition: "all 0.3s",
          backgroundColor: "white",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {!isCollapsed ? (
            <>
              <Book style={{ fontSize: "1.5rem", color: "#007bff" }} />
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#007bff",
                }}
              >
                DigiLibrary
              </span>
            </>
          ) : (
            <>
              <Book style={{ fontSize: "1.5rem", color: "#007bff" }} />
              <span
                style={{
                  marginLeft: "8px",
                  height: "36px",
                }}
              ></span>
            </>
          )}
          <ChevronLeft
            style={{ cursor: "pointer", color: "#6c757d" }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        <Nav style={{ flexGrow: 1, padding: "16px 0" }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Nav.Item key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    color:
                      location.pathname === item.path ? "white" : "#6c757d",
                    backgroundColor:
                      location.pathname === item.path
                        ? "#007bff"
                        : "transparent",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                  }}
                >
                  <Icon style={{ marginRight: "8px", fontSize: "1.25rem" }} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>

        <Nav.Item
          style={{
            borderTop: "1px solid #e0e0e0",
            padding: "16px 0",
          }}
        >
          <Link
            to="/logout"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              color: "#6c757d",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            <BoxArrowRight
              style={{ marginRight: "8px", fontSize: "1.25rem" }}
            />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </Nav.Item>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Top Navbar */}
        <Navbar
          style={{
            height: "69px",
            width: "100%",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Search style={{ fontSize: "1.25rem", color: "#6c757d" }} />
            <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>
              Dashboard
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {/* Time Display */}
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "500",
                color: "#007bff",
              }}
            >
              {time}
            </span>

            <InputGroup style={{ maxWidth: "350px" }}>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                style={{
                  borderRadius: "20px",
                  paddingLeft: "40px",
                }}
              />
              <Search
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#007bff",
                  fontSize: "1.25rem",
                }}
              />
            </InputGroup>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Bell style={{ fontSize: "1.5rem", color: "#6c757d" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "1.25rem",
                }}
              >
                👤
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}>Jane Doe</span>
                <span style={{ fontSize: "12px", color: "#6c757d" }}>
                  janedoee02@gmail.com
                </span>
              </div>
              <ChevronDown style={{ fontSize: "1.25rem", color: "#6c757d" }} />
            </div>
          </div>
        </Navbar>

        {/* Main Content Area */}
        <div
          style={{ flexGrow: 1, padding: "16px", backgroundColor: "#f8f9fa" }}
        >
          Your content goes here
        </div>
      </div>
    </div>
  );
};

export default Layout;
