import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Admin',
    email: 'admin@digilibrary.com',
    whatsapp: '+6281234567891',
    profilePicture: 'https://cdn-icons-png.flaticon.com/512/1149/1149386.png'
  });

  const styles = {
    pageContainer: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    formCard: {
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#D6E4FC',
      position: 'relative',
      marginTop: '60px',
    },
    profilePictureContainer: {
      position: 'relative',
      width: '100px',
      marginLeft: '50px',
      marginTop: '-50px',
    },
    profilePicture: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '4px solid white',
      objectFit: 'cover',
    },
    uploadButton: {
      position: 'absolute',
      right: '-10px',
      bottom: '0',
      backgroundColor: '#3C64EF',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '2px solid white',
    },
    uploadIcon: {
      color: 'white',
      fontSize: '18px',
    },
    formContent: {
      padding: '20px',
      color: '#3C64EF',
    },
    formTitle: {
      color: '#3C64EF',
      marginBottom: '24px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#3C64EF',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #D1D5DB',
      fontSize: '16px',
      color: '#374151',
      backgroundColor: 'white',
      boxSizing: 'border-box',
    },
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      marginTop: '24px',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #3C64EF',
      backgroundColor: 'white',
      color: '#3C64EF',
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#3C64EF',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
    },
    fileInput: {
      display: 'none',
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div style={styles.pageContainer}>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.profilePictureContainer}>
          <img
            src={formData.profilePicture}
            alt="Profile"
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
            <label htmlFor="name" style={styles.label}>Nama</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="whatsapp" style={styles.label}>WhatsApp</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonContainer}>
            <Link to="/admin/profile" style={styles.cancelButton}>
              Cancel
            </Link>
            <button type="submit" style={styles.saveButton}>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;