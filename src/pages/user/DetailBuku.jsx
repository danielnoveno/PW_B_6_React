import React from 'react';
import { Link } from 'react-router-dom';

// Import icons
import dashboardIcon from '../../assets/icons/dashboard-icon.webp';
import searchIcon from '../../assets/icons/search-icon.webp';
import notificationIcon from '../../assets/icons/notification-icon.webp';
import ratingIcon from '../../assets/icons/rating.webp';
import bookCover from '../../assets/images/cover-buku/home-sweet-loan.webp';

const DetailBuku = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const styles = {
    pageContainer: {
      padding: '24px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 60px)', // Adjust based on your header height
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    contentWrapper: {
      maxWidth: '1129px',
      margin: '0 auto',
      padding: '20px 0',
    },
    bookDetails: {
      display: 'flex',
      gap: '24px',
      marginBottom: '48px',
      padding: '20px 0',
    },
    bookCover: {
      width: '295px',
      height: '437px',
      borderRadius: '18px',
      objectFit: 'cover',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    bookInfo: {
      flex: 1,
      maxWidth: '811px',
    },
    bookTitle: {
      fontSize: '40px',
      fontWeight: '700',
      lineHeight: '1.3',
      marginBottom: '16px',
      color: 'black',
      fontFamily: 'Lato',
    },
    author: {
      color: '#9A9A9A',
      fontSize: '16px',
      marginBottom: '24px',
      fontFamily: 'Lato',
    },
    synopsis: {
      textAlign: 'justify',
      fontSize: '16px',
      lineHeight: 1.6,
      marginBottom: '24px',
      color: 'black',
      fontFamily: 'Lato',
    },
    ratingInfoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '32px 0',
      gap: '24px',
    },
    ratingSection: {
      flex: '0 0 501px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    ratingOverview: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '24px',
    },
    ratingNumber: {
      fontSize: '64px',
      fontWeight: '700',
      color: '#333',
      lineHeight: '1.2',
      marginBottom: '8px',
    },
    totalRatings: {
      color: 'rgba(51, 51, 51, 0.63)',
      fontSize: '20px',
      textAlign: 'center',
      marginTop: '8px',
    },
    ratingBars: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    ratingBarItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    ratingBarContainer: {
      width: '323px',
      height: '10px',
      background: '#E5E6E6',
      borderRadius: '20px',
      overflow: 'hidden',
    },
    ratingBarFill: (width) => ({
      height: '100%',
      width: width,
      background: '#3C64EF',
      borderRadius: '20px',
      transition: 'width 0.3s ease',
    }),
    bookMetadata: {
      flex: '0 0 510px',
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #E0E0E0',
      padding: '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    metadataGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    metadataItem: {
      marginBottom: '8px',
    },
    metadataLabel: {
      color: '#8E8E8E',
      fontSize: '17px',
      marginBottom: '4px',
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    metadataValue: {
      color: 'black',
      fontSize: '17px',
      margin: 0,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    actionButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      margin: '40px 0 20px',
    },
    button: {
      width: '204px',
      height: '40px',
      padding: '12px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Lato',
      lineHeight: '16px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    downloadBtn: {
      background: '#FCE9C5',
      color: '#DF970C',
    },
    readBtn: {
      background: '#D1F4D0',
      color: '#1EB71B',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.bookDetails}>
          <img src={bookCover} alt="Book Cover" style={styles.bookCover} />
          <div style={styles.bookInfo}>
            <h1 style={styles.bookTitle}>Hidden Figures: The True Story of Four Black Women and the Space</h1>
            <p style={styles.author}>Margot Lee Shetterly</p>
            <div style={styles.synopsis}>
              <p>Hidden Figures berlatarkan di Amerika Serikat pada masa segregasi, saat diskriminasi ras dan gender masih kuat. Di tengah ketidakadilan tersebut, NASA mempekerjakan sekelompok matematikawan Afrika-Amerika yang bekerja di bawah tekanan sosial yang luar biasa.</p>
              <p>Dorothy Vaughan, Mary Jackson, Katherine Johnson, dan Christine Darden—dikenal sebagai "komputer berwarna"—menjadi kunci sukses beberapa misi luar angkasa terbesar Amerika, termasuk pengiriman manusia pertama ke orbit.</p>
            </div>
          </div>
        </div>

        <div style={styles.ratingInfoContainer}>
          <div style={styles.ratingSection}>
            <div style={styles.ratingOverview}>
              <div style={styles.ratingNumber}>4.5</div>
              <img src={ratingIcon} width="90" height="20" alt="Rating" />
              <div style={styles.totalRatings}>123</div>
            </div>
            <div style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} style={styles.ratingBarItem}>
                  <span>{rating}</span>
                  <div style={styles.ratingBarContainer}>
                    <div 
                      style={styles.ratingBarFill(
                        rating === 5 ? '80%' : 
                        rating === 4 ? '18%' : 
                        rating === 3 ? '9%' : 
                        rating === 2 ? '5%' : '10%'
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bookMetadata}>
            <div style={styles.metadataGrid}>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Penerbit</div>
                <div style={styles.metadataValue}>William Morrow and Company</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Tanggal terbit</div>
                <div style={styles.metadataValue}>26 Sept 2016</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>ISBN</div>
                <div style={styles.metadataValue}>9780062363602</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Terdownload</div>
                <div style={styles.metadataValue}>100 copy</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Jenis buku</div>
                <div style={styles.metadataValue}>Non-Fiksi</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Terbaca</div>
                <div style={styles.metadataValue}>1000 kali</div>
              </div>
              <div style={styles.metadataItem}>
                <div style={styles.metadataLabel}>Halaman</div>
                <div style={styles.metadataValue}>368 halaman</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.actionButtons}>
          <Link to="/bacabuku" style={{...styles.button, ...styles.downloadBtn}}>
            Download Rp 150.000
          </Link>
          <Link to="/bacabuku" style={{...styles.button, ...styles.readBtn}}>
            Download Rp 150.000
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailBuku;