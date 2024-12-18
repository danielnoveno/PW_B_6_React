import axios from "axios";

const API_URL = "http://localhost:8000/api/riwayat";

export const getRiwayatPembelian = async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching riwayat pembelian:", error);
    throw new Error("Gagal memuat data riwayat pembelian.");
  }
};
