import React from "react";
import Headers from "../components/Headers";
import Image from "../assets/company_members.jpg";
import { Layanan } from "../data";

// icons
import { PiPhoneCallFill } from "react-icons/pi";

function Layanankami() {
  const SliceLayanan1 = Layanan.filter((item) => item.id >= 1 && item.id <= 5);
  const SliceLayanan2 = Layanan.filter((item) => item.id >= 6 && item.id <= 11);
  return (
    <main>
      <Headers>Layanan kami</Headers>
      <div id="company" className="flex flex-col">
        <div className="md:grid md:grid-cols-2 my-8 md:my-15">
          <div className="flex flex-col gap-2.5 p-(--pxmobile) md:p-8 lg:p-(--px)">
            <p className="heading">Risk Management</p>
            {SliceLayanan1.map((item, index) => (
              <p key={index} className="subheading">
                {index + 1}. {item.title}
              </p>
            ))}
          </div>
          <div className=" relative mx-auto rounded-xl bg-gradient-to-tl from-blue-800 to-pink-200 p-2.5">
            <img
              src={Image}
              alt=""
              className="h-full w-2xl object-cover rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 my-8 md:mb-15">
          <div className=" relative mx-auto rounded-xl bg-gradient-to-tl from-blue-800 to-pink-200 p-2.5">
            <img
              src={Image}
              alt=""
              className="h-full w-2xl object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2.5 p-(--pxmobile) md:p-8 lg:p-(--px)">
            <p className="heading">Process & Process Safety Engineering</p>
            {SliceLayanan2.map((item, index) => (
              <p key={index} className="subheading">
                {index + 1}. {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 place-items-center rounded-3xl h-auto mx-3 lg:mx-8 py-4 md:py-10 lg:py-25 px-8 md:px-20 lg:px-56 my-8 md:mb-15"
        style={{
          backgroundColor: "rgb(30, 58, 138)",
          backgroundImage:
            "radial-gradient(at 0% 0%, rgb(147, 51, 234) 0, transparent 68%), radial-gradient(at 100% 100%, rgb(29, 78, 216) 0, transparent 39%)",
        }}
      >
        <p className="col-span-2 text-white font-bold text-base text-center md:text-start md:text-3xl lg:text-4xl">
          Let’s collaborate and build something amazing together.
        </p>
        <button
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2.5 
             overflow-hidden w-auto py-2 px-4 rounded-full
             text-center text-white font-semibold"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-900 transition-opacity duration-300 ease-in-out"></span>
          <span className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-700 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
          <div className="relative flex flex-row items-center gap-2.5 z-10">
            <p className="text-sm md:text-base lg:text-xl">Schedule a call</p>{" "}
            <PiPhoneCallFill />
          </div>
        </button>
      </div>
    </main>
  );
}

export default Layanankami;
