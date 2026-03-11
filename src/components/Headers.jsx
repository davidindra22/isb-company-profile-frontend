import React from "react";
import Image from "../assets/bg-font.jpg";

export default function Headers({ children }) {
  return (
    <header className="min-h-[300px] md:min-h-[477px] flex justify-center items-center overflow-hidden px-(--pxmobile) md:px-(--px) bg-(--color-bg-header) ">
      <h1
        className="font-extrabold text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl uppercase bg-clip-text text-transparent"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </h1>
    </header>
  );
}
