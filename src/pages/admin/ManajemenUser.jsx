import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import axios from "axios";
import yellowPencil from "/src/assets/icons/pencil-edit-yellow.webp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tempUser, setTempUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch data user dari API saat komponen dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://gym5api-production.up.railway.app//api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedUsers = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers); // Simpan data sebagai array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token"); // Token autentikasi
      await axios.put(
        `http://localhost:8000/api/admin/user/${updatedUser.id}`, // Endpoint Update
        updatedUser, // Data yang dikirim
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setTempUser({ ...user });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser(tempUser); // Kirim data ke API

      // Update state local
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? tempUser : user))
      );

      setShowModal(false); // Tutup modal
      toast.success("Data pengguna berhasil diperbarui!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Gagal memperbarui data pengguna!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const exportToExcel = () => {
    const selectedData = users.filter((user) =>
      selectedUsers.includes(user.id)
    );
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Users");
    XLSX.writeFile(workbook, "selected_users.xlsx");
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <Container fluid className="px-0">
      <div style={{ marginTop: "20px" }}>
        <div className="border rounded p-2" style={{ backgroundColor: "#fff" }}>
          <Table
            bordered
            hover
            responsive
            style={{ borderColor: "#ffffff", backgroundColor: "#f8f9fa" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setSelectedUsers(
                        e.target.checked ? users.map((user) => user.id) : []
                      );
                    }}
                    checked={selectedUsers.length === users.length}
                  />
                </th>
                <th style={{ textAlign: "center" }}>ID PENGGUNA</th>
                <th style={{ textAlign: "center" }}>NAMA USER</th>
                <th style={{ textAlign: "center" }}>EMAIL</th>
                <th style={{ textAlign: "center" }}>TERPINJAM</th>
                <th style={{ textAlign: "center" }}>TERUNDUH</th>
                <th style={{ textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                  <td style={{ textAlign: "center", color: "#007bff" }}>
                    {user.id}
                  </td>
                  <td style={{ textAlign: "center", color: "#007bff" }}>
                    {`${user.nama_depan || ""} ${user.nama_belakang || ""}`}
                  </td>
                  <td style={{ textAlign: "center", color: "#007bff" }}>
                    {user.email}
                  </td>
                  <td style={{ textAlign: "center", color: "#007bff" }}>
                    {user.borrowed || 0}
                  </td>
                  <td style={{ textAlign: "center", color: "#007bff" }}>
                    {user.downloaded || 0}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={yellowPencil}
                      width="30"
                      height="30"
                      alt="Edit"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShowModal(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, users.length)} of{" "}
              {users.length}
            </span>
            <div>
              <Button variant="success" onClick={exportToExcel}>
                Export to Excel
              </Button>
            </div>
            <div>
              <Button
                variant="light"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </Button>
              <span style={{ margin: "0 10px" }}>{currentPage}</span>
              <Button
                variant="light"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pengguna #{currentUser.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Input Nama Depan */}
            <Form.Group>
              <Form.Label>Nama Depan</Form.Label>
              <Form.Control
                type="text"
                name="nama_depan"
                value={tempUser.nama_depan || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Input Nama Belakang */}
            <Form.Group>
              <Form.Label>Nama Belakang</Form.Label>
              <Form.Control
                type="text"
                name="nama_belakang"
                value={tempUser.nama_belakang || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Input Email */}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={tempUser.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageUser;
