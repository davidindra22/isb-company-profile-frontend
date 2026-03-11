import React from "react";
import Button from "../Button";
import Image from "../../assets/hero.jpg";

export default function Hero() {
  return (
    <header
      className="min-h-screen flex flex-col justify-center overflow-hidden px-(--pxmobile) md:px-(--px) bg-gray-400"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="font-bold text-3xl lg:text-6xl uppercase text-white">
          Mengidentifikasi Risiko, Menjaga Keselamatan
        </div>
        <div className="subheading w-full lg:w-1/2 !text-white">
          Kami bantu Anda mengungkap potensi bahaya sebelum menjadi ancaman
          nyata melalui analisis HAZID dan HAZOP yang sistematis dan terpercaya.
        </div>
        <Button
          onClick={() =>
            document
              .getElementById("company")
              .scrollIntoView({ behavior: "smooth" })
          }
          width="w-38 md:w-48"
          fontSize="text-sm md:text-lg"
        >
          Jelajahi Sekarang
        </Button>
      </div>
    </header>
  );
}
