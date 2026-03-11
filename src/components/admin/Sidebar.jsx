import { MENU } from "../../data";
import Image from "../../assets/logo-dashboard.png";

// icons
import { LuMenu } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function Siderbar({ open }) {
  //   const [open, setOpen] = React.useState(true);
  // const role = "admin"; // contoh role, bisa diambil dari context atau props

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  if (!role) return null;

  const menus = MENU[role] || [];

  return (
    // sidebar
    <div
      className={`${
        open ? "w-72" : "hidden md:w-20 md:block"
      } bg-(--color-primary) h-auto p-3 md:p-5 pt-1 md:pt-5 relative duration-300`}
    >
      <div className="flex flex-col items-center">
        <img
          src={Image}
          alt="logo"
          className={`${!open ? "h-10" : "h-20"} cursor-pointer object-cover`}
        />
      </div>
      <div className="flex flex-col gap-x-4">
        <div className="flex gap-x-4">
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {menus.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 ${
                  item.id === 0 && "bg-light-white"
                } ${
                  isActive && item.path
                    ? "bg-blue-100 text-blue-600"
                    : isActive
                      ? "bg-white text-(--color-secondary)"
                      : "hover:text-(--color-secondary) text-gray-300"
                }`
              }
            >
              <span
                className={`${
                  !open && "hidden md:flex"
                } text-2xl block float-left`}
              >
                <item.icon />
              </span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {item.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
