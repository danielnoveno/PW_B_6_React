import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify"; 
import { useAuth } from "../../contexts/AuthContext";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
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
  formRow: {
    display: "flex",
    gap: "30px",
    marginBottom: "24px",
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
    marginBottom: "20px",
  },
  footer: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
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
  socialButton: {
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

const UserRegister = () => {
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    birthDate: "",
    gender: "",
    sandi: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle antara true dan false
  };

  const [loading, setLoading] = useState(false); // for loading state
  const [errorMessage, setErrorMessage] = useState(""); // to display error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register({
        nama_depan: formData.firstName,
        nama_belakang: formData.lastName,
        email: formData.email,
        no_telp: formData.whatsapp,
        tgl_lahir: formData.birthDate,
        jenis_kelamin: formData.gender,
        sandi: formData.sandi,
      });

      toast.success("Registrasi berhasil");
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      {/* Form Section */}
      <div style={styles.formSection}>
        <h1 style={styles.title}>Registrasi</h1>
        <p style={styles.subtitle}>Silahkan buat akun terlebih dahulu.</p>

        {(error || errorMessage) && (
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
            {error || errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label htmlFor="firstName" style={styles.label}>
                Nama Depan
              </label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.icon} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nama depan"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="lastName" style={styles.label}>
                Nama Belakang
              </label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.icon} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Nama Belakang"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

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
            <label htmlFor="whatsapp" style={styles.label}>
              Nomor Whatsapp
            </label>
            <div style={styles.inputWrapper}>
              <Phone size={18} style={styles.icon} />
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                placeholder="Nomor"
                value={formData.whatsapp}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="birthDate" style={styles.label}>
              Tanggal Lahir
            </label>
            <div style={styles.inputWrapper}>
              <Calendar size={18} style={styles.icon} />
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                placeholder="Pilih tanggal"
                value={formData.birthDate}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="gender" style={styles.label}>
              Jenis Kelamin
            </label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.icon} />
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                style={styles.input}
                required
              >
                <option value="">Pilih gender</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
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
                  position: "absolute",
                  right: "12px",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Register sekarang"}
          </button>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "20px" }}>
              {errorMessage}
            </div>
          )}

          <div style={styles.footer}>
            Sudah punya akun?{" "}
            <Link to="/" style={styles.link}>
              Masuk di sini
            </Link>
          </div>
        </form>
      </div>

      {/* Image Section */}
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
            Temukan dunia pengetahuan tanpa batas di DigiLibrary. Dengan koleksi
            buku digital dari berbagai genre, kami hadir untuk mendukung
            semangat belajar dan membaca Anda. Jelajahi beragam karya literasi,
            ilmu pengetahuan, dan hiburan hanya dalam satu genggaman.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;