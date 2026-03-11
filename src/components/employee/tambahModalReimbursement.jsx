import { useState } from "react";
import api from "../../../axios";

// components
import LoadingOverlay from "../ui/LoadingOverlay";
import LoadingButton from "../ui/LoadingButton";

export default function TambahReimbursementModal({ onClose, onResult }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    aktivitas: "",
    tgl_mulai: "",
    tgl_selesai: "",
    jumlah: "",
    proof_file: null,
  });

  // loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();
    data.append("aktivitas", form.aktivitas);
    data.append("tgl_mulai", form.tgl_mulai);
    data.append("tgl_selesai", form.tgl_selesai);
    data.append("jumlah", form.jumlah);

    if (form.proof_file) {
      for (let i = 0; i < form.proof_file.length; i++) {
        data.append("proof_file", form.proof_file[i]);
      }
    }

    try {
      await api.post("/api/reimbursements", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onResult({
        type: "success",
        message: "Reimbursement berhasil ditambahkan!",
      });

      onClose();
    } catch (err) {
      console.log(err);

      onClose();

      onResult({
        type: "error",
        message: "Reimbursement gagal ditambahkan!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* loading */}
      <LoadingOverlay loading={loading} />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white m-2 rounded w-96 md:w-1/2 max-h-[90vh] overflow-y-auto max-w-md p-6 custShadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Buat Reimbursement</h3>
            <button onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1 [&>div]:mb-2 [&>div>input]:border [&>div>input]:p-2 [&>div>input]:rounded">
              <div className="flex flex-col gap-1 ">
                <label>Nama Kegiatan</label>
                <input
                  className="input"
                  placeholder="Nama kegiatan"
                  required
                  onChange={(e) =>
                    setForm({ ...form, aktivitas: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label>Tanggal Mulai</label>
                  <input
                    className="input border p-2 rounded"
                    type="date"
                    required
                    onChange={(e) =>
                      setForm({ ...form, tgl_mulai: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Tanggal Selesai</label>
                  <input
                    className="input border p-2 rounded"
                    type="date"
                    required
                    onChange={(e) =>
                      setForm({ ...form, tgl_selesai: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label>Jumlah Dana</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Biaya"
                  required
                  onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Butki Foto</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, proof_file: e.target.files })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {/* <button
                type="submit"
                className="bg-(--color-secondary) text-white px-4 py-2 rounded hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
              >
                Simpan
              </button> */}
              <LoadingButton type="submit" loading={loading}>
                Simpan
              </LoadingButton>
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
