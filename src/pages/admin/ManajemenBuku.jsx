import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookByISBN, updateBook, deleteBook } from "../../api/apiUnggah";
import "./unggah.css";

const ManageBuku = () => {
  const [coverFile, setCoverFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Untuk ISBN
  const [bookData, setBookData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const validJenisBuku = [
    "Scifi",
    "Fantasy",
    "Drama",
    "Politik",
    "Sejarah",
    "Kamus",
    "Jurnal ilmiah",
    "Resep",
  ];

  // Fetch data buku berdasarkan ISBN
  const fetchBookData = async (isbn) => {
    try {
      setIsPending(true);
      const book = await getBookByISBN(isbn);
      if (book) {
        setBookData(book);
        toast.success("Data buku berhasil dimuat!");
        setSearchQuery(isbn);
      }
    } catch (error) {
      toast.error("Gagal memuat data buku.");
    } finally {
      setIsPending(false);
    }
  };

  // Fungsi untuk mencari buku
  const handleSearch = () => {
    if (!searchQuery) {
      toast.error("Masukkan ISBN terlebih dahulu!");
      return;
    }
    fetchBookData(searchQuery);
    localStorage.setItem("lastSearchedISBN", searchQuery);
  };

  // Fungsi untuk mengedit buku
  const handleEdit = (e) => {
    e.preventDefault();
    if (!bookData) return;

    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (coverFile) formData.append("cover_image", coverFile);
    if (bookFile) formData.append("book_file", bookFile);

    // Kirimkan data buku yang sudah diedit
    submitBookData(formData);
  };

  // Fungsi untuk mengirim data buku yang sudah diedit
  const submitBookData = async (formData) => {
    try {
      setIsPending(true);
      const response = await updateBook(bookData.ISBN, formData);
      if (response.status === 200) {
        toast.success("Buku berhasil diperbarui!");
      } else {
        throw new Error("Gagal memperbarui buku");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Terjadi kesalahan saat memperbarui buku.");
    } finally {
      setIsPending(false);
    }
  };

  // Fungsi untuk menghapus buku
  const handleDelete = async () => {
    if (!bookData) return;

    try {
      setIsPending(true);
      const response = await deleteBook(bookData.ISBN);
      if (response.status === 200) {
        toast.success("Buku berhasil dihapus!");
        setBookData(null);
        setSearchQuery(""); // Clear search query after deletion
      } else {
        throw new Error("Gagal menghapus buku");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.message || "Gagal menghapus buku.");
    } finally {
      setIsPending(false);
    }
  };

  // Fungsi untuk mengubah input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            placeholder="Masukkan ISBN"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={isPending}
          >
            {isPending ? "Mencari..." : "Cari Buku"}
          </button>
        </div>
      </div>

      {bookData && (
        <form onSubmit={handleEdit}>
          <div className="card p-4">
            <h5 className="mb-4 text-primary">Update Buku</h5>

            {/* Editable Inputs */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Cover Buku</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                  accept="image/*"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">File Buku</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setBookFile(e.target.files[0])}
                  accept=".pdf,.epub,.mobi,.azw,.doc,.rtf"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Judul</label>
                <input
                  type="text"
                  className="form-control"
                  name="judul"
                  value={bookData.judul}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul buku"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Penulis</label>
                <input
                  type="text"
                  className="form-control"
                  name="penulis"
                  value={bookData.penulis}
                  onChange={handleInputChange}
                  placeholder="Masukkan penulis buku"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Penerbit</label>
                <input
                  type="text"
                  className="form-control"
                  name="penerbit"
                  value={bookData.penerbit}
                  onChange={handleInputChange}
                  placeholder="Masukkan penerbit buku"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={bookData.isbn}
                  onChange={handleInputChange}
                  placeholder="Masukkan ISBN buku"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Tanggal Terbit</label>
                <input
                  type="date"
                  className="form-control"
                  name="tanggalTerbit"
                  value={bookData.tanggalTerbit}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Jenis Buku</label>
                <select
                  className="form-control"
                  name="jenisBuku"
                  value={bookData.jenisBuku}
                  onChange={handleInputChange}
                >
                  <option>Pilih jenis buku</option>
                  {validJenisBuku.map((jenis, index) => (
                    <option key={index} value={jenis}>
                      {jenis}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Bahasa</label>
                <input
                  type="text"
                  className="form-control"
                  name="bahasa"
                  value={bookData.bahasa}
                  onChange={handleInputChange}
                  placeholder="Bahasa buku"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Halaman</label>
                <input
                  type="number"
                  className="form-control"
                  name="halaman"
                  value={bookData.halaman}
                  onChange={handleInputChange}
                  placeholder="Jumlah halaman buku"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Sinopsis</label>
                <textarea
                  className="form-control"
                  name="sinopsis"
                  value={bookData.sinopsis}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? "Memperbarui..." : "Perbarui Buku"}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Menghapus..." : "Hapus Buku"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageBuku;
