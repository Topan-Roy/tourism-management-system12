import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import TourNest from "../TourNest/TourNest";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
   const { role, roleLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => { })
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
          to="/communitypage"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold underline" : "hover:text-primary"
          }
        >
          Community
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-trips"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold underline" : "hover:text-primary"
          }
        >
          All Trips
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageprofile"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold underline" : "hover:text-primary"
          }
        >
         Guide Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold underline" : "hover:text-primary"
          }
        >
          About us
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
            Tourist Dashboard
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink
            to="/tourist-dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold underline" : "hover:text-primary"
            }
          >
           Guide Dashboard 
          </NavLink>
        </li>
      )}
      {!roleLoading && role === 'admin' && (
        <li>
          <NavLink
            to="/dashboard-admin"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold underline" : "hover:text-primary"
            }
          >
           Admin Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-2 md:px-6 sticky top-0 z-50">
      <div className="navbar-start">
        <TourNest></TourNest>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1  font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center ">
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
