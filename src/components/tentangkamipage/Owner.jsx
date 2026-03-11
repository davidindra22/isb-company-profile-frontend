import React from "react";
import Image from "../../assets/foto-ceo.png";

export default function Owner() {
  return (
    <div className="grid md:grid-cols-3 gap-8 bg-(--color-bg-header) mt-45 p-(--pxmobile) md:px-(--px) lg:px-50 md:py-(--px)">
      <div className="col-span-2 subheading text-justify">
        “Sebagai engineering konsultan terbaik, kami hadir memberikan solusi
        rekayasa yang inovatif, efisien, dan berkelanjutan untuk mendukung
        setiap kebutuhan proyek Anda. Dengan tim profesional berpengalaman dan
        berstandar internasional, kami tidak hanya berfokus pada kualitas hasil,
        tetapi juga pada ketepatan waktu, keandalan, serta kepuasan klien.
        Komitmen kami adalah menjadi mitra strategis yang terpercaya dalam
        menghadirkan perencanaan, desain, hingga implementasi teknik terbaik
        yang mampu meningkatkan daya saing sekaligus memastikan keberlanjutan di
        masa depan.”
      </div>
      <div className="relative group col-span-2 md:col-span-1 flex justify-center items-end">
        <img src={Image} alt="" />
        <div className="absolute text-center bottom-0 transform w-full bg-white/30 backdrop-blur-md border-2 border-blue-800 rounded-4xl p-3 lg:p-8">
          <h1 className="font-bold text-2xl lg:text-3xl text-white text-shadow-black text-shadow-sm">
            CEO
          </h1>
          <p className="text-xl lg:text-2xl text-white text-shadow-black text-shadow-sm">
            Puguh Mahendrodjati
          </p>
        </div>
      </div>
    </div>
  );
}
