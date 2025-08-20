// import { ArrowDown, ArrowUp } from 'lucide-react'
// import clsx from 'clsx'

// interface CardStatProps {
//   title: string
//   value: number
//   percentage: number
//   isIncrease: boolean
// }

// const CardStat: React.FC<CardStatProps> = ({ title, value, percentage, isIncrease }) => {
//   return (
//     <div className="border rounded-lg p-4 bg-white w-full shadow-sm">
//       <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
//       <div className="text-3xl font-bold text-gray-800">{value}</div>
//       <div className="flex items-center text-sm mt-1">
//         {isIncrease ? (
//           <ArrowUp size={16} className="text-green-500 mr-1" />
//         ) : (
//           <ArrowDown size={16} className="text-red-500 mr-1" />
//         )}
//         <span
//           className={clsx(
//             'font-semibold',
//             isIncrease ? 'text-green-500' : 'text-red-500'
//           )}
//         >
//           {percentage}%
//         </span>
//         <span className="text-gray-400 ml-1">from last month</span>
//       </div>
//     </div>
//   )
// }

// export default CardStat

// src/components/CardStat.tsx
interface CardStatProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
  }
  
  export default function CardStat({ title, value, icon }: CardStatProps) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <div className="text-4xl text-blue-600">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    );
  }
  