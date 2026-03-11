import React from "react";
import { Link } from "react-router-dom";

// components
import Button from "../Button";

// asset images
import Image from "../../assets/company_members.jpg";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

export default function Company() {
  return (
    <div id="company" className="flex flex-col gap-8 md:gap-0">
      <div className="md:grid md:grid-cols-2">
        <div className="flex flex-col gap-2.5 p-(--pxmobile) md:p-8 lg:p-(--px)">
          <p className="subheading-2">Who We Are</p>
          <p className="heading">profil perusahaan</p>
          <p className="subheading">
            Perusahaan ini dibangun pada 20 Januari 2024, dengan tujuan
            Konsultan Engineering menyediakan layanan identifikasi dan analisis
            risiko HAZID dan HAZOP yang profesional, akurat, dan berstandar
            internasional untuk industri kritis.
          </p>
          <Link to="/tentangkami">
            <Button width="w-auto">
              Learn More <FaArrowRightLong />
            </Button>
          </Link>
        </div>
        <img src={Image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-2">
        <img src={Image} alt="" className="h-full w-full object-cover" />
        <div className="flex flex-col gap-2.5 p-(--pxmobile) md:p-8 lg:p-(--px)">
          <p className="subheading-2">Our Service</p>
          <p className="heading">mengapa memilih kami</p>
          <p className="subheading">
            Kami menggabungkan pengalaman, pendekatan sistematis, dan metodologi
            HAZID serta HAZOP yang terstandarisasi untuk membantu Anda mengelola
            risiko secara efektif dan berkelanjutan. Dengan tim ahli
            berpengalaman, kami memastikan setiap potensi bahaya teridentifikasi
            secara akurat demi mendukung operasional industri yang aman dan
            efisien.
          </p>
          <Link to="/layanankami">
            <Button width="w-auto">
              Learn More <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
