import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

const GantiPassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#4361ee",
      textDecoration: "none",
      fontSize: "16px",
      marginBottom: "32px",
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
      marginTop: "20px",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "14px",
      marginTop: "8px",
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
    // Clear error when user starts typing
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Add more client-side validations
    if (formData.newPassword.length < 6) {
      setError("Password baru minimal 6 karakter");
      return;
    }

    if (formData.newPassword !== formData.newPasswordConfirmation) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/user/change-password", {
        current_password: formData.oldPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.newPasswordConfirmation,
      });

      toast.success("Password berhasil diubah!");
      navigate("/profile");
    } catch (err) {
      console.error("Password Change Error:", err.response);

      setError(
        err.response?.data?.message ||
          "Gagal mengubah password. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.formSection}>
        <Link to="/profile" style={styles.backButton}>
          <i className="bi bi-arrow-left"></i>
          Kembali
        </Link>

        <h1 style={styles.title}>Ganti Password</h1>
        <p style={styles.subtitle}>Silahkan masukan password baru Anda.</p>

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
            <label htmlFor="oldPassword" style={styles.label}>
              Password Lama
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="Masukan password lama"
                value={formData.oldPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>
              Password Baru
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Masukan password baru"
                value={formData.newPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="newPasswordConfirmation" style={styles.label}>
              Konfirmasi Password Baru
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type="password"
                id="newPasswordConfirmation"
                name="newPasswordConfirmation"
                placeholder="Konfirmasi password baru"
                value={formData.newPasswordConfirmation}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          {error && <p style={styles.errorText}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Konfirmasi"}
          </button>
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

export default GantiPassword;
