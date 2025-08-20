import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import TourNest from "../TourNest/TourNest";
import useUserRole from "../../hooks/useUserRole";
import { useDarkMode } from "../../Contexts/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { role, roleLoading } = useUserRole();
  const { darkmode, setDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser().catch((err) => console.log(err));
  };

  // ✅ 5 Routes for everyone (Logged Out & Logged In)
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold underline" : "hover:text-yellow-400"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-trips" className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold underline" : "hover:text-yellow-400"}>
          All Trips
        </NavLink>
      </li>
      <li>
        <NavLink to="/communitypage" className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold underline" : "hover:text-yellow-400"}>
          Community
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold underline" : "hover:text-yellow-400"}>
          About Us
        </NavLink>
      </li>
      
    </>
  );

  // ✅ Dashboard Dropdown (only Logged In)
  const dashboardDropdown = (
    <li tabIndex={0} className="relative">
      <details>
        <summary className="cursor-pointer hover:text-yellow-400">Dashboard</summary>
        <ul className="absolute mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg w-48 z-50">
          <li>
            <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              Tourist Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tourist-dashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              Guide Dashboard
            </NavLink>
          </li>
          {!roleLoading && role === "admin" && (
            <li>
              <NavLink to="/dashboard-admin" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                Admin Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </details>
    </li>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        darkmode ? "bg-gray-900 text-white" : "bg-[#07b8f3] text-white"
      }`}
    >
      <div className="px-6 flex justify-between items-center  py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <TourNest />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          <ul className="flex gap-6 items-center">
            {navLinks}
            {user && dashboardDropdown}
          </ul>
        </div>

        {/* Right Side */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkmode)}
            className="text-xl hover:scale-110 transition "
            title="Toggle Theme"
          >
            {darkmode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL}
                alt="user"
                className="w-8 h-8 rounded-full border"
              />
              <span className="hidden md:inline">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-2 py-1 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          {isOpen && (
            <ul
              className={`absolute top-14 left-0 w-full px-6 py-4 shadow-lg flex flex-col gap-2 font-semibold ${
                darkmode ? "bg-gray-900 text-white" : "bg-yellow-600 text-white"
              }`}
            >
              {navLinks}
              {user && dashboardDropdown}
              <li>
                <button
                  onClick={() => setDarkMode(!darkmode)}
                  className="btn btn-sm w-full flex items-center gap-2"
                >
                  {darkmode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-red-600 text-white w-full"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="btn btn-sm btn-neutral text-white w-full"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
