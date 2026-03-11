import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Siderbar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token, user]);

  if (!user) return null;
  return (
    <div className="flex min-h-screen bg-[#f8fafd]">
      <Siderbar open={open} role={user.role} />
      <div className="flex flex-col w-full">
        <Navbar open={open} setOpen={setOpen} user={user} />
        <main className="p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
