// import React from "react";
import { Wallet } from "lucide-react";
import clsx from "clsx";

export default function BalanceCard({
  title,
  amount,
  isIncrease,
}: {
  title: string;
  amount: number;
  isIncrease?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border flex items-center gap-4">
      <div className={clsx("p-4 rounded-lg", title === "Balance" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600")}>
        <Wallet size={28} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold mt-1">Rp {amount.toLocaleString("id-ID")}</div>
        <div className={clsx("text-sm mt-1", isIncrease ? "text-green-600" : "text-red-600")}>
          {isIncrease ? "▲ 14% from last month" : "▼ 14% from last month"}
        </div>
      </div>
    </div>
  );
}
