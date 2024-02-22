import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <main className="p-10">
      <div className="flex gap-6 border-b border-b-gray-700 mb-4">
        <NavLink
          to="personal-details"
          className={({ isActive }) =>
            isActive ? "border-b border-b-buttonBg p-4" : "p-4"
          }
        >
          Personal Details
        </NavLink>
        <NavLink
          to="education"
          className={({ isActive }) =>
            isActive ? "border-b border-b-buttonBg p-4" : "p-4"
          }
        >
          Education
        </NavLink>
        <NavLink
          to="projects"
          className={({ isActive }) =>
            isActive ? "border-b border-b-buttonBg p-4" : "p-4"
          }
        >
          Project Details
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileLayout;
