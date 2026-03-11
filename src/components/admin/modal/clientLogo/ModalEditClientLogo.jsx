import React, { useState, useRef } from "react";
import api from "../../../../../axios";
import LoadingOverlay from "../../../ui/LoadingOverlay";

export default function ModalEditClientLogo({ data, onClose, onResult }) {
  const [form, setForm] = useState({
    nama_client: data?.nama_client || "",
    foto: data?.foto || "",
    newFiles: null,
  });

  const [previewImg, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);

  // loading
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    if (!selectedFiles) return;

    setForm((prev) => ({
      ...prev,
      newFiles: selectedFiles,
    }));

    setPreviewImg({
      file: selectedFiles,
      preview: URL.createObjectURL(selectedFiles),
    });

    e.target.value = "";
  };
  const handleRemovePreview = () => {
    setPreviewImg((prev) => {
      if (prev?.preview) {
        URL.revokeObjectURL(prev.preview);
      }
      return null;
    });

    setForm((prev) => ({
      ...prev,
      newFiles: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("nama_client", form.nama_client);

    if (form.newFiles) {
      formData.append("foto", form.newFiles);
    }

    try {
      await api.put(`/api/edit-foto-client/${data.id}`, formData);

      onClose();

      onResult({
        type: "success",
        message: "Client Logo berhasil diperbarui!",
      });
    } catch (err) {
      console.log("Error saat mengedit Client Logo:", err);

      onClose();

      onResult({
        type: "error",
        message: "Client Logo gagal diperbarui!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 m-2 rounded w-96 md:w-1/2 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Edit Logo Client</h3>
            <button onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1 [&>div]:mb-2 [&>div>input]:border [&>div>input]:p-2 [&>div>input]:rounded">
              <div className="flex flex-col gap-1">
                <label>Nama Client</label>
                <input
                  type="text"
                  value={form.nama_client}
                  onChange={(e) =>
                    setForm({ ...form, nama_client: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Logo Client</label>
                {/* preview foto lama */}
                {form.foto && !previewImg && (
                  <div className="flex flex-wrap gap-2 my-3">
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${form.foto}`}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>
                  </div>
                )}

                {/* input file foto baru */}
                <input
                  ref={fileInputRef}
                  type="file"
                  // value={form.logo_url}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {/* Preview file baru */}
                {previewImg && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="relative">
                      <img
                        src={previewImg.preview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 left-1 bg-red-500 text-white text-xs p-0.5 rounded"
                        onClick={handleRemovePreview}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="bg-(--color-secondary) text-white px-4 py-2 rounded hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
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
      </div>
    </>
  );
}
