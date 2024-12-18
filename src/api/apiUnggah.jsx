import api from "./index";

// Get the token from session storage
const getToken = () => sessionStorage.getItem("token");

// Fetch all books
export const getAllBooks = async () => {
  try {
    const response = await api.get("/buku", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch books" };
  }
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/buku/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch book details" };
  }
};

// Create a new book
export const createBook = async (bookData) => {
  try {
    const formData = new FormData();

    // Append file fields
    if (bookData.cover_image) {
      formData.append("cover_imgpath", bookData.cover_image);
    }
    if (bookData.book_file) {
      formData.append("file_buku", bookData.book_file);
    }

    // Append other fields
    Object.keys(bookData).forEach((key) => {
      if (key !== "cover_image" && key !== "book_file") {
        formData.append(key, bookData[key]);
      }
    });

    const response = await api.post("/buku", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create book" };
  }
};

// Update an existing book
export const updateBook = async (id, bookData) => {
  try {
    let payload = bookData;
    let headers = {};

    // If there are files to upload, use FormData
    if (bookData.cover_image || bookData.book_file) {
      const formData = new FormData();
      if (bookData.cover_image) {
        formData.append("cover_imgpath", bookData.cover_image);
      }
      if (bookData.book_file) {
        formData.append("file_buku", bookData.book_file);
      }

      Object.keys(bookData).forEach((key) => {
        if (key !== "cover_image" && key !== "book_file") {
          formData.append(key, bookData[key]);
        }
      });

      payload = formData;
      headers = { "Content-Type": "multipart/form-data" };
    }

    const response = await api.put(`/buku/isbn/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update book" };
  }
};

// Delete a book
export const deleteBook = async (isbn) => {
  try {
    const response = await api.delete(`/buku/isbn/${isbn}`);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Buku tidak ditemukan");
    }
  } catch (error) {
    throw error; // Lemparkan error untuk ditangani di client
  }
};

// Add a book to bookmarks
export const addBookmark = async (bukuId) => {
  try {
    const response = await api.post(
      "/bookmarks",
      { buku_id: bukuId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add bookmark" };
  }
};

// Remove a book from bookmarks
export const removeBookmark = async (bookmarkId) => {
  try {
    const response = await api.delete(`/bookmarks/${bookmarkId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove bookmark" };
  }
};

// Get user's bookmarked books
export const getMyBookmarks = async () => {
  try {
    const response = await api.get("/bookmarks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch bookmarks" };
  }
};

// Fetch a book by ISBN
export const getBookByISBN = async (isbn) => {
  try {
    const response = await api.get(`/buku/isbn/${isbn}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch book by ISBN" };
  }
};
