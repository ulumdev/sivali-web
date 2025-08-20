// import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, Calendar, FileText, LogOut, ChevronUp, ChevronDown } from "lucide-react";
import Swal from "sweetalert2";

export default function Sidebar() {

  const [openJobPosting, setOpenJobPosting] = useState(false);

  const menu = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    {
      name: "Job Posting",
      icon: <Briefcase size={18} />,
      path: "/job-posting",
      children: [
        { name: "Active", path: "/job-posting/active" },
        { name: "Draft", path: "/job-posting/draft" },
        { name: "Expired", path: "/job-posting/expired" }
      ],
    },
    {
      name: "List Attendance",
      icon: <Calendar size={18} />,
      path: "/attendance",
    },
    {
      name: "List Transaction",
      icon: <FileText size={18} />,
      path: "/transaction",
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // refresh + redirect
      }
    });
  };

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6 border-b h-20">
        <img src="/images/logo.png" alt="Logo" className="h-8 object-contain" />
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenJobPosting(!openJobPosting)}
                    className="flex items-center justify-between w-full px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center gap-3">
                      {item.icon} {item.name}
                    </span>
                    {openJobPosting ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {openJobPosting && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-3 py-1.5 rounded-md text-sm text-start ${
                                isActive
                                  ? "bg-indigo-50 text-indigo-700"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon} {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}