import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layout/ClientLayout";
import DashboardLayout from "../layout/DashboardLayout";

import Home from "../pages/Home";
import Berita from "../pages/Berita";
import Layanankami from "../pages/Layanankami";
import Tentangkami from "../pages/Tentangkami";
import DetailBerita from "../pages/DetailBerita";

// admin pages
import DashboardAdmin from "../pages/dashboard/admin/Dashboard";
import BeritaAdmin from "../pages/dashboard/admin/BeritaAdmin";
import LayananAdmin from "../pages/dashboard/admin/LayananAdmin";
import ReimbursementAdmin from "../pages/dashboard/admin/ReimbursementAdmin";
import ClientAdmin from "../pages/dashboard/admin/ClientAdmin";

// employee pages
import DashboardEmployee from "../pages/dashboard/employee/Dashboard";
import Reimbursement from "../pages/dashboard/employee/Reimbursement";

import Login from "../pages/dashboard/Login";
import ProtectedRoute from "../layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <ClientLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tentangkami", element: <Tentangkami /> },
      { path: "/layanankami", element: <Layanankami /> },
      { path: "/berita", element: <Berita /> },
      { path: "/berita/:idSlug", element: <DetailBerita /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardAdmin /> },
          { path: "berita", element: <BeritaAdmin /> },
          { path: "layanan", element: <LayananAdmin /> },
          { path: "reimbursement", element: <ReimbursementAdmin /> },
          { path: "client", element: <ClientAdmin /> },
        ],
      },
    ],
  },
  {
    path: "/employee",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardEmployee /> },
          { path: "reimbursement", element: <Reimbursement /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
