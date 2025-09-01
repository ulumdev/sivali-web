// import React from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type TopbarProps = {
  onOpenSidebar?: () => void;
};

export default function Topbar({ onOpenSidebar }: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Home",
    "/job-posting/active": "Job Posting - Active",
    "/job-posting/draft": "Job Posting - Draft",
    "/job-posting/expired": "Job Posting - Expired",
    "/attendance": "Attendance",
    "/transaction": "Transaction",
    "/profile": "Profile"
  };

  // cari title berdasarkan pathname, default = "Dashboard"
  const title = pageTitles[location.pathname] || "Dashboard";

  // return (
  //   <header className="h-20 bg-white flex items-center justify-between px-6 border-b">
  //     <div>
  //       <h2 className="text-lg font-semibold">{title}</h2>
  //     </div>

  //     <div className="flex items-center gap-4">
  //       <button className="p-2 rounded-md hover:bg-gray-100">
  //         <Bell size={18} />
  //       </button>
  //       <div
  //         className="flex items-center gap-3 cursor-pointer"
  //         onClick={() => navigate("/profile")}
  //       >
  //         <img src="/images/avatar.png" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
  //         <div className="text-right">
  //           <div className="text-sm font-medium">Dimas Zelo</div>
  //           <div className="text-xs text-gray-500">usermail@gmail.com</div>
  //         </div>
  //         <ChevronDown size={16} className="text-gray-500" />
  //       </div>
  //     </div>
  //   </header>
  // );

  return (
    <header className="h-16 md:h-20 bg-white flex items-center justify-between px-4 md:px-6 border-b sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base md:text-lg font-semibold truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Bell size={18} />
        </button>

        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            src="/images/avatar.png"
            alt="avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
          {/* Sembunyikan detail di layar kecil */}
          <div className="text-right hidden sm:block">
            <div className="text-xs md:text-sm font-medium">Dimas Zelo</div>
            <div className="text-[10px] md:text-xs text-gray-500">
              usermail@gmail.com
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

// export default function Topbar() {
//   return (
//     <header className="h-20 bg-white flex items-center justify-between px-6 border-b">
//       <div>
//         <h2 className="text-lg font-semibold">Home</h2>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="p-2 rounded-md hover:bg-gray-100">
//           <Bell size={18} />
//         </button>
//         <div className="flex items-center gap-3">
//           <img src="/images/avatar.png" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
//           <div className="text-right">
//             <div className="text-sm font-medium">Dimas Zelo</div>
//             <div className="text-xs text-gray-500">usermail@gmail.com</div>
//           </div>
//           <ChevronDown size={16} className="text-gray-500" />
//         </div>

//         {/* User Info */}
//         {/* <div className="flex items-center gap-3">
//           <img
//             src="/images/avatar.png"
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div className="text-right">
//             <p className="text-sm font-semibold text-gray-800">Dimas Zelo</p>
//             <p className="text-xs text-gray-500">usermail@gmail.com</p>
//           </div>
//           <ChevronDown size={16} className="text-gray-500" />
//         </div> */}
//       </div>
//     </header>
//   );
// }
