import { Bell, ChevronDown, Download } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b bg-white">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Home</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Filter & Export */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
            Last month
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Dimas Zelo</p>
            <p className="text-xs text-gray-500">usermail@gmail.com</p>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
