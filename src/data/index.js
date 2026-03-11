import Image from "../assets/company_members.jpg";

// icons
import { AiOutlineHome } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

export const navLinks = [
  {
    id: 1,
    path: "",
    text: "Beranda",
  },
  {
    id: 2,
    path: "tentangkami",
    text: "Tentang Kami",
  },
  {
    id: 3,
    path: "layanankami",
    text: "Layanan Kami",
    dropdown: [
      {
        text: "Semua layanan Kami",
        path: "#",
      },
      {
        text: "Partner",
        path: "#",
      },
    ],
  },
  {
    id: 4,
    path: "berita",
    text: "Berita",
  },
];

// export const Berita = [
//   {
//     id: 1,
//     title: "Pelatihan hazop pada perusahaan Pertamina di indonesia",
//     idSlug: "1-pelatihan-hazop-pada-perusahaan-pertamina-di-indonesia",
//     date: "2025-08-24",
//     image: Image,
//     desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",
//   },
//   {
//     id: 2,
//     title: "Pelatihan Hazip pada perusahaan Tambang di indonesia",
//     idSlug: "2-pelatihan-hazip-pada-perusahaan-tambang-di-indonesia",
//     date: "2025-08-25",
//     image: Image,
//     desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",
//   },
//   {
//     id: 3,
//     title: "Sertifikasi Internasional HAZOP untuk Profesional Industri",
//     idSlug: "3-sertifikasi-internasional-hazop-untuk-profesional-industri",
//     date: "2025-08-26",
//     image: Image,
//     desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",
//   },
//   {
//     id: 4,
//     title: "verifikasi dan validasi sistem keselamatan berbasis HAZOP",
//     idSlug: "4-verifikasi-dan-validasi-sistem-keselamatan-berbasis-hazop",
//     date: "2025-08-27",
//     image: Image,
//     desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",
//   },
//   {
//     id: 5,
//     title: "Studi Kasus: Implementasi HAZOP di Industri Kimia",
//     idSlug: "5-studi-kasus-implementasi-hazop-di-industri-kimia",
//     date: "2025-08-28",
//     image: Image,
//     desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",
//   },
// ];

export const Layanan = [
  { id: 1, title: "Process Safety Management Dev & Audit" },
  {
    id: 2,
    title: "Safety Studies : HAZID, HAZOP, SIL/LOPA, /LOPA, BOWTIE, SCE, etc",
  },
  { id: 3, title: "Consequence Modelling" },
  { id: 4, title: "RAM Study" },
  { id: 5, title: "Pre-Startup Safety Review (PSSR)" },
  { id: 6, title: "Independent Incident Investigation" },
  //
  { id: 7, title: "Process Design Engineering" },
  { id: 8, title: "Functional Safety Engineering" },
  { id: 9, title: "Technical Report" },
  { id: 10, title: "Feasibility Study" },
];

// Admin Dashboard
// export const MenuItems = [
//   { id: 1, title: "Dashboard", path: "/admin/dashboard", icon: AiOutlineHome },
//   {
//     id: 2,
//     title: "Berita",
//     path: "/admin/berita",
//     icon: IoNewspaperOutline,
//   },
//   { id: 3, title: "Layanan", path: "/admin/layanan", icon: MdSupportAgent },
// ];

// export const MenuEmployee = [
//   {
//     id: 1,
//     title: "Dashboard",
//     path: "/employee/dashboard",
//     icon: AiOutlineHome,
//   },
// ];

export const MENU = {
  admin: [
    {
      id: 1,
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: AiOutlineHome,
    },
    {
      id: 2,
      title: "Berita",
      path: "/admin/berita",
      icon: IoNewspaperOutline,
    },
    {
      id: 3,
      title: "Layanan",
      path: "/admin/layanan",
      icon: MdSupportAgent,
    },
    {
      id: 4,
      title: "Reimbursement",
      path: "/admin/reimbursement",
      icon: MdSupportAgent,
    },
    {
      id: 5,
      title: "Client",
      path: "/admin/client",
      icon: MdSupportAgent,
    },
  ],

  employee: [
    {
      id: 1,
      title: "Dashboard",
      path: "/employee/dashboard",
      icon: AiOutlineHome,
    },
    {
      id: 2,
      title: "Reimbursement",
      path: "/employee/reimbursement",
      icon: MdSupportAgent,
    },
  ],
};
