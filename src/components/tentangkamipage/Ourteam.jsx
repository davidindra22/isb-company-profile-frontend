import React from "react";
import Image from "../../assets/hero.jpg";

export default function Ourteam() {
  return (
    <div className="relative group h-auto p-(--pxmobile) md:p-(--px) flex justify-center">
      <img
        src={Image}
        alt=""
        className="w-full h-[350px] md:h-[576px] object-cover rounded-2xl"
      />
      <div className="absolute flex flex-col gap-4 w-[300px] h-[310px] md:w-[600px] md:h-[450px] lg:w-[1012px] lg:h-[396px] bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-1/3 bg-white/30 backdrop-blur-md border-2 border-blue-800 rounded-4xl p-2 md:p-5 lg:p-13">
        <h1 className="heading text-center">Our Team</h1>
        <p className="hidden md:flex subheading text-justify">
          Kami bukan sekadar Engineering kami adalah mitra strategis yang
          membantu perusahaan membangun lingkungan kerja yang aman, sehat, dan
          berkelanjutan. Berbekal semangat “Sukses Bersaudara”, kami hadir untuk
          mendorong transformasi budaya keselamatan di tempat kerja, bukan hanya
          untuk memenuhi regulasi, tetapi sebagai investasi jangka panjang
          menuju produktivitas dan reputasi perusahaan yang unggul. Didukung
          oleh tim profesional dan pengalaman lintas industri, kami
          mengintegrasikan keahlian teknis, pendekatan humanis, dan teknologi
          terkini untuk menciptakan solusi Engineering yang praktis, terukur,
          dan berdampak. Bagi kami, keselamatan bukan hanya angka ini adalah
          nilai hidup, fondasi bisnis, dan cermin kemajuan bangsa.
        </p>
        <p className="flex md:hidden text-base text-justify">
          Kami bukan sekadar Engineering kami adalah mitra strategis yang
          membantu perusahaan membangun lingkungan kerja yang aman, sehat, dan
          berkelanjutan. Didukung oleh tim profesional dan pengalaman lintas
          industri. Bagi kami, keselamatan bukan hanya angka ini adalah nilai
          hidup, fondasi bisnis, dan cermin kemajuan bangsa.
        </p>
      </div>
    </div>
  );
}
