// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../new-components/Sidebar";
import Topbar from "../new-components/Topbar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto bg-white">
          <Outlet /> {/* tempat render halaman sesuai route */}
        </main>
      </div>
    </div>
  );
}
