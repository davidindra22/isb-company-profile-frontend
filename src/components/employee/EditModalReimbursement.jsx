import { useState, useRef } from "react";

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
  const [deletedFotoIds, setDeletedFotoIds] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    activity_name: data.activity_name,
    start_date: formatDateForInput(data.start_date),
    end_date: formatDateForInput(data.end_date),
    amount: data.amount,
    status: data.status,
    reject_reason: data.reject_reason,
    files: data.files || [],
    newFiles: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("activity_name", form.activity_name);
    formData.append("start_date", form.start_date);
    formData.append("end_date", form.end_date);
    formData.append("amount", form.amount);

    // file baru
    form.newFiles.forEach((file) => {
      formData.append("proof_file", file);
    });

    // file yang dihapus
    formData.append("deletedFiles", JSON.stringify(deletedFotoIds));

    try {
      await api.put(`/api/edit-reimbursements/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

  // handle file input preview
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    setForm((prev) => ({
      ...prev,
      newFiles: [...(prev.newFiles || []), ...selectedFiles],
    }));

    setPreviewImg((prev) => [
      ...(prev || []),
      ...selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);

    e.target.value = "";
  };

  const handleRemovePreview = (index) => {
    setPreviewImg((prev) => {
      URL.revokeObjectURL(prev[index]?.preview);
      return prev.filter((_, i) => i !== index);
    });

    setForm((prev) => ({
      ...prev,
      newFiles: (prev.newFiles || []).filter((_, i) => i !== index),
    }));
  };

  // handle file deletion
  const handleDeleteFoto = (file) => {
    setForm((prev) => {
      if (!prev) return prev;

      const updatedFiles = (prev.files || []).filter((f) => f != file);
      return { ...prev, files: updatedFiles };
    });
    setDeletedFotoIds((prev) => [...prev, file]);
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
            <div className="flex flex-col gap-1">
              <label>Jumlah Dana</label>
              <input
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
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

            <div className="flex flex-col gap-1">
              <label>Butki Foto</label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                name="proof_file"
                onChange={handleFileChange}
              />
              {/* Preview file baru */}
              {previewImg && previewImg.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImg.map((item, index) => (
                    <div key={index} className="relative">
                      <img
                        src={item.preview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 left-1 bg-red-500 text-white text-xs p-0.5 rounded"
                        onClick={() => handleRemovePreview(index)}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preview file lama */}
            {form.files && form.files.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <label>Preview Bukti Foto Yang sudah ada</label>
                <div className="flex flex-wrap gap-2">
                  {form.files.map((file, index) => (
                    <div className="relative" key={file}>
                      <img
                        key={index}
                        src={`${import.meta.env.VITE_API_URL}/uploads/reimbursements/${file}`}
                        alt={`Proof ${index + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 left-1 bg-red-500 hover:bg-red-800 text-white text-xs p-0.5 rounded"
                        onClick={() => {
                          handleDeleteFoto(file);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
