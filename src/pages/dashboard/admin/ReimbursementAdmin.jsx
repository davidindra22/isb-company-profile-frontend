import React, { useEffect, useState } from "react";
import api from "../../../../axios";

// icon
import { BiTask } from "react-icons/bi";
import { TbCircleDotted } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

import EditReimbursementModal from "../../../components/admin/modal/EditModalAdminReimbursement";

export default function ReimbursementAdmin() {
  const [reimbusements, setReimbusements] = useState([]);
  const [editData, setEditData] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleResult = (result) => {
    setAlert(result);
    fetchData();

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/api/admin/reimbursements", {
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
          <h6>Reimbursement</h6>
        </div>
        <div className="custShadow rounded-3xl p-5 overflow-x-auto">
          <table className="table-auto border-separate border-spacing-y-6 border-spacing-x-3 w-full ">
            <thead>
              <tr className="*:text-nowrap">
                <th className="text-left">No</th>
                <th>Nama</th>
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
                  <tr key={idx} className="text-nowrap text-gray-600">
                    <td>{idx + 1}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.activity_name}</td>
                    <td className="text-center">
                      {formatDate(item.start_date)}
                    </td>
                    <td className="text-center">{formatDate(item.end_date)}</td>
                    <td className="text-center">{formatRupiah(item.amount)}</td>
                    <td>
                      {item.files.length > 0 ? (
                        <div className="flex flex-wrap flex-grow-1 flex-basis-1 gap-2">
                          {item.files.map((img, i) => (
                            <img
                              key={i} // <--- Important: Add a unique key
                              src={`${import.meta.env.VITE_API_URL}/uploads/reimbursements/${img}`}
                              alt="Foto Layanan"
                              className="w-20 h-20 object-cover rounded"
                            />
                          ))}
                        </div> // <--- Close the .map
                      ) : (
                        <p className="text-gray-500">Tidak ada foto</p>
                      )}
                    </td>
                    <td className="text-center">{item.reject_reason || "-"}</td>
                    <td className="text-center">
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
                    <td className="">
                      <button
                        onClick={() => {
                          setEditData(item);
                        }}
                        className="flex flex-row px-2 py-1 items-center gap-2 bg-fuchsia-300 hover:bg-fuchsia-400 text-fuchsia font-semibold rounded-md transition-colors duration-300 ease-in-out"
                      >
                        <p>Lihat</p>
                        <BiTask />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {editData && (
          <EditReimbursementModal
            data={editData}
            onClose={() => setEditData(null)}
            onResult={handleResult}
            className="transition-all duration-300 ease-in-out"
          />
        )}
      </div>
    </>
  );
}
