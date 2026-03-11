import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// icons
import { LuMenu } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import BeritaAdmin from "../../pages/dashboard/admin/BeritaAdmin";

// api
import api from "../../../axios";

export default function Navbar({ open, setOpen, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await api.post("/api/auth/logout");

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShow(true);
        setTimeout(() => {
          setShow(false);
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-(--color-primary) shadow-md w-full">
      <div className="px-4 md:px-7 py-3 flex justify-between items-center">
        <LuMenu
          onClick={() => setOpen(!open)}
          className={`w-7 h-7 cursor-pointer text-white`}
        />
        <div ref={menuRef} className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CgProfile className="w-7 h-7 text-white" />
            <p className="text-white">{user.username}</p>
          </div>

          {isOpen && (
            <button
              onClick={handleLogout}
              className="absolute right-0 mt-2 bg-white shadow rounded w-40 px-4 py-2 text-left hover:bg-gray-100 hover:rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          )}
        </div>
        {show && (
          <div className="fixed top-5 right-5 z-50 bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-lg text-sm">
            Logout successful! Redirecting to login...
          </div>
        )}
      </div>
    </nav>
  );
}
