import { useEffect, useState } from "react";
import api from "../../../../axios";

import Button from "../../../components/Button";

// components
import TambahReimbursementModal from "../../../components/employee/TambahModalReimbursement";
import EditReimbursementModal from "../../../components/employee/EditModalReimbursement";
import DeleteConfirmModal from "../../../components/employee/DeleteModalReimbursement";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbCircleDotted } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { IoMdPrint } from "react-icons/io";

export default function ReimburseForm() {
  const [reimbusements, setReimbusements] = useState([]);

  const [tambahData, setTambahData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // message berhasil dan gagal
  const [alert, setAlert] = useState(null);

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

  const handleResultDelete = (result) => {
    setAlert(result);

    if (result.type === "success") {
      fetchData();
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/api/reimbursements/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReimbusements(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format angka ke Rupiah
  const formatRupiah = (value) => {
    if (value === null || value === undefined) return "-";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // format tanggal
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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

      <section>
        <div className="w-auto p-5 rounded-2xl bg-white custShadow">
          <div className="flex justify-between mb-5">
            <h6>Pengajuan Reimbursement</h6>
            <Button onClick={() => setTambahData(true)}>Buat Pengajuan</Button>
          </div>
          <div className="custShadow rounded-3xl p-5 overflow-x-auto">
            <h6>Riwayat Pengajuan</h6>
            <table className="table-auto border-separate border-spacing-y-6 border-spacing-x-3 w-full ">
              <thead>
                <tr className="*:text-nowrap border">
                  <th className="text-left">No</th>
                  <th>Aktivitas</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Jumlah</th>
                  <th>Bukti Foto</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reimbusements.length > 0 ? (
                  reimbusements.map((item, idx) => (
                    <tr
                      key={idx}
                      className="text-nowrap *:text-center text-gray-600"
                    >
                      <td>{idx + 1}</td>
                      <td>{item.activity_name}</td>
                      <td>{formatDate(item.start_date)}</td>
                      <td>{formatDate(item.end_date)}</td>
                      <td>{formatRupiah(item.amount)}</td>
                      <td>
                        {item.bukti?.length > 0 ? (
                          <div className="flex flex-wrap flex-grow-1 flex-basis-1 gap-2">
                            {item.bukti.map((bukti, i) =>
                              bukti.namefile ? (
                                <img
                                  key={i}
                                  src={`${import.meta.env.VITE_API_URL}/uploads/reimbursements/${bukti.namefile}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                              ) : null,
                            )}
                          </div>
                        ) : (
                          <span>Tidak ada bukti</span>
                        )}
                      </td>
                      <td>{item.reject_reason || "-"}</td>
                      <td>
                        <div
                          className={`flex flex-row justify-center items-center gap-1 text-center px-1 py-1 text-fuchsia font-semibold rounded-md capitalize ${item.status === "Pending" ? "bg-yellow-200 text-yellow-800" : item.status === "Rejected" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}
                        >
                          {item.status === "Pending" ? (
                            <TbCircleDotted />
                          ) : item.status === "Rejected" ? (
                            <IoCloseCircleOutline />
                          ) : (
                            <IoMdCheckmarkCircleOutline />
                          )}
                          {item.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center gap-2">
                          <button
                            onClick={() => {
                              setEditData(item);
                            }}
                            className="flex flex-row px-2 py-1 items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-fuchsia font-semibold rounded-md transition-colors duration-300 ease-in-out"
                          >
                            <p>Edit</p>
                            <IoMdCreate />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(item.id);
                            }}
                            className="flex flex-row px-2 py-1 items-center gap-2 bg-red-300 hover:bg-red-400 text-red-800 font-semibold rounded-md transition-colors duration-300 ease-in-out"
                          >
                            <p>Hapus</p>
                            <IoMdTrash />
                          </button>
                          <button
                            onClick={() => {
                              window.open(
                                `${import.meta.env.VITE_API_URL}/api/auth/reimbursements/${item.id}/pdf`,
                                "_blank",
                              );
                            }}
                            className={`flex flex-row ${item.status !== "Approved" ? "hidden" : ""} px-2 py-1 items-center gap-2 bg-blue-300 hover:bg-blue-400 text-blue-800 font-semibold rounded-md transition-colors duration-300 ease-in-out`}
                          >
                            <p>Print</p>
                            <IoMdPrint />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada riwayat pengajuan reimbursement.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {tambahData && (
            <TambahReimbursementModal
              onClose={() => setTambahData(false)}
              onResult={handleResultTambah}
            />
          )}

          {editData && (
            <EditReimbursementModal
              data={editData}
              onClose={() => setEditData(null)}
              onResult={handleResultEdit}
            />
          )}

          {deleteId && (
            <DeleteConfirmModal
              id={deleteId}
              onClose={() => setDeleteId(null)}
              onResult={handleResultDelete}
            />
          )}
        </div>
      </section>
    </>
  );
}
