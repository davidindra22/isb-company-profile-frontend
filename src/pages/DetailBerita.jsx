import React, { useState, useEffect } from "react";
import api from "../../axios";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewsCarousel from "../components/beritaPage/NewCarousel";

export default function DetailBerita() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    api
      .get("/api/berita")
      .then((res) => setBerita(res.data))
      .catch((err) => console.log(err));
  }, []);

  const { idSlug } = useParams();

  const id_berita = parseInt(idSlug.split("-")[0]);

  const data = berita.find((item) => item.id_berita === id_berita);

  if (!data) {
    return <div>Berita tidak ditemukan</div>;
  }

  //   format tgl ke format Indonesia
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="grid lg:grid-cols-3 py-25 px-(--pxmobile) lg:px-(--px) gap-10">
      <div className="lg:col-span-2 flex flex-col gap-2.5">
        <h1 className="heading">{data.judul_berita}</h1>
        <p className="">{formatDate(data.date)}</p>
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${data.fotos[0]?.foto}`}
          alt=""
          className="rounded-2xl h-[400px] w-full object-cover"
        />
        <p className="text-justify mb-4 whitespace-pre-line leading-relaxed text-gray-800 first-letter:text-2xl first-letter:font-bold">
          {data.desc_berita}
        </p>
        <NewsCarousel
          id={data.id_berita}
          image={data.fotos.map((item) => item.foto)}
        />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-2.5 border-2 border-gray-300 rounded-xl p-5">
        <div className="flex flex-col gap-2.5">
          <p className="font-medium text-xl">Share to</p>
          <div className="flex flex-row gap-4">
            <div>
              <Link href="" target="_blank" className="sosials">
                <FaInstagram size={25} />
                <p></p>
              </Link>
            </div>
            <div>
              <Link href="" target="_blank" className="sosials">
                <FaFacebook size={25} />
                <p></p>
              </Link>
            </div>
            <div>
              <Link href="" target="_blank" className="sosials">
                <FaTwitter size={25} />
                <p></p>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-300"></div>
        <h1 className="font-medium text-xl">Berita Lainnya</h1>
        {berita
          .filter((item) => item.id_berita !== id_berita)
          .map((item) => (
            <Link
              to={`/berita/${item.id_berita}-${item.judul_berita
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              key={item.id_berita}
              className="hover:scale-105 transition-all duration-200"
            >
              <div key={item.id_berita} className="flex gap-2.5 mb-2.5">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.fotos[0]?.foto}`}
                  alt=""
                  className="w-30 h-30 object-cover rounded-2xl"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.judul_berita}</p>
                  <p>{formatDate(item.date)}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
