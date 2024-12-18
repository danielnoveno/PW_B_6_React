import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../api/apiUser";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    no_telp: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    profilePicture: "https://via.placeholder.com/150",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const styles = {
    pageContainer: {
      padding: "24px",
      maxWidth: "1200px",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    formCard: {
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#D6E4FC",
      position: "relative",
      marginTop: "60px",
    },
    profilePictureContainer: {
      position: "relative",
      width: "100px",
      marginLeft: "50px",
      marginTop: "-50px",
    },
    profilePicture: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "4px solid white",
      objectFit: "cover",
    },
    uploadButton: {
      position: "absolute",
      right: "-10px",
      bottom: "0",
      backgroundColor: "#3C64EF",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "2px solid white",
    },
    uploadIcon: {
      color: "white",
      fontSize: "18px",
    },
    formContent: {
      padding: "20px",
      color: "#3C64EF",
    },
    formTitle: {
      color: "#3C64EF",
      marginBottom: "24px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#3C64EF",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #D1D5DB",
      fontSize: "16px",
      color: "#374151",
      backgroundColor: "white",
      boxSizing: "border-box",
    },
    buttonContainer: {
      display: "flex",
      gap: "16px",
      marginTop: "24px",
      justifyContent: "flex-end",
    },
    cancelButton: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid #3C64EF",
      backgroundColor: "white",
      color: "#3C64EF",
      cursor: "pointer",
      fontSize: "16px",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    saveButton: {
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#3C64EF",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
    },
    fileInput: {
      display: "none",
    },
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile();

        // Map backend data to form state
        setFormData({
          nama_depan: profile.nama_depan || "",
          nama_belakang: profile.nama_belakang || "",
          email: profile.email || "",
          no_telp: profile.no_telp || "",
          tgl_lahir: profile.tgl_lahir
            ? new Date(profile.tgl_lahir).toISOString().split("T")[0]
            : "",
          jenis_kelamin: profile.jenis_kelamin || "",
          profilePicture:
            profile.profilePic || "https://via.placeholder.com/150",
        });

        setLoading(false);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message || "Failed to fetch profile");
        setLoading(false);
        toast.error("Gagal memuat profil");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      // Check file size (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2MB");
        return;
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Hanya file gambar (JPEG, PNG, GIF) yang diperbolehkan");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profilePicture: {
          file: file,
          preview: previewUrl,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for submission
      const submitData = {...formData};
      if (submitData.profilePicture?.file) {
        submitData.profilePicture = submitData.profilePicture.file;
      }

      // Call update profile API
      const response = await updateUserProfile(submitData);

      // Show success message
      toast.success("Profil berhasil diperbarui");

      // Navigate back to profile page
      navigate("/profile");
    } catch (err) {
      console.error("Profile update error:", err);

      // Show error message
      toast.error(err.message || "Gagal memperbarui profil");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.profilePictureContainer}>
          <img
            src={
              formData.profilePicture?.preview ||
              formData.profilePicture ||
              "https://via.placeholder.com/150"
            }
            alt="Profile Picture"
            style={styles.profilePicture}
          />

          <label htmlFor="profilePicture" style={styles.uploadButton}>
            <span style={styles.uploadIcon}>+</span>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
          </label>
        </div>

        <div style={styles.formContent}>
          <h1 style={styles.formTitle}>Edit Profile</h1>

          <div style={styles.formGroup}>
            <label htmlFor="nama_depan" style={styles.label}>
              Nama Depan
            </label>
            <input
              type="text"
              id="nama_depan"
              name="nama_depan"
              value={formData.nama_depan}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="nama_belakang" style={styles.label}>
              Nama Belakang
            </label>
            <input
              type="text"
              id="nama_belakang"
              name="nama_belakang"
              value={formData.nama_belakang}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="no_telp" style={styles.label}>
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="no_telp"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="tgl_lahir" style={styles.label}>
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tgl_lahir"
              name="tgl_lahir"
              value={formData.tgl_lahir}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="jenis_kelamin" style={styles.label}>
              Jenis Kelamin
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div style={styles.buttonContainer}>
            <Link to="/profile" style={styles.cancelButton}>
              Batal
            </Link>
            <button type="submit" style={styles.saveButton}>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEditProfile;
