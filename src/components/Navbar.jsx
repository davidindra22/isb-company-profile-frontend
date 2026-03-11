import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data";
import Image from "../assets/logo.png";

// icons
import { LuMenu, LuX } from "react-icons/lu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const collapseRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false); // otomatis tutup kalau klik menu di mobile
  };

  // klik di luar → tutup menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-(--color-primary) shadow-md w-full z-50 ${isSticky ? "sticky top-0 left-0" : "relative"}`}
    >
      <div className="px-(--pxmobile) md:px-(--px) py-3 flex items-center justify-between">
        {/* Logo */}
        <Link as={Link} to="/" className="text-xl font-bold text-gray-800">
          <img src={Image} alt="" />
        </Link>

        {/* Toggle button (mobile only) */}
        <button
          className="lg:hidden text-white text-3xl focus:outline-none"
          onClick={handleToggle}
        >
          {isOpen ? <LuX /> : <LuMenu />}
        </button>

        {/* Nav menu */}
        <div
          ref={collapseRef}
          className={`absolute top-full left-0 w-full shadow-md
  transition-all duration-300 ease-in-out
  ${
    isOpen
      ? "opacity-100 translate-y-0 visible"
      : "opacity-0 -translate-y-3 invisible"
  }
  lg:static lg:opacity-100 lg:visible lg:translate-y-0 lg:block lg:w-auto lg:shadow-none`}
        >
          <nav className="flex flex-col items-center bg-(--color-primary) lg:flex-row lg:space-x-6 text-white gap-4 lg:gap-0">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) =>
                    `py-2 px-4 font-medium transition-colors rounded-lg
                     ${
                       isActive && link.path === "/"
                         ? "bg-blue-100 text-blue-600"
                         : isActive
                           ? "bg-white text-(--color-secondary)"
                           : "hover:text-(--color-secondary)"
                     }`
                  }
                  end
                  onClick={handleMenuClick}
                >
                  {link.text}
                </NavLink>
                {link.dropdown && (
                  <div
                    className="absolute flex flex-col opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
              bg-white text-gray-800 mt-2 rounded shadow-lg min-w-44 
              transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto"
                  >
                    {link.dropdown.map((sub, j) => (
                      <NavLink
                        href={sub.link}
                        key={j}
                        className="blok font-medium p-2 hover:text-(--color-secondary) transition-colors"
                      >
                        {sub.text}
                        <div className="border-1 border-blue-900 "></div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
}
