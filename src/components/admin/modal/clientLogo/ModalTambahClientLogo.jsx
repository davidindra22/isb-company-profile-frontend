import React, { useState, useRef } from "react";
import api from "../../../../../axios";
import LoadingOverlay from "../../../ui/LoadingOverlay";

export default function ModalTambahClientLogo({ onClose, onResult }) {
  const [form, setForm] = useState({
    nama_client: "",
    foto: "",
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
      foto: selectedFiles,
    }));

    setPreviewImg({
      file: selectedFiles,
      preview: URL.createObjectURL(selectedFiles),
    });
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
      foto: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append("nama_client", form.nama_client);
    data.append("foto", form.foto);

    try {
      await api.post("/api/add-foto-client", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();

      onResult({
        type: "success",
        message: "Client Logo berhasil ditambahkan!",
      });
    } catch (err) {
      console.log(err);

      onClose();

      onResult({
        type: "error",
        message: "Client Logo gagal ditambahkan!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white m-2 rounded w-96 md:w-1/2 max-h-[90vh] overflow-y-auto max-w-md p-6 custShadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Tambah Client Logo</h3>
            <button onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1 [&>div]:mb-2 [&>div>input]:border [&>div>input]:p-2 [&>div>input]:rounded">
              <div className="flex flex-col gap-1">
                <label>Nama Client</label>
                <input
                  className="input"
                  placeholder="Nama client"
                  type="text"
                  required
                  onChange={(e) =>
                    setForm({ ...form, nama_client: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Logo Client</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
                {/* Preview file baru */}
                {previewImg && (
                  <div className="flex flex-wrap gap-2 my-3">
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
