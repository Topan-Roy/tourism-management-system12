import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

import {
   FaHome, FaUserEdit, FaUserShield,
  FaPlusCircle, FaBook, FaClipboardList, FaRegNewspaper, FaGlobeAsia,
  FaTimes,
  FaBars
} from 'react-icons/fa';

import TourNest from '../Shared/TourNest/TourNest';

const DashboardLayout = () => {
   const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const checkbox = document.getElementById("my-drawer-2");
    if (checkbox) checkbox.checked = !checkbox.checked;
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 lg:hidden px-4">
          <div className="flex-none">
            <button onClick={handleToggle} className="btn btn-square btn-ghost text-xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="flex-1 text-xl font-semibold ">
            Dashboard
          </div>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          <TourNest></TourNest>

          <li>
            <NavLink to="/dashboard">
              <FaHome className="mr-2" /> Dashboard Home
            </NavLink>
          </li>

        
            <>
              <li>
                <NavLink to="/dashboard/my-bookings">
                  <FaClipboardList className="mr-2" /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-story">
                  <FaRegNewspaper className="mr-2" /> My Story
                </NavLink>
              </li>
            </>
         

        
            <>
              <li>
                <NavLink to="/dashboard/add-story">
                  <FaPlusCircle className="mr-2" /> Add Story
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/apply-as-guide">
                  <FaGlobeAsia className="mr-2" /> My Assigned Tours
                </NavLink>
              </li>
            </>
         

          
            <>
              <li>
                <NavLink to="/dashboard/add-package">
                  <FaPlusCircle className="mr-2" /> Add Package
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaBook className="mr-2" /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-stories">
                  <FaRegNewspaper className="mr-2" /> All Tourist Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <FaUserShield className="mr-2" /> Manage Users
                </NavLink>
              </li>
            </>
        

          {/* Shared route */}
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit className="mr-2" /> Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
