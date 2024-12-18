import api from "./index";

export const signUp = async (data) => {
  try {
    const response = await api.post("/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during registration",
      }
    );
  }
};

export const signIn = async (data) => {
  try {
    const response = await api.post("/login", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

export const signOut = async () => {
  try {
    // First try to call the logout endpoint
    await api.post('/logout');
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Always clear storage, even if API call fails
    // Clear specific items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    
    // Clear token from API instance if you're storing it there
    if (api.defaults.headers) {
      delete api.defaults.headers.common['Authorization'];
    }
    
    // Optional: Clear entire localStorage if you want to be thorough
    localStorage.clear();
    
    // Optional: Clear any session storage if you're using it
    sessionStorage.clear();
  }
};

export const adminSignIn = async (data) => {
  try {
    const response = await api.post("/admin/login", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during admin login",
      }
    );
  }
};

export const adminSignUp = async (data) => {
  try {
    const response = await api.post("/admin/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during admin registration",
      }
    );
  }
};

// Utility functions
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const getCurrentAdmin = () => {
  const adminStr = localStorage.getItem("admin");
  return adminStr ? JSON.parse(adminStr) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
