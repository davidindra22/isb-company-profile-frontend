import { useState } from "react";

import api from "../../../axios";

// components
import LoadingOverlay from "../ui/LoadingOverlay";

export default function EditReimbursementModal({ data, onClose, onResult }) {
  const token = localStorage.getItem("token");

  // loading
  const [loading, setLoading] = useState(false);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);

    // geser ke timezone lokal (WIB)
    date.setHours(date.getHours() + 7);

    return date.toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    id_reimbursement: data.id,
    activity_name: data.activity_name,
    start_date: formatDateForInput(data.start_date),
    end_date: formatDateForInput(data.end_date),
    amount: data.amount,
    status: data.status,
    reject_reason: data.reject_reason,
    bukti: data.bukti.map((bukti) => ({
      id: bukti.id,
      jumlah: bukti.jumlah,
      keterangan: bukti.keterangan,
      namefile: bukti.namefile,
      tanggal: formatDateForInput(bukti.tanggal),
      proof_file: null,
    })),
  });

  const tambahBukti = () => {
    setForm((prev) => ({
      ...prev,
      bukti: [
        ...(prev.bukti || []),
        { id: null, jumlah: "", keterangan: "", proof_file: null, tanggal: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const isBuktiValid = form.bukti.every(
      (item) => item.proof_file || item.namefile,
    );

    if (!isBuktiValid) {
      alert("Semua bukti wajib memiliki foto!");
      return;
    }

    setLoading(true);

    formData.append("activity_name", form.activity_name);
    formData.append("start_date", form.start_date);
    formData.append("end_date", form.end_date);
    formData.append("amount", form.amount);

    // bukti
    formData.append("bukti", JSON.stringify(form.bukti));

    // file baru
    form.bukti.forEach((item, index) => {
      if (item.proof_file) {
        formData.append(`bukti[${index}][proof_file]`, item.proof_file);
      }
    });

    try {
      await api.put(`/api/edit-reimbursements/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose();

      onResult({
        type: "success",
        message: "Reimbursement berhasil diperbarui!",
      });
    } catch (err) {
      console.log(err);

      onResult({
        type: "error",
        message: "Reimbursement gagal diperbarui!",
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleBuktiChange = (index, field, value) => {
    const updatedBukti = [...form.bukti];
    updatedBukti[index][field] = value;

    setForm({
      ...form,
      bukti: updatedBukti,
    });
  };

  const total = form.bukti.reduce((acc, item) => {
    return acc + Number(item.jumlah || 0);
  }, 0);

  // format rupiah
  const formatRupiah = (value) => {
    if (value === null || value === undefined) return "-";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      {/* loading */}
      <LoadingOverlay loading={loading} />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <form
          className="bg-white p-6 m-2 rounded w-96 md:w-1/2 max-h-[90vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-bold mb-4">Edit Reimbursement</h2>

          <div className="flex flex-col gap-1 [&>div]:mb-2 [&>div>input]:border [&>div>input]:p-2 [&>div>input]:rounded">
            <div className="flex flex-col gap-1 ">
              <label>Nama Kegiatan</label>
              <input
                className=""
                value={form.activity_name}
                onChange={(e) =>
                  setForm({ ...form, activity_name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label>Tanggal Mulai</label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Tanggal Selesai</label>
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {form.bukti.map((item, index) => (
              <div
                key={index}
                className="[&>div>input]:border [&>div>input]:p-2 [&>div>input]:rounded border-t"
              >
                <h6 className="mb-1">Upload Bukti No. {index + 1} </h6>
                <div className="flex flex-col gap-1">
                  <label>Bukti Foto</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleBuktiChange(index, "proof_file", e.target.files[0])
                    }
                  />

                  {/* error */}
                  {!item.proof_file && !item.namefile && (
                    <p className="text-red-500 text-sm">
                      Bukti foto wajib diisi
                    </p>
                  )}

                  {/* preview */}
                  {(item.namefile || item.proof_file) && (
                    <div className="flex flex-col gap-2 mt-2">
                      <label>Preview Bukti</label>
                      <div className="relative w-fit">
                        <img
                          src={
                            item.proof_file instanceof File
                              ? URL.createObjectURL(item.proof_file)
                              : `${import.meta.env.VITE_API_URL}/uploads/reimbursements/${item.namefile}`
                          }
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label>Jumlah Dana</label>
                  <input
                    className="input"
                    type="text"
                    value={formatRupiah(form.bukti[index].jumlah)}
                    placeholder="Biaya"
                    inputMode="numeric"
                    onChange={(e) => {
                      let value = e.target.value;

                      // Hapus semua selain angka
                      value = value.replace(/[^0-9]/g, "");

                      handleBuktiChange(index, "jumlah", value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Keterangan</label>
                  <input
                    className="input"
                    type="text"
                    value={form.bukti[index].keterangan}
                    placeholder="Keterangan"
                    required
                    onChange={(e) =>
                      handleBuktiChange(index, "keterangan", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Tanggal</label>
                  <input
                    type="date"
                    required
                    value={form.bukti[index].tanggal}
                    disabled={!form.start_date || !form.end_date}
                    min={form.start_date}
                    max={form.end_date}
                    onChange={(e) =>
                      handleBuktiChange(index, "tanggal", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={tambahBukti}
                className="border-2 border-blue-500 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Tambah bukti
              </button>
            </div>
            <div className="">
              Total Dana: Rp {total.toLocaleString("id-ID")}
            </div>
          </div>

          {form.status === "Rejected" && (
            <div className="flex flex-col gap-1">
              <label>Keterangan</label>
              <textarea
                value={form.reject_reason}
                readOnly
                onChange={(e) =>
                  setForm({ ...form, reject_reason: e.target.value })
                }
                className="border rounded px-2 py-1 h-20 resize-none"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={form.status === "Approved"}
              className={`${form.status === "Approved" && "cursor-not-allowed"} bg-(--color-secondary) text-white px-4 py-2 rounded hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out`}
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
