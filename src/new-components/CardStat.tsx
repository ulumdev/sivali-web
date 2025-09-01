// import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";

interface Props {
  title: string;
  value: string;
  percentage: number;
  isIncrease: boolean;
}

export default function CardStat({
  title,
  value,
  percentage,
  isIncrease,
}: Props) {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-4xl font-bold">{value}</div>
      </div>
      <div className="flex items-center mb-2 gap-2">
        <div className="flex items-center gap-2 text-sm">
          {isIncrease ? (
            <ArrowUp size={16} className="text-green-500" />
          ) : (
            <ArrowDown size={16} className="text-red-500" />
          )}
          <span
            className={clsx(
              "font-semibold",
              isIncrease ? "text-green-600" : "text-red-600"
            )}
          >
            {percentage}%
          </span>
        </div>
        <div className="text-xs text-gray-400">from last month</div>
      </div>
    </div>
  );
}
