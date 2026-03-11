import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

import image from "../../assets/logo-dashboard.png";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(
        "/api/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/employee/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div
        className="h-screen w-screen flex justify-center items-center"
        style={{
          backgroundColor: "rgb(30, 58, 138)",
          backgroundImage:
            "radial-gradient(at 0% 0%, rgb(147, 51, 234) 0, transparent 68%), radial-gradient(at 100% 100%, rgb(29, 78, 216) 0, transparent 39%)",
        }}
      >
        <div className=" bg-white w-3/4 md:w-2/3 lg:w-1/3 rounded-xl py-8 px-6">
          <div className="w-full flex justify-center mb-4">
            <img src={image} alt="logo" className="w-25 " />
          </div>
          <h1 className="uppercase text-center font-bold">welcome back</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="" className="capitalize">
                username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <br />
            <div className="flex flex-col">
              <label htmlFor="" className="capitalize">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <br />
            {/* Tampilkan pesan error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded text-sm">
                {error}
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-400 rounded-lg w-full duration-300 text-white p-2 mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
