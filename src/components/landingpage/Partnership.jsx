import React, { useEffect, useState } from "react";
import MarqueeRow from "../Marquee";
// import api
import api from "../../../axios";

export default function Partnership() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/api/foto-client");
        const onlyFoto = res.data.map(
          (item) => `${import.meta.env.VITE_API_URL}/uploads/${item.foto}`,
        );
        setData(onlyFoto);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const row1 = data.filter((_, index) => index % 3 === 0);
  const row2 = data.filter((_, index) => index % 3 === 1);
  const row3 = data.filter((_, index) => index % 3 === 2);

  return (
    <div className="bg-[var(--color-third)] py-[60px]">
      <div className="flex flex-col items-center gap-2.5 mb-10">
        <span className="subheading-2">Partnership</span>
        <h1 className="heading">Client</h1>
        <p className="subheading max-w-3xl text-center">
          Kemitraan yang Dibangun di Atas Kepercayaan dan Keunggulan
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[var(--color-third)] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[var(--color-third)] to-transparent z-10" />

        {error ? (
          <div className="w-full text-center text-red-800 font-bold">
            Terjadi kesalahan saat mengambil data
          </div>
        ) : data === 0 ? (
          <div className="w-full text-center text-red-800 font-bold">
            Belum ada data
          </div>
        ) : (
          <>
            <MarqueeRow
              logos={row1}
              direction="left"
              speed={10}
              loading={loading}
              error={error}
            />
            <MarqueeRow
              logos={row2}
              direction="right"
              speed={10}
              loading={loading}
            />
            <MarqueeRow
              logos={row3}
              direction="left"
              speed={10}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}
