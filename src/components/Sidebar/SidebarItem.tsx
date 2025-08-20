import type { LucideIcon } from 'lucide-react'
import React from 'react'
import clsx from 'clsx'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active }) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-3 px-4 py-2 rounded-md transition-all w-full text-left',
        active ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'hover:bg-gray-100 text-gray-600'
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )
}

export default SidebarItem
