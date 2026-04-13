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
    bukti: [{ jumlah: "", keterangan: "", proof_file: null, tanggal: "" }],
  });

  // loading
  const [loading, setLoading] = useState(false);

  const tambahBukti = () => {
    setForm({
      ...form,
      bukti: [
        ...form.bukti,
        { jumlah: "", keterangan: "", proof_file: null, tanggal: "" },
      ],
    });
  };

  const handleBuktiChange = (index, field, value) => {
    const newBukti = [...form.bukti];
    newBukti[index][field] = value;

    setForm({ ...form, bukti: newBukti });
  };

  const total = form.bukti.reduce((acc, item) => {
    return acc + Number(item.jumlah || 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();
    data.append("aktivitas", form.aktivitas);
    data.append("tgl_mulai", form.tgl_mulai);
    data.append("tgl_selesai", form.tgl_selesai);
    // data.append("jumlah", form.jumlah);

    form.bukti.forEach((bukti, index) => {
      data.append(`bukti[${index}][jumlah]`, bukti.jumlah);
      data.append(`bukti[${index}][keterangan]`, bukti.keterangan);
      data.append(`bukti[${index}][tanggal]`, bukti.tanggal);

      if (bukti.proof_file) {
        data.append(`bukti[${index}][proof_file]`, bukti.proof_file);
      }
    });

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
                    max={form.tgl_selesai}
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
                    min={form.tgl_mulai}
                    onChange={(e) =>
                      setForm({ ...form, tgl_selesai: e.target.value })
                    }
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
                    <label>Butki Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleBuktiChange(
                          index,
                          "proof_file",
                          e.target.files[0],
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Jumlah Dana</label>
                    <input
                      className="input"
                      type="number"
                      placeholder="Biaya"
                      required
                      onChange={(e) =>
                        handleBuktiChange(index, "jumlah", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Keterangan</label>
                    <input
                      className="input"
                      type="text"
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
                      disabled={!form.tgl_mulai || !form.tgl_selesai}
                      min={form.tgl_mulai}
                      max={form.tgl_selesai}
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

            <div className="flex justify-end gap-2 mt-4">
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
