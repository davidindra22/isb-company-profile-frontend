import React, { useState, useEffect } from "react";
import api from "../../../axios";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function AllNews() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    api
      .get("/api/berita")
      .then((res) => setBerita(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  //   format tgl ke format Indonesia
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  //   truncate text jika terlalu panjang
  const truncateText = (text, maxLength = 200) => {
    if (!text || typeof text !== "string") {
      return ""; // Mengembalikan string kosong jika text tidak valid
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + ".....";
  };
  return (
    <div className="flex flex-col gap-13 p-(--pxmobile) lg:p-(--px)">
      <div className="font-bold text-3xl md:text-4xl uppercased">
        Berita terbaru
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-13">
        {berita.length === 0 ? (
          <div className="text-center text-gray-800 font-bold py-10 col-span-3">
            Tidak ada berita
          </div>
        ) : (
          berita.map((item) => (
            <div key={item.id_berita} className="flex flex-col gap-2.5">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.fotos[0]?.foto}`}
                alt=""
                className="rounded-2xl h-2/4 w-full object-cover"
              />
              <h6 className="font-light">{formatDate(item.date)}</h6>
              <h1 className="font-bold text-sm md:text-lg">
                {item.judul_berita}
              </h1>
              <p className="text-justify">{truncateText(item.desc_berita)}</p>
              <Button
                onClick={() =>
                  navigate(
                    `/berita/${item.id_berita}-${item.judul_berita
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`,
                  )
                }
                className="w-max"
              >
                <p className="text-sm">Lihat selengkapnya</p>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
