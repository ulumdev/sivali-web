// src/components/Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../new-components/Sidebar";
import Topbar from "../new-components/Topbar";

export default function Layout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // return (
  //   <div className="flex h-screen overflow-hidden">
  //     <Sidebar />
  //     <div className="flex-1 flex flex-col">
  //       <Topbar />
  //       <main className="flex-1 p-6 overflow-auto bg-white">
  //         <Outlet /> {/* tempat render halaman sesuai route */}
  //       </main>
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-screen bg-white">
      {/* Mobile sidebar (drawer) */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          sidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        {/* drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white border-r shadow-lg transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex h-full overflow-hidden">
        <aside className="hidden md:flex w-64 border-r bg-white">
          <Sidebar onNavigate={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-white">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
