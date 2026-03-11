import React, { useEffect, useState, useRef } from "react";
import api from "../../../../axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "../../../components/Button";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import LoadingButton from "../../../components/ui/LoadingButton";

export default function LayananAdmin() {
  const [layanan, setLayanan] = useState([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState([]);

  const [newFoto, setNewFoto] = useState(null);
  const fileInputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  // modal edit foto
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [deletedFotoIds, setDeletedFotoIds] = useState([]);
  const [originalLayanan, setOriginalLayanan] = useState(null);

  // loading
  const [loading, setLoading] = useState(false);

  // pesan sukses dan gagal
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api
      .get("/api/layanan")
      .then((res) => setLayanan(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedLayanan) {
      setNama(selectedLayanan.nama_layanan);
      setDeskripsi(selectedLayanan.desc_layanan);
      setFoto(selectedLayanan.fotos);
    }
  }, [selectedLayanan]);

  const getLayanan = async () => {
    try {
      const res = await api.get("/api/layanan");
      setLayanan(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLayanan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("foto", foto);

    try {
      await api.post("/api/layanan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAlert({
        type: "success",
        message: "Layanan berhasil ditambahkan!",
      });

      closeModal();
      getLayanan();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      console.log(err);

      setAlert({
        type: "error",
        message: "Gagal menambahkan layanan.",
      });

      closeModal();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);

    if (newFoto) {
      formData.append("foto", newFoto);
    }

    try {
      // 1. Update data layanan
      await api.put(`/api/layanan/${selectedLayanan.id_layanan}`, formData);

      // 2. Hapus foto yang ditandai (jika ada)
      for (const id_foto of deletedFotoIds) {
        await api.delete(`/api/foto-layanan/${id_foto}`);
      }

      setAlert({
        type: "success",
        message: "Layanan berhasil diperbarui!",
      });

      setDeletedFotoIds([]); // reset daftar foto yang dihapus
      closeModalEdit();
      getLayanan();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      console.log(err);

      setAlert({
        type: "error",
        message: "Gagal memperbarui layanan.",
      });

      closeModalEdit();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoto = (id_foto) => {
    setSelectedLayanan((prev) => {
      if (!prev) return prev;
      const updatedFotos = (prev.fotos || []).filter(
        (f) => f.id_foto != id_foto,
      );
      return { ...prev, fotos: updatedFotos };
    });

    setDeletedFotoIds((prev) => [...prev, id_foto]);
  };

  const handleAddNewPhotos = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewFoto(file);
  };

  const handleDeleteNewPhotos = () => {
    setNewFoto(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteLayanan = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.delete(`/api/layanan/${selectedLayanan.id_layanan}`);

      setAlert({
        type: "success",
        message: "Layanan berhasil dihapus!",
      });

      setSelectedLayanan(null);
      closeModalDelete();
      getLayanan();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      console.log(err);

      setAlert({
        type: "error",
        message: "Gagal menghapus layanan.",
      });

      closeModalDelete();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(null);
  const toogleDropdown = (id) => {
    setOpen(open === id ? null : id);
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".dropdown-toggle")
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Untuk animasi transisi
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const openModal = () => {
    setNama("");
    setDeskripsi("");
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 200);
  };

  const openModalEdit = (layanan) => {
    setOriginalLayanan({ ...layanan }); // simpan data semula
    setSelectedLayanan({ ...layanan });

    setNewFoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowModalEdit(true);
    setTimeout(() => setEditVisible(true), 10);
  };
  const closeModalEdit = () => {
    // kembalikan data semula
    if (originalLayanan) {
      setSelectedLayanan(originalLayanan);
    }
    setDeletedFotoIds([]);

    setNewFoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setEditVisible(false);
    setTimeout(() => setShowModalEdit(false), 200);
  };

  const openModalDelete = (layanan) => {
    setSelectedLayanan(layanan);
    setShowModalDelete(true);
    setTimeout(() => setDeleteVisible(true), 10);
  };
  const closeModalDelete = () => {
    setDeleteVisible(false);
    setSelectedLayanan(null);
    setTimeout(() => setShowModalDelete(false), 200);
  };

  // Tutup modal jika klik di luar konten modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeModalEdit();
      closeModalDelete();
    }
  };

  function truncateText(text, wordLimit = 10) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  }
  return (
    <>
      {/* pesan sukses */}
      {alert && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-sm
        ${
          alert.type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
        >
          {alert.message}
        </div>
      )}

      {/* loading */}
      <LoadingOverlay loading={loading} />

      <div className="w-auto p-5 rounded-2xl bg-white custShadow">
        <div className="flex justify-between mb-5">
          <h6>layanan</h6>
          <Button onClick={openModal}>Tambah layanan</Button>
        </div>
        <div className="custShadow rounded-3xl p-5 overflow-x-auto">
          <table className="table-auto border-separate border-spacing-y-6 border-spacing-x-3 w-full ">
            <thead>
              <tr className="*:text-nowrap">
                <th className="text-left">No</th>
                <th>Nama layanan</th>
                <th>Deskripsi layanan</th>
                <th>Foto</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {layanan.length > 0 ? (
                layanan.map((layanan, idx) => (
                  <tr
                    key={layanan.id_layanan}
                    className="text-nowrap text-gray-600"
                  >
                    <td>{idx + 1}</td>
                    <td>{layanan.nama_layanan}</td>
                    <td className="text-wrap">
                      {truncateText(layanan.desc_layanan)}
                    </td>
                    <td>
                      {layanan.fotos ? (
                        layanan.fotos.map((foto, idx) => (
                          <img
                            key={idx}
                            src={`${import.meta.env.VITE_API_URL}/uploads/${foto.foto}`}
                            alt="Foto Layanan"
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))
                      ) : (
                        <p className="text-gray-500">Tidak ada foto</p>
                      )}
                    </td>
                    <td className="relative">
                      <div className="inline-block text-left">
                        {/* Tombol Trigger */}
                        <button
                          onClick={() => toogleDropdown(layanan.id_layanan)}
                          className="dropdown-trigger p-2 rounded-full hover:bg-gray-200"
                        >
                          <BsThreeDotsVertical size={18} />
                          <span className="sr-only">Options</span>
                        </button>

                        {/* Dropdown Menu */}
                        {open === layanan.id_layanan && (
                          <ul className="dropdown-menu absolute right-0 mt-2 w-32 bg-white rounded-lg custShadow z-10">
                            <li>
                              <button
                                onClick={() => {
                                  openModalEdit(layanan);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            </li>

                            <li>
                              <button
                                onClick={() => {
                                  openModalDelete(layanan);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                              >
                                Hapus
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal tambah */}
        {showModal && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-200 ${
              modalVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
          >
            <div
              className={`bg-white p-6 rounded-xl shadow-lg min-w-[300px] transform transition-all duration-200 ${
                modalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <h2 className="text-lg font-bold mb-4">Tambah Layanan</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block mb-1">Nama Layanan</label>
                  <input
                    type="text"
                    className="borderinput"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Deskripsi</label>
                  <textarea
                    type="text"
                    className="borderinput"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Foto</label>
                  <input
                    type="file"
                    className="borderinput"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files[0])}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 rounded-xl border bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
                  >
                    Batal
                  </button>
                  <LoadingButton type="submit" loading={loading}>
                    Simpan
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal edit */}
        {showModalEdit && selectedLayanan && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-200 ${
              editVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
          >
            <div
              className={`bg-white p-6 rounded-xl shadow-lg min-w-[300px] transform transition-all duration-200 ${
                editVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()} // biar klik dalam modal tidak nutup
            >
              <h2 className="text-lg font-bold mb-4">Edit Layanan</h2>
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label className="block mb-1">Nama Layanan</label>
                  <input
                    type="text"
                    className="borderinput"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Deskirpsi</label>
                  <textarea
                    className="borderinput"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Foto</label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedLayanan.fotos?.length > 0 ? (
                      selectedLayanan.fotos.map((img, idx) => (
                        <div key={idx} className="w-24 h-24 relative">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${img.foto}`}
                            alt="Foto Berita"
                            className="w-24 h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                            onClick={() => handleDeleteFoto(img.id_foto)}
                          >
                            Hapus
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Tidak ada foto</p>
                    )}
                  </div>
                </div>
                {/* FOTO BARU */}
                <h3 className="mt-4">Tambah Foto Baru</h3>
                <input
                  type="file"
                  onChange={handleAddNewPhotos}
                  ref={fileInputRef}
                  className="border-1 border-gray-300 rounded-md p-2 mt-2"
                />

                <div className="flex gap-4 mt-2">
                  {newFoto && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(newFoto)}
                        alt=""
                        width="120"
                        className="rounded"
                      />
                      <button
                        type="button"
                        onClick={handleDeleteNewPhotos}
                        className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      closeModalEdit();
                    }}
                    type="button"
                    className="px-4 py-2 rounded-xl border bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-(--color-secondary) text-white px-4 py-2 rounded-xl hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Delete */}
        {showModalDelete && selectedLayanan && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-200 ${
              deleteVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
          >
            <div
              className={`bg-white p-6 rounded-xl shadow-lg min-w-[300px] transform transition-all duration-200 ${
                deleteVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()} // biar klik dalam modal tidak nutup
            >
              <h2 className="text-lg font-bold mb-4">Hapus Berita</h2>
              <p>Apakah Anda yakin ingin menghapus berita ini?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={closeModalDelete}
                  type="button"
                  className="px-4 py-2 rounded-xl border bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="bg-(--color-secondary) text-white px-4 py-2 rounded-xl hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
                  onClick={handleDeleteLayanan}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
