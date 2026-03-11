import React, { useEffect, useState } from "react";
import api from "../../../../axios";

// component
import Button from "../../../components/Button";
import ModalEditClientLogo from "../../../components/admin/modal/clientLogo/ModalEditClientLogo";
import ModalDeleteClientLogo from "../../../components/admin/modal/clientLogo/ModalDeleteClientLogo";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalTambahClientLogo from "../../../components/admin/modal/clientLogo/ModalTambahClientLogo";

export default function ClientAdmin() {
  const [data, setData] = useState([]);
  const [tambahData, setTambahData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(null);

  // pesan sukses dan gagal
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    const res = await api.get("/api/foto-client");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toogleDropdown = (id) => {
    setOpen(open === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-wrapper")) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultTambah = (result) => {
    setAlert(result);

    if (result.type === "success") {
      fetchData();
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleResultEdit = (result) => {
    setAlert(result);

    if (result.type === "success") {
      fetchData();
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const hanldeResultDelete = (result) => {
    setAlert(result);

    if (result.type === "success") {
      fetchData();
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

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
      <div className="w-auto p-5 rounded-2xl bg-white custShadow">
        <div className="flex justify-between mb-5">
          <h6>Logo Client</h6>
          <Button
            onClick={() => {
              setTambahData(true);
            }}
          >
            Tambah Logo
          </Button>
        </div>
        <div className="custShadow rounded-3xl p-5 overflow-x-auto">
          <table className="table-auto border-separate border-spacing-y-6 border-spacing-x-3 w-full ">
            <thead>
              <tr className="*:text-nowrap">
                <th className="text-left w-2">No</th>
                <th>Nama</th>
                <th>Logo</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="text-nowrap text-gray-600 text-center"
                  >
                    <td>{idx + 1}</td>
                    <td>{item.nama_client}</td>
                    <td className="flex justify-center">
                      {item.foto ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${item.foto}`}
                          alt=""
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <p className="text-gray-500">Tidak ada foto</p>
                      )}
                    </td>
                    <td className="relative">
                      <div className="dropdown-wrapper inline-block text-left">
                        {/* Tombol Trigger */}
                        <button
                          onClick={() => toogleDropdown(item.id)}
                          className="p-2 rounded-full hover:bg-gray-200"
                        >
                          <BsThreeDotsVertical size={18} />
                          <span className="sr-only">Options</span>
                        </button>

                        {/* Dropdown Menu */}
                        {open === item.id && (
                          <ul className="absolute right-10 mt-2 w-32 bg-white rounded-lg custShadow z-10 font-semibold">
                            <li>
                              <button
                                onClick={() => {
                                  setEditData(item);
                                  setOpen(null);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            </li>

                            <li>
                              <button
                                onClick={() => {
                                  setDeleteId(item.id);
                                  setOpen(null);
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
        {tambahData && (
          <ModalTambahClientLogo
            onClose={() => setTambahData(false)}
            onResult={handleResultTambah}
            className="transition-all duration-300 ease-in-out"
          />
        )}
        {editData && (
          <ModalEditClientLogo
            data={editData}
            onClose={() => setEditData(null)}
            onResult={handleResultEdit}
            className="transition-all duration-300 ease-in-out"
          />
        )}
        {deleteId && (
          <ModalDeleteClientLogo
            id={deleteId}
            onClose={() => setDeleteId(null)}
            onResult={hanldeResultDelete}
            className="transition-all duration-300 ease-in-out"
          />
        )}
      </div>
    </>
  );
}
