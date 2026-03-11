import React from "react";

export default function Button({
  children,
  onClick,
  width = "w-40",
  fontSize = "text-sm",
}) {
  return (
    <button
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2.5 bg-(--color-secondary) hover:bg-(--bg-hover) 
                 transition-colors duration-300 ease-in-out 
                text-center text-white font-semibold 
                 py-2 px-4 rounded-xl ${width} ${fontSize}`}
    >
      {children}
    </button>
  );
}
