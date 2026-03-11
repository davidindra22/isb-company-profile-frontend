import { useState } from "react";
import api from "../../../axios";

// components
import LoadingOverlay from "../ui/LoadingOverlay";

export default function DeleteConfirmModal({ id, onClose, onResult }) {
  const token = localStorage.getItem("token");

  // loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/api/delete-reimbursements/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose();

      onResult({
        type: "success",
        message: "Reimbursement berhasil dihapus!",
      });
    } catch (err) {
      console.log(err);

      onClose();

      onResult({
        type: "error",
        message: "Reimbursement gagal dihapus!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* loading */}
      <LoadingOverlay loading={loading} />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded w-80">
          <p>Yakin hapus data ini?</p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-(--color-secondary) hover:bg-(--bg-hover) px-4 py-2 rounded-md text-white"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md "
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
