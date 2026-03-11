import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../Button";
import Image from "../../assets/company_members.jpg";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

export default function LayananCarousel() {
  const [layanan, setLayanan] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/layanan");
        setLayanan(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-8 py-10">
      <div className="flex flex-col justify-center items-center gap-2.5 mb-10">
        <p className="subheading-2">Our Servies</p>
        <p className="heading">Layanan Kami</p>
        <p className="subheading max-w-3xl text-center">
          Didukung oleh tim ahli dan metodologi internasional, kami hadir untuk
          mendukung keputusan strategis dan operasional Anda.
        </p>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"} // biar bisa width custom
        centeredSlides={false}
        freeMode={{ sticky: true }}
      >
        {error ? (
          <div className="w-full text-center text-red-800 font-bold py-10">
            Terjadi kesalahan saat mengambil data
          </div>
        ) : loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <div className="w-[200px] md:w-[20vw] h-[488px] rounded-xl shadow-lg bg-gray-300 animate-pulse">
                <div className="h-full w-full p-8 flex flex-col justify-end">
                  <div className="h-8 w-3/4 bg-gray-400 rounded mb-3"></div>

                  <div className="h-4 w-full bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-400 rounded"></div>

                  <div className="mt-4 h-8 w-28 bg-gray-400 rounded"></div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : layanan.length === 0 ? (
          <div className="w-full text-center text-gray-800 font-bold py-10">
            Tidak ada layanan
          </div>
        ) : (
          layanan.map((item) => (
            <SwiperSlide key={item.id_layanan} className="!w-auto">
              <div
                onClick={() =>
                  setSelectedId(
                    selectedId === item.id_layanan ? null : item.id_layanan,
                  )
                }
                className={`snap-x transition-all duration-500 cursor-pointer h-[488px] rounded-xl shadow-lg bg-cover bg-center ${
                  selectedId === item.id_layanan
                    ? "w-[320px] md:w-[40vw]"
                    : "w-[200px] md:w-[20vw]"
                }`}
                style={{
                  backgroundImage: `url("${
                    item.fotos?.length > 0
                      ? `${import.meta.env.VITE_API_URL}/uploads/${item.fotos[0]?.foto}`
                      : Image
                  }")`,
                }}
              >
                <div className="snap-start bg-black/40 h-full w-full p-8 flex flex-col justify-end rounded-xl">
                  <h3 className="text-3xl font-semibold text-white mb-2">
                    {item.nama_layanan}
                  </h3>
                  {selectedId === item.id_layanan ? (
                    <div className="flex flex-col gap-2 text-white">
                      <p className="">{item.desc_layanan}</p>
                      <Link to="/services">
                        <Button className="mt-4 w-fit">
                          Learn More <FaArrowRightLong />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-gray-200 text-sm">Klik untuk detail</p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
