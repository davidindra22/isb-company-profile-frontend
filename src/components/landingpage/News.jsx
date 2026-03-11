import React, { useState, useEffect, useMemo } from "react";
import api from "../../../axios";
import { Link } from "react-router-dom";

// components
import Button from "../Button";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

export default function News() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/berita");
        setBerita(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // mengurutkan berita berdasarkan tgl terbaru
  const sortedBerita = useMemo(() => {
    return [...berita].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [berita]);

  // ambil berita utama atau paling terbaru
  const mainNews = sortedBerita[0];

  // ambil berita lainnya
  const sideNews = sortedBerita.slice(1, 4);

  //   format tgl ke format Indonesia
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  //   truncate text jika terlalu panjang
  function truncateText(text, wordLimit = 10) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  }

  return (
    <div className="px-(--pxmobile) md:px-8 lg:px-(--px) py-15">
      <div className="flex flex-col justify-start gap-2.5 mb-10">
        <p className="subheading-2">News</p>
        <p className="heading">Berita</p>
        <p className="subheading ">
          Dapatkan insight dari studi kasus, pelatihan, dan kolaborasi terbaru
          kami.
        </p>
      </div>

      {loading ? (
        <div className="flex w-full h-52 justify-center items-center">
          <div className="border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-800 font-bold">
          Terjadi kesalahan saat mengambil data
        </p>
      ) : berita.length === 0 ? (
        <div className="w-full text-center text-gray-800 font-bold py-10">
          Tidak ada Berita
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to={`/berita/${mainNews.id_berita}-${mainNews.judul_berita
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <div
              className="rounded-2xl h-[499px] bg-cover bg-center"
              style={{
                backgroundImage: `url("${import.meta.env.VITE_API_URL}/uploads/${mainNews?.fotos?.[0]?.foto}")`,
              }}
            >
              <div className="bg-black/40 h-full w-full p-8 flex flex-col justify-end rounded-xl hover:bg-black/70 transition duration-300 cursor-pointer">
                <h3 className="text-white">{mainNews.judul_berita}</h3>
                <p className="text-white font-light text-md">
                  {formatDate(mainNews.date)}
                </p>
              </div>
            </div>
          </Link>
          <div className="flex flex-col">
            {sideNews.map((item) => (
              <Link
                to={`/berita/${item.id_berita}-${item.judul_berita
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                key={item.id_berita}
              >
                <div
                  // key={item.id_berita}
                  className="flex flex-row max-h-[130px] gap-2.5 mb-5 cursor-pointer"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.fotos[0]?.foto}`}
                    alt=""
                    className="w-[135px] md:h-[133px] md:w-[200px] object-cover rounded-2xl"
                  />
                  <div className="">
                    <p className="font-bold text-sm lg:text-lg">
                      {truncateText(item.judul_berita)}
                    </p>
                    <p className="font-light">{formatDate(item.date)}</p>
                  </div>
                </div>
              </Link>
            ))}

            <Link to="/berita">
              <Button>
                Read More <FaArrowRightLong />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
