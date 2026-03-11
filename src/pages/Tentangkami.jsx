import React from "react";
import Hero from "../components/landingpage/Hero";
import Headers from "../components/Headers";
import Ourteam from "../components/tentangkamipage/Ourteam";
import Owner from "../components/tentangkamipage/Owner";
import Footer from "../components/Footer";

// icons
import { PiFlagPennantFill } from "react-icons/pi";
import { AiFillEye } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../components/Button";

const misi = [
  "Mendampingi perusahaan Indonesia untuk sukses melalui penerapan sistem engineering yang efektif, inovatif, dan sesuai standar nasional maupun internasional.",
  "Membangun budaya kerja “selamat adalah saudara”, dengan pendekatan edukatif, kolaboratif, dan humanis.",
  "Menjadi sahabat strategis dunia industri, dengan layanan konsultasi, audit, pelatihan, dan pendampingan engineering yang profesional, responsif, dan solutif.",
  "Mendorong pertumbuhan SDM unggul di bidang Engineering, demi mewujudkan Indonesia yang kuat, produktif, dan bersaing di kancah global.",
];

function Tentangkami() {
  return (
    <main>
      <Headers>Tentang Kami</Headers>
      <div className="grid lg:grid-cols-2 gap-15 p-(--pxmobile) md:p-(--px) text-justify">
        <div className="flex flex-col gap-6">
          <h4 className="heading">profil perusahaan</h4>
          <p className="subheading">
            PT. Indonesia Sukses Bersaudara, resmi berdiri pada 20 Januari 2024,
            lahir dari tekad dan kepedulian seorang profesional Engineering yang
            menyaksikan langsung dampak nyata lemahnya penerapan keselamatan
            kerja di berbagai sektor industri. Dengan mengusung semangat
            “Indonesia Sukses Bersaudara”, perusahaan ini hadir bukan sekadar
            memenuhi tuntutan teknis dan regulatif di bidang Engineering, tetapi
            juga menumbuhkan budaya kerja yang aman, manusiawi, dan
            berkelanjutan. Berawal dari proyek-proyek kecil yang penuh dedikasi,
            kami berkembang menjadi mitra terpercaya bagi berbagai perusahaan
            nasional, membawa misi menjadikan keselamatan kerja sebagai fondasi
            kesuksesan bersama dan kekuatan bangsa.
          </p>
          <Button
            onClick={() =>
              window.open(
                "https://www.canva.com/design/DAG9C-_FPPU/4wEeNab1Ka0Jt50WrcFh-w/view",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Profil Kami <FaArrowRightLong />
          </Button>
        </div>
        <div className="flex flex-col gap-4 border-2 border-gray-300 rounded-2xl p-2 md:px-13 md:py-5">
          <div className="">
            <div className="flex items-center gap-2.5 mb-2.5">
              <PiFlagPennantFill
                size={25}
                style={{ color: "var(--color-secondary)" }}
              />
              <h5 className="font-bold text-xl">Visi</h5>
            </div>
            {misi.map((item, index) => (
              <p key={index} className="ml-5 mb-1">
                {index + 1}. {item}
              </p>
            ))}
          </div>
          <div className="border-b-2 border-gray-300"></div>
          <div className="">
            <div className="flex items-center gap-2.5 mb-2.5">
              <AiFillEye
                size={25}
                style={{ color: "var(--color-secondary)" }}
              />
              <h5 className="font-bold text-xl">Misi</h5>
            </div>
            <p className="ml-5">
              Menjadi Engineering Konsultan terbaik di Indonesia yang membangun
              budaya selamat, sukses, dan bersaudara di setiap tempat kerja demi
              Indonesia yang maju dan sejahtera.
            </p>
          </div>
        </div>
      </div>
      <Ourteam />
      <Owner />
    </main>
  );
}

export default Tentangkami;
