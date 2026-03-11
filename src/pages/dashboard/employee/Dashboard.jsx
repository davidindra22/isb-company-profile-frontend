import React from "react";

import BeritaCard from "../../../components/admin/cardAdmin/BeritaCard";
// import SidebarAdmin from "../../components/admin/SidebarAdmin";

export default function Dashboard() {
  const stats = [
    { id: 1, title: "Total Layanan", value: 1200, icon: "👤" },
    { id: 2, title: "Total Berita", value: 350, icon: "📰" },
    { id: 3, title: "Total Partner", value: 89, icon: "🛒" },
  ];

  return (
    <div className="flex flex-row gap-5">
      {/* <LayananCard /> */}
      {stats.map((stats) => (
        <BeritaCard key={stats.id} {...stats} />
      ))}
      {/* <PartnerCard /> */}
      <p>ini halaman employee</p>
    </div>
  );
}
