// src/components/Header.tsx
export default function Header() {
    return (
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Home / Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">Filter</button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Export</button>
        </div>
      </header>
    );
  }
  