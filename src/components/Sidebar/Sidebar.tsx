// import { Home, Briefcase, Calendar, FileText, LogOut } from 'lucide-react'
// import SidebarItem from './SidebarItem'

// const Sidebar = () => {
//   return (
//     <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
//       {/* Logo */}
//       <div>
//         <div className="mb-8">
//           <img src="/logo.png" alt="Talent Match Logo" className="h-10" />
//         </div>

//         {/* Menu Items */}
//         <nav className="flex flex-col gap-2">
//           <SidebarItem icon={Home} label="Home" active />
//           <SidebarItem icon={Briefcase} label="Job Posting" />
//           <SidebarItem icon={Calendar} label="List Attendance" />
//           <SidebarItem icon={FileText} label="List Transaction" />
//         </nav>
//       </div>

//       {/* Logout */}
//       <div className="pt-4 border-t">
//         <SidebarItem icon={LogOut} label="Logout" />
//       </div>
//     </aside>
//   )
// }

// export default Sidebar

// src/components/Sidebar.tsx
import { Home, BarChart2, User, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="p-6 font-bold text-xl border-b">Company Logo</div>
      <nav className="flex-1 p-4 space-y-3">
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <BarChart2 size={20} /> Reports
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <User size={20} /> Employees
        </a>
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
