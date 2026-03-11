import React, { useState } from "react";
import api from "../../../../../axios";
import LoadingOverlay from "../../../ui/LoadingOverlay";

export default function ModalDeleteClientLogo({ id, onClose, onResult }) {
  // loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.delete(`/api/detele-foto-client/${id}`);

      onClose();

      onResult({
        type: "success",
        message: "Client Logo berhasil dihapus!",
      });
    } catch (error) {
      console.log("Error saat menghapus Client Logo:", error);

      onClose();

      onResult({
        type: "error",
        message: "Client Logo gagal dihapus!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
