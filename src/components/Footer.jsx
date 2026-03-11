import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const DataCompany = {
  picture: Image,
  address: "Ruko Freshmarket Cikunir ( Kadatuan Koffie ) Blok I.2 No.1",
  phone: "+62 888 888 888",
  email: "IndonesiaSuksesBersaudara@gmail.com",
};

export default function Footer() {
  return (
    <footer className="bg-(--color-primary) text-white px-(--pxmobile) md:px-(--px) py-10">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2.5 pb-5">
          <Link as={Link} to="/" className="no-style">
            <img src={DataCompany.picture} alt="" />
          </Link>
          <div className="*:hover:underline *:cursor-pointer">
            <p>{DataCompany.address}</p>
            <p>
              <a href={`https://wa.me/${DataCompany.phone}`}>
                {DataCompany.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${DataCompany.email}`}>{DataCompany.email}</a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-25">
          <div className="flex flex-col *:hover:underline *:cursor-pointer">
            <h5 className="text-lg font-semibold mb-3">Our Website</h5>
            <a href="" className="sitemap">
              Beranda
            </a>
            <a href="" className="sitemap">
              Tentang Kami
            </a>
            <a href="" className="sitemap">
              Layanan Kami
            </a>
            <a href="" className="sitemap">
              Berita
            </a>
          </div>
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold mb-3">Socials</h5>
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
        </div>
      </div>
    </footer>
  );
}
