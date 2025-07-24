import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import TourNest from "../TourNest/TourNest";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const navLinks = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-primary font-bold underline" : "hover:text-primary"
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/ff"
        className={({ isActive }) =>
          isActive ? "text-primary font-bold underline" : "hover:text-primary"
        }
      >
        Tour Packages
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/stories"
        className={({ isActive }) =>
          isActive ? "text-primary font-bold underline" : "hover:text-primary"
        }
      >
        Travel Stories
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "text-primary font-bold underline" : "hover:text-primary"
        }
      >
        Contact
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold underline" : "hover:text-primary"
          }
        >
          Dashboard
        </NavLink>
      </li>
    )}
  </>
);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10 sticky top-0 z-50">
      <div className="navbar-start">
       <TourNest></TourNest>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <img src={user?.photoURL} alt="user" className="w-8 h-8 rounded-full border" />
            <span className="hidden md:inline">{user.displayName}</span>
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white ml-2">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-neutral text-white">Login</Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {isOpen && (
          <ul className="absolute top-16 left-0 bg-base-100 w-full px-4 py-4 shadow menu gap-2 z-40 font-semibold">
            {navLinks}
            {user ? (
              <li><button onClick={handleLogout} className="btn btn-sm btn-error text-white">Logout</button></li>
            ) : (
              <li><Link to="/login" className="btn btn-sm btn-neutral text-white">Login</Link></li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
