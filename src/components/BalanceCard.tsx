import { Wallet, ArrowDown } from 'lucide-react'
import clsx from 'clsx'

interface BalanceCardProps {
  title: string
  amount: number
  iconType: 'wallet' | 'arrow-down'
  color: 'blue' | 'red'
}

const BalanceCard: React.FC<BalanceCardProps> = ({ title, amount, iconType, color }) => {
  const Icon = iconType === 'wallet' ? Wallet : ArrowDown

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex items-center gap-4 w-full">
      {/* Icon Section */}
      <div
        className={clsx(
          'p-4 rounded-full',
          color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
        )}
      >
        <Icon size={28} />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">Rp {amount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default BalanceCard
