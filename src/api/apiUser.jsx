import api from './index';
import { getCurrentUser, getCurrentAdmin  } from './apiAuth';

export const getAdminProfile = async () => {
  try {
    // Ambil data admin dari localStorage
    const currentAdmin = getCurrentAdmin();

    // Jika tidak ada admin yang tersimpan, lempar error
    if (!currentAdmin || !currentAdmin.id) {
      throw new Error("No admin ID found");
    }

    // Panggil API menggunakan ID admin yang diambil dari localStorage
    const response = await api.get(`/admin/${currentAdmin.id}`);
    return response.data;
  } catch (error) {
    // Tangani error dan kembalikan pesan error
    throw error.response?.data || { message: "Failed to fetch admin profile" };
  }
};

// User Profile Management
export const getUserProfile = async () => {
  try {
    // Get the current user from localStorage
    const currentUser = getCurrentUser();
    
    // If no user is found, throw an error
    if (!currentUser || !currentUser.id) {
      throw new Error('No user ID found');
    }

    // Fetch the user profile using the ID from the stored user
    const response = await api.get(`/user/${currentUser.id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile' };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    // Get the current user from localStorage
    const currentUser = getCurrentUser();
    
    // If no user is found, throw an error
    if (!currentUser || !currentUser.id) {
      throw new Error('No user ID found');
    }

    // Create FormData for multipart/form-data
    const formData = new FormData();
    
    // Append text fields
    Object.keys(userData).forEach(key => {
      // Handle profile picture separately
      if (key !== 'profilePicture' && userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    });

    // Handle profile picture upload
    if (userData.profilePicture) {
      // If it's a base64 string, convert to file
      if (typeof userData.profilePicture === 'string' && userData.profilePicture.startsWith('data:image')) {
        // Convert base64 to blob
        const response = await fetch(userData.profilePicture);
        const blob = await response.blob();
        formData.append('profilePic', blob, 'profile-pic.jpg');
      } else if (userData.profilePicture instanceof File) {
        // If it's already a File object
        formData.append('profilePic', userData.profilePicture);
      }
    }

    // Add method field for Laravel to handle PUT request in multipart form
    formData.append('_method', 'PUT');

    // Update the profile using the ID from the stored user
    const response = await api.post(`/user/${currentUser.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user profile' };
  }
};

// Transaction History
export const getMyTransactions = async () => {
  try {
    const response = await api.get('/transaksi');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch transactions' };
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transaksi', transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create transaction' };
  }
};

// DigiLibrary Management (Bookmarks)
export const getMyDigiLibrary = async () => {
  try {
    const response = await api.get('/bookmarks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch digital library' };
  }
};

// Reading History
export const getReadingHistory = async () => {
  try {
    const response = await api.get('/log-aktivitas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch reading history' };
  }
};

// Downloads (assuming this might be related to transactions or bookmarks)
export const getMyDownloads = async () => {
  try {
    const response = await api.get('/transaksi');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch downloads' };
  }
};

// Recommendations
export const getMyRecommendations = async () => {
  try {
    const response = await api.get('/rekomendasi');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch recommendations' };
  }
  
};