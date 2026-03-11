import React from "react";

export default function BeritaCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
