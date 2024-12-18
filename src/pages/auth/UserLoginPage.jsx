import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const UserLoginPage = () => {
  const { login, adminLogin, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData, ] = useState({
    email: "",
    sandi: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle antara true dan false
  };

  // Add media queries for responsiveness
  const mediaStyles = {
    "@media (max-width: 1400px)": {
      loginContainer: {
        width: "95vw",
      },
      formSection: {
        padding: "40px 60px",
      },
    },
    "@media (max-width: 1024px)": {
      loginContainer: {
        width: "90vw",
      },
      formSection: {
        padding: "30px 40px",
      },
    },
    "@media (max-width: 768px)": {
      loginContainer: {
        flexDirection: "column",
        height: "auto",
      },
      formSection: {
        flex: "1 0 auto",
        padding: "20px",
      },
      imageSection: {
        display: "none",
      },
    },
  };

  const styles = {
    loginContainer: {
      background: "white",
      height: "95vh",
      borderRadius: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "row",
      width: "98vw",
      maxWidth: "1200px",
      overflow: "hidden",
      margin: "18px auto",
    },
    formSection: {
      flex: "0 0 60%",
      padding: "60px 100px",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
    imageSection: {
      flex: "0 0 40%",
      backgroundImage:
        "url(https://cdn.pixabay.com/photo/2023/05/07/18/00/library-7976837_1280.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      minHeight: "100%",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      color: "white",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#333",
    },
    subtitle: {
      color: "#666",
      marginBottom: "32px",
    },
    formGroup: {
      flex: 1,
      marginBottom: "24px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#333",
      fontSize: "14px",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "14px",
      paddingLeft: "45px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "15px",
      color: "#333",
      backgroundColor: "white",
    },
    icon: {
      position: "absolute",
      left: "12px",
      color: "#666",
    },
    forgotPassword: {
      display: "block",
      textAlign: "right",
      color: "#4361ee",
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "8px",
      marginBottom: "24px",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#4361ee",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginBottom: "20px",
    },
    divider: {
      textAlign: "center",
      color: "#666",
      fontSize: "14px",
      margin: "20px 0",
      position: "relative",
    },
    socialButton: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "white",
      color: "#333",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    footer: {
      textAlign: "center",
      color: "#666",
      fontSize: "14px",
      marginTop: "20px",
    },
    link: {
      color: "#4361ee",
      textDecoration: "none",
      fontWeight: "500",
    },
    socialIcons: {
      marginTop: "auto",
      display: "flex",
      gap: "16px",
    },
    socialIconButton: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4361ee",
      borderRadius: "8px",
      color: "white",
      textDecoration: "none",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.sandi) {
      toast.error("Mohon isi email dan password");
      return;
    }

    try {
      // Check if it's an admin login
      if (formData.email.includes("admin")) {
        await adminLogin({
          email: formData.email,
          sandi: formData.sandi,
        });
      } else {
        // Regular user login
        await login({
          email: formData.email,
          sandi: formData.sandi,
        });
      }
    } catch (err) {
      toast.error(err.message || "Login gagal. Silakan coba lagi.");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login dengan ${provider}`);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.formSection}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>Silahkan login akun Anda terlebih dahulu.</p>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.icon} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
          <label htmlFor="sandi" style={styles.label}>
            Password
          </label>
          <div style={styles.inputWrapper}>
            <Lock size={18} style={styles.icon} />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="sandi"
              name="sandi"
              placeholder="Password"
              value={formData.sandi}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '12px',
                cursor: 'pointer',
                color: '#666',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
            <Link to="/forgot-password" style={styles.forgotPassword}>
              Lupa Password?
            </Link>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          <div style={styles.divider}>Login Dengan</div>

          <button
            type="button"
            style={{ ...styles.socialButton, marginBottom: "12px" }}
            onClick={() => handleSocialLogin("Google")}
          >
            <i className="bi bi-google" style={{ fontSize: "18px" }}></i>
            Google
          </button>

          <button
            type="button"
            style={styles.socialButton}
            onClick={() => handleSocialLogin("Facebook")}
          >
            <i className="bi bi-facebook" style={{ fontSize: "18px" }}></i>
            Facebook
          </button>

          <div style={styles.footer}>
            Belum punya akun?{" "}
            <Link to="/register" style={styles.link}>
              Daftar di sini
            </Link>
          </div>
        </form>
      </div>

      <div style={styles.imageSection}>
        <div style={styles.overlay}>
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Digi<span style={{ color: "#4361ee" }}>Library</span>
          </h2>
          <p style={{ marginBottom: "24px", lineHeight: "1.6" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.
          </p>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialIconButton}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" style={styles.socialIconButton}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" style={styles.socialIconButton}>
              <i className="bi bi-telegram"></i>
            </a>
            <a href="#" style={styles.socialIconButton}>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
