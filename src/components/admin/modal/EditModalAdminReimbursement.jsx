import { useState, useEffect } from "react";
import api from "../../../../axios";
import LoadingOverlay from "../../ui/LoadingOverlay";

export default function EditReimbursementModal({ data, onClose, onResult }) {
  const [previewImg, setPreviewImg] = useState(null);
  const [show, setShow] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShow(true); // trigger animasi masuk
  }, []);

  const handleClose = () => {
    setShow(false); // trigger animasi keluar
    setTimeout(onClose, 300); // tunggu animasi
  };

  const statusOptions = ["Pending", "Rejected", "Approved"];
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);

    // geser ke timezone lokal (WIB)
    date.setHours(date.getHours() + 7);

    return date.toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    no: data.document_number,
    employee_name: data.employee_name,
    activity_name: data.activity_name,
    start_date: formatDateForInput(data.start_date),
    end_date: formatDateForInput(data.end_date),
    amount: data.amount,
    status: data.status || "Pending",
    reject_reason: data.reject_reason,
    files: data.files,
  });

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(
        `/api/admin/reimbursements/${data.id}/status`,
        {
          status: form.status,
          reject_reason: form.reject_reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onClose();
      onResult({
        type: "success",
        message: "Reimbursement berhasil diperbarui!",
      });
    } catch (err) {
      console.log(err);
      onClose();
      onResult({
        type: "error",
        message: "Reimbursement gagal diperbarui!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300
      ${show ? "opacity-100" : "opacity-0"}`}
      >
        <form
          className={`bg-white p-6 m-2 rounded w-96 md:w-1/2 max-h-[90vh] overflow-y-auto transform transition-all duration-300
        ${show ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold ">Detail Reimbursement</h2>
            <h3>No. Pengajuan Reimbursement : {data.no}</h3>
          </div>

          <div className="flex flex-col gap-1 [&>div>div]:mb-2 [&>div>div>input]:border [&>div>div>input]:rounded [&>div>div>input]:p-2 ">
            <div className="flex flex-col md:grid grid-cols-2 md:gap-4">
              <div className="flex flex-col gap-2">
                <label>Nama Pegawai</label>
                <input
                  className="input-custom"
                  value={form.employee_name}
                  onChange={(e) =>
                    setForm({ ...form, employee_name: e.target.value })
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label>Nama Kegiatan</label>
                <input
                  className="input-custom"
                  value={form.activity_name}
                  onChange={(e) =>
                    setForm({ ...form, activity_name: e.target.value })
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col md:grid grid-cols-2 md:gap-4">
              <div className="flex flex-col gap-1">
                <label>Tanggal Mulai</label>
                <input
                  className="input-custom"
                  type="date"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Tanggal Selesai</label>
                <input
                  className="input-custom"
                  type="date"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Jumlah Dana</label>
              <input
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                readOnly
                className="input-custom border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Butki Foto</label>
              {form.files.length > 0 ? (
                <div className="flex flex-wrap flex-grow-1 flex-basis-1 gap-2">
                  {form.files.map((img, i) => (
                    <img
                      key={i} // <--- Important: Add a unique key
                      src={`${import.meta.env.VITE_API_URL}/uploads/reimbursements/${img}`}
                      alt="Foto Layanan"
                      className="w-20 h-20 object-cover rounded"
                      onClick={() =>
                        setPreviewImg(
                          `${import.meta.env.VITE_API_URL}/uploads/reimbursements/${img}`,
                        )
                      }
                    />
                  ))}
                </div> // <--- Close the .map
              ) : (
                <p className="text-gray-500">Tidak ada foto</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Status</label>
              <select
                value={form.status}
                disabled={data.status === "Approved"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="input-custom border rounded px-2 py-1"
              >
                <option value="">-- Pilih Status --</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            {form.status === "Rejected" && (
              <div className="flex flex-col gap-1">
                <label>Alasan Ditolak</label>
                <textarea
                  value={form.reject_reason}
                  required
                  onChange={(e) =>
                    setForm({ ...form, reject_reason: e.target.value })
                  }
                  className="input-custom border rounded px-2 py-1 h-20 resize-none"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={data.status === "Approved"}
              className="bg-(--color-secondary) text-white px-4 py-2 rounded hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded border bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
