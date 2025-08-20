// import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Home",
    "/job-posting/active": "Job Posting - Active",
    "/job-posting/draft": "Job Posting - Draft",
    "/job-posting/expired": "Job Posting - Expired",
    "/attendance": "Attendance",
    "/transaction": "Transaction",
  };

  // cari title berdasarkan pathname, default = "Dashboard"
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-20 bg-white flex items-center justify-between px-6 border-b">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Bell size={18} />
        </button>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img src="/images/avatar.png" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <div className="text-right">
            <div className="text-sm font-medium">Dimas Zelo</div>
            <div className="text-xs text-gray-500">usermail@gmail.com</div>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
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
