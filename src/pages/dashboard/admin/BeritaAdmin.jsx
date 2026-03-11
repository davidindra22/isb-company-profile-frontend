import React, { useState, useEffect } from "react";
import api from "../../../../axios";
import Button from "../../../components/Button";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingButton from "../../../components/ui/LoadingButton";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";

export default function BeritaAdmin() {
  const [berita, setBerita] = useState([]);

  // menambah data
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);

  // pesan sukses dan gagal
  const [alert, setAlert] = useState(null);

  // foto
  const [newFoto, setNewFoto] = useState([]);

  // modal tambah
  const [showModal, setShowModal] = useState(false);

  // modal edit
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [deletedFotoIds, setDeletedFotoIds] = useState([]);
  const [originalBerita, setOriginalBerita] = useState(null);

  // modal Delete
  const [showModalDelete, setShowModalDelete] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/berita")
      .then((res) => setBerita(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedBerita) {
      setJudul(selectedBerita.judul_berita);
      setDeskripsi(selectedBerita.desc_berita);

      // Pastikan ini array
      setFoto(selectedBerita.fotos || []);
    }
  }, [selectedBerita]);

  const getBerita = async () => {
    try {
      const res = await api.get("/api/berita");
      setBerita(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBerita();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    // kirim banyak foto
    for (let i = 0; i < foto.length; i++) {
      formData.append("foto", foto[i]);
    }

    try {
      await api.post("/api/berita", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data);
      setAlert({ type: "success", message: "Berita berhasil ditambahkan!" });

      setTimeout(() => {
        setAlert(null);
      }, 3000);

      closeModal();
      getBerita();
    } catch (err) {
      console.log(err);
      setAlert({ type: "error", message: "Gagal menambahkan berita." });
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
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    newFoto.forEach((file) => {
      formData.append("foto", file);
    });

    try {
      // 1. Update data berita
      await api.put(`/api/berita/${selectedBerita.id_berita}`, formData);

      // 2. Hapus foto yang ditandai (jika ada)
      for (const id_foto of deletedFotoIds) {
        await api.delete(`/api/foto/${id_foto}`);
      }

      setAlert({ type: "success", message: "Berita berhasil diperbarui!" });

      setDeletedFotoIds([]); // reset daftar foto yang dihapus
      closeModalEdit();
      getBerita();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      console.log(err);
      setAlert({ type: "error", message: "Gagal memperbarui berita." });
      closeModalEdit();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoto = (id_foto) => {
    setSelectedBerita((prev) => {
      if (!prev) return prev;
      const updatedFotos = (prev.fotos || []).filter(
        (f) => f.id_foto != id_foto,
      );
      return { ...prev, fotos: updatedFotos };
    });

    setDeletedFotoIds((prev) => [...prev, id_foto]);
  };

  const handleAddNewPhotos = (e) => {
    const files = Array.from(e.target.files);
    setNewFoto([...newFoto, ...files]);
  };

  const handleDeleteNewPhotos = (index) => {
    const updated = [...newFoto];
    updated.splice(index, 1);
    setNewFoto(updated);
  };

  const handleDeleteBerita = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.delete(`/api/berita/${selectedBerita.id_berita}`);

      setAlert({ type: "success", message: "Berita berhasil dihapus!" });

      closeModalDelete();
      getBerita();

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (err) {
      console.log(err);

      setAlert({ type: "error", message: "Gagal menghapus berita." });

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

  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const openModal = () => {
    setJudul("");
    setDeskripsi("");
    setFoto(null);
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 200);
  };

  const openModalEdit = (berita) => {
    setOriginalBerita(berita); // simpan versi asli sebelum edit
    setSelectedBerita({ ...berita }); // buat salinan agar state independen
    setDeletedFotoIds([]); // kosongkan daftar penghapusan
    handleDeleteNewPhotos(null);
    setShowModalEdit(true);
    setTimeout(() => setEditVisible(true), 10);
  };

  const closeModalEdit = () => {
    // kembalikan data semula
    if (originalBerita) {
      setSelectedBerita(originalBerita);
    }
    setDeletedFotoIds([]); // buang daftar penghapusan

    setEditVisible(false);
    setTimeout(() => setShowModalEdit(false), 200);
  };

  const openModalDelete = (berita) => {
    setSelectedBerita(berita);
    setShowModalDelete(true);
    setTimeout(() => setDeleteVisible(true), 10);
  };

  const closeModalDelete = () => {
    setDeleteVisible(false);
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
      {/* pesan */}
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
          <h6>Berita</h6>
          <Button onClick={openModal}>Tambah Berita</Button>
        </div>
        <div className="custShadow rounded-3xl p-5 overflow-x-auto">
          <table className="table-auto border-separate border-spacing-y-6 border-spacing-x-3 w-full ">
            <thead>
              <tr className="*:text-nowrap">
                <th className="text-left">No</th>
                <th>Judul Berita</th>
                <th>Deskripsi Berita</th>
                <th>Foto</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {berita.length > 0 ? (
                berita.map((berita, idx) => (
                  <tr key={idx} className="text-nowrap text-gray-600">
                    <td>{idx + 1}</td>
                    <td>{berita.judul_berita}</td>
                    <td className="text-wrap">
                      {truncateText(berita.desc_berita)}
                    </td>
                    <td className="grid md:grid-cols-3 gap-1 justify-items-center ">
                      {berita.fotos.map((img, i) => (
                        <img
                          key={i}
                          src={`${import.meta.env.VITE_API_URL}/uploads/${img.foto}`}
                          alt=""
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </td>
                    <td className="relative">
                      <div className="inline-block text-left">
                        {/* Tombol Trigger */}
                        <button
                          onClick={() => toogleDropdown(berita.id_berita)}
                          className="dropdown-trigger p-2 rounded-full hover:bg-gray-200"
                        >
                          <BsThreeDotsVertical size={18} />
                          <span className="sr-only">Options</span>
                        </button>

                        {/* Dropdown Menu */}
                        {open === berita.id_berita && (
                          <ul className="dropdown-menu absolute right-0 mt-2 w-32 bg-white rounded-lg custShadow z-10">
                            <li>
                              <button
                                onClick={() => {
                                  openModalEdit(berita);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            </li>

                            <li>
                              <button
                                onClick={() => {
                                  openModalDelete(berita);
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
              <h2 className="text-lg font-bold mb-4">Tambah Berita</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block mb-1">Judul Berita</label>
                  <input
                    type="text"
                    className="borderinput"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
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
                    onChange={(e) => setFoto(e.target.files)}
                    multiple
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
                    Sumbit
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal edit */}
        {showModalEdit && selectedBerita && (
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
              <h2 className="text-lg font-bold mb-4">Edit Berita</h2>
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label className="block mb-1">Judul Berita</label>
                  <input
                    type="text"
                    className="borderinput"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Deskripsi</label>
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
                    {selectedBerita.fotos?.length > 0 ? (
                      selectedBerita.fotos.map((img, idx) => (
                        <div key={idx} className="w-24 h-24 relative">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${img.foto}`}
                            alt="Foto Berita"
                            className="w-24 h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-1 left-1 bg-red-500 hover:bg-red-800 text-white text-xs p-0.5 rounded"
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
                  multiple
                  onChange={handleAddNewPhotos}
                  className="border-1 border-gray-300 rounded-md p-2 mt-2"
                />

                <div className="flex gap-4 mt-2">
                  {newFoto.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        width="120"
                        className="rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteNewPhotos(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
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
        {showModalDelete && selectedBerita && (
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
                  onClick={handleDeleteBerita}
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
