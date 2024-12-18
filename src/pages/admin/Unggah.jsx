import React, { useState } from "react";
import "./unggah.css";
import { toast } from "react-toastify";
import { createBook } from "../../api/apiUnggah";

const Unggah = () => {
  const [coverFile, setCoverFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [isbn, setIsbn] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [jenisBuku, setJenisBuku] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [halaman, setHalaman] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [hargaDownload, setHargaDownload] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverFile(file);
    }
  };

  const handleBookUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBookFile(file);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Jenis Buku:", jenisBuku);

    if (!validJenisBuku.includes(jenisBuku)) {
      toast.warning("Jenis Buku tidak valid!");
      return;
    }

    // Validation: Check for required fields
    if (
      !judul ||
      !penulis ||
      !penerbit ||
      !isbn ||
      !tanggalTerbit ||
      !jenisBuku ||
      !bahasa ||
      !halaman ||
      !sinopsis ||
      !deskripsi ||
      !hargaDownload ||
      !hargaSewa ||
      !coverFile ||
      !bookFile
    ) {
      toast.warning("Semua field wajib diisi!");
      return;
    }

    const bookData = {
      judul,
      penulis,
      penerbit,
      ISBN: isbn,
      tgl_terbit: tanggalTerbit,
      jenis_buku: jenisBuku, // Pastikan jenis_buku sesuai dengan nilai yang diterima backend
      bahasa,
      halaman,
      sinopsis,
      deskripsi,
      harga_download: hargaDownload,
      harga_sewa: hargaSewa,
      cover_image: coverFile,
      book_file: bookFile,
    };

    try {
      const response = await createBook(bookData);
      toast.success("Buku berhasil ditambahkan!");
      console.log("Response:", response);
    } catch (error) {
      console.error("Gagal menyimpan buku:", error.message || error);
      toast.warning("Terjadi kesalahan saat menyimpan buku.");
    }
  };

  return (
    <div
      className="justify-content-center py-1 px-1"
      style={{ marginLeft: "-10px", marginRight: "-10px" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Informasi Umum Buku */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Cover Buku</label>
                <div className="rounded p-3 text-center">
                  <input
                    type="file"
                    id="cover"
                    className="d-none"
                    onChange={handleCoverUpload}
                    accept="image/*"
                  />
                  <label htmlFor="cover" className="file-upload-box">
                    <div className="file-upload-icon">☁️</div>
                    <p>
                      Drag & drop files or{" "}
                      <span className="text-primary">Browse</span>
                    </p>
                    <p className="supported-formats">
                      Supported formats: JPEG, PNG, GIF, WEBP
                    </p>
                    {coverFile && <p className="file-name">{coverFile.name}</p>}
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">File Buku</label>
                <div className="rounded p-3 text-center">
                  <input
                    type="file"
                    id="book"
                    className="d-none"
                    onChange={handleBookUpload}
                    accept=".pdf,.epub,.mobi,.azw,.doc,.rtf"
                  />
                  <label htmlFor="book" className="file-upload-box">
                    <div className="file-upload-icon">📄</div>
                    <p>
                      Drag & drop files or{" "}
                      <span className="text-primary">Browse</span>
                    </p>
                    <p className="supported-formats">
                      Supported formats: PDF, EPUB, MOBI, DOC, RTF
                    </p>
                    {bookFile && <p className="file-name">{bookFile.name}</p>}
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">Judul</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukkan judul buku"
                ></textarea>

                <label className="form-label">Penulis</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                  placeholder="Masukkan penulis buku"
                ></textarea>

                <label className="form-label">Penerbit</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={penerbit}
                  onChange={(e) => setPenerbit(e.target.value)}
                  placeholder="Masukkan penerbit buku"
                ></textarea>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Masukkan ISBN buku"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tanggal Terbit</label>
                  <input
                    type="date"
                    className="form-control"
                    value={tanggalTerbit}
                    onChange={(e) => setTanggalTerbit(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Jenis Buku</label>
                  <select
                    className="form-select"
                    value={jenisBuku}
                    onChange={(e) => setJenisBuku(e.target.value)}
                  >
                    <option>Pilih jenis buku</option>
                    {validJenisBuku.map((jenis, index) => (
                      <option key={index} value={jenis}>
                        {jenis}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Bahasa</label>
                  <select
                    className="form-select"
                    value={bahasa}
                    onChange={(e) => setBahasa(e.target.value)}
                  >
                    <option>Pilih bahasa buku</option>
                    <option value="id">Indonesia</option>
                    <option value="en">Inggris</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Halaman</label>
                  <input
                    type="number"
                    className="form-control"
                    value={halaman}
                    onChange={(e) => setHalaman(e.target.value)}
                    placeholder="Masukkan jumlah halaman buku"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Sinopsis</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={sinopsis}
                  onChange={(e) => setSinopsis(e.target.value)}
                  placeholder="Masukkan sinopsis buku"
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label">Deskripsi</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan deskripsi buku"
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Harga Download</label>
                <input
                  type="number"
                  className="form-control"
                  value={hargaDownload}
                  onChange={(e) => setHargaDownload(e.target.value)}
                  placeholder="Harga download buku"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Harga Baca / Sewa Mingguan</label>
                <input
                  type="number"
                  className="form-control"
                  value={hargaSewa}
                  onChange={(e) => setHargaSewa(e.target.value)}
                  placeholder="Harga sewa buku"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Simpan Buku
        </button>
      </form>
    </div>
  );
};

export default Unggah;
