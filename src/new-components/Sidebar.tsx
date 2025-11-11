import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Calendar,
  FileText,
  LogOut,
  ChevronUp,
  ChevronDown,
  Building2,
  Users,
} from "lucide-react";
import Swal from "sweetalert2";

type SidebarProps = {
  onNavigate: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();
  const [openJobPosting, setOpenJobPosting] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

  const role = localStorage.getItem("role"); 

  // cek lokasi URL, kalau ada path tertentu maka buka submenu otomatis
  useEffect(() => {
    if (location.pathname.startsWith("/job-posting") || location.pathname.startsWith("/internal/job-posting")) {
      setOpenJobPosting(true);
    } else {
      setOpenJobPosting(false);
    }

    if (location.pathname.startsWith("/internal/companies")) {
      setOpenCompanies(true);
    } else {
      setOpenCompanies(false);
    }

    if (location.pathname.startsWith("/internal/employees")) {
      setOpenEmployees(true);
    } else {
      setOpenEmployees(false);
    }

    if (location.pathname.startsWith("/internal/transaction")) {
      setOpenTransaction(true);
    } else {
      setOpenTransaction(false);
    }
  }, [location.pathname]);

  const companyMenu = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    {
      name: "Job Posting",
      icon: <Briefcase size={18} />,
      path: "/job-posting",
      children: [
        { name: "Active", path: "/job-posting/active" },
        { name: "Draft", path: "/job-posting/draft" },
        { name: "Expired", path: "/job-posting/expired" },
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

  const internalMenu = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    {
      name: "Job Posting",
      icon: <Briefcase size={18} />,
      path: "internal/job-posting",
      children: [
        { name: "Active", path: "internal/job-posting/active" },
        // { name: "Draft", path: "internal/job-posting/draft" },
        { name: "Expired", path: "internal/job-posting/expired" },
      ],
    },
    {
      name: "List Company",
      icon: <Building2 size={18} />,
      path: "internal/companies",
      children: [
        { name: "Registered", path: "internal/companies/registered" },
        { name: "Verified", path: "internal/companies/verified" },
        { name: "Blocked", path: "internal/companies/blocked" },
      ],
    },
    {
      name: "List Employee",
      icon: <Users size={18} />,
      path: "internal/employees",
      children: [
        { name: "Registered", path: "internal/employees/registered" },
        { name: "Verified", path: "internal/employees/verified" },
        { name: "Suspended", path: "internal/employees/suspended" },
        { name: "Blocked", path: "internal/employees/blocked" },
      ],
    },
    {
      name: "List Transaction",
      icon: <FileText size={18} />,
      path: "internal/transaction",
      children: [
        { name: "Top Up", path: "internal/transaction/top-up" },
        { name: "Payroll", path: "internal/transaction/payroll" },
        { name: "History", path: "internal/transaction/history" },
      ],
    },
    {
      name: "List Job Role",
      icon: <Briefcase size={18} />,
      path: "internal/job-roles"
    },
    {
      name: "List Banner",
      icon: <FileText size={18} />,
      path: "internal/banners"
    }
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
        localStorage.removeItem("role");
        window.location.href = "/login";
      }
    });
  };

  const menu = role === "internal" ? internalMenu : companyMenu;

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6 border-b h-20">
        <img src="/images/logo.png" alt="Logo" className="h-8 object-contain" />
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {menu.map((item) => {
            // Tentukan state mana yang dipakai untuk setiap menu
            let isOpen = false;
            let toggleOpen = () => {};

            if (item.path?.includes("job-posting")) {
              isOpen = openJobPosting;
              toggleOpen = () => setOpenJobPosting(!openJobPosting);
            } else if (item.path?.includes("companies")) {
              isOpen = openCompanies;
              toggleOpen = () => setOpenCompanies(!openCompanies);
            } else if (item.path?.includes("employees")) {
              isOpen = openEmployees;
              toggleOpen = () => setOpenEmployees(!openEmployees);
            } else if (item.path?.includes("transaction")) {
              isOpen = openTransaction;
              toggleOpen = () => setOpenTransaction(!openTransaction);
            }

            return (
              <li key={item.name}>
                {item.children ? (
                  <>
                    <button
                      onClick={toggleOpen}
                      className="flex items-center justify-between w-full px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span className="flex items-center gap-3">
                        {item.icon} {item.name}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {isOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <NavLink
                              to={child.path}
                              onClick={onNavigate}
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
                    onClick={onNavigate}
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
            );
          })}
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
