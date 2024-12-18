import React, { useState, useEffect } from "react";
import { getRiwayatPembelian } from "../../api/apiRiwayat"; // Import API function

const RiwayatPage = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data riwayat pembelian dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading ke true
        const data = await getRiwayatPembelian(); // Panggil fungsi API
        setPurchaseHistory(data); // Set state dengan data dari API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading ke false
      }
    };

    fetchData();
  }, []);

  // Inline CSS untuk styling
  const styles = {
    container: {
      margin: "20px",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    th: {
      backgroundColor: "#007bff",
      color: "white",
      textAlign: "center",
      padding: "10px",
    },
    td: {
      textAlign: "center",
      padding: "10px",
      border: "1px solid #ddd",
    },
    noData: {
      textAlign: "center",
      fontStyle: "italic",
    },
    error: {
      color: "red",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Riwayat Pembelian</h2>

      {error && <p style={styles.error}>{error}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID Pembelian</th>
            <th style={styles.th}>Judul Buku</th>
            <th style={styles.th}>Tanggal Pembelian</th>
            <th style={styles.th}>Harga</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ ...styles.td, ...styles.noData }}>
                Loading...
              </td>
            </tr>
          ) : purchaseHistory.length > 0 ? (
            purchaseHistory.map((purchase) => (
              <tr key={purchase.id}>
                <td style={styles.td}>{purchase.id}</td>
                <td style={styles.td}>{purchase.judul_buku}</td>
                <td style={styles.td}>{purchase.tanggal_beli}</td>
                <td style={styles.td}>
                  {purchase.harga ? `Rp ${purchase.harga}` : "Gratis"}
                </td>
                <td style={styles.td}>{purchase.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ ...styles.td, ...styles.noData }}>
                Tidak ada riwayat pembelian.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatPage;
