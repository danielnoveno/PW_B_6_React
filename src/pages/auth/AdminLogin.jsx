import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigasi setelah login
import { useAuth } from "../../contexts/AuthContext";
import "./userLogin.css";
import { toast } from "react-toastify"; // Notifikasi

const AdminLoginPage = () => {
  const [email, setEmail] = useState(""); // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const [error, setError] = useState(null); // State untuk error
  const navigate = useNavigate(); // Untuk navigasi
  const { adminLogin } = useAuth(); // Fungsi login dari AuthContext

  // Function untuk handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Hindari reload halaman
    setError(null); // Reset error
    
    // Validasi input kosong
    if (!email || !password) {
      toast.error("Mohon isi email dan password");
      return;
    }

    try {
      // Memanggil fungsi adminLogin dengan kredensial
      await adminLogin({
        email: email, // Mengirim email
        password: password, // Mengirim password
      });
      toast.success("Login berhasil!");
      navigate("/admin/dashboard"); // Redirect ke dashboard admin
    } catch (err) {
      setError(err.message || "Login gagal. Silakan coba lagi.");
      toast.error(err.message || "Login gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="container">
      <div className="row login-container">
        {/* Bagian Kiri - Form Login */}
        <div className="col-md-6 login-form">
          <h2 className="mb-4">Login Admin</h2>
          <p>Hanya admin yang terdaftar yang dapat login.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
          </form>
        </div>

        {/* Bagian Kanan - Gambar */}
        <div className="col-md-6 login-right d-none d-md-block">
          <div className="image-container">
            <img
              src="https://cdn.pixabay.com/photo/2023/05/07/18/00/library-7976837_1280.jpg"
              alt="Library"
              className="responsive-image"
            />
            <h3 className="overlay-text">DigiLibrary</h3>
            <p className="image-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="social-icons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-telegram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
