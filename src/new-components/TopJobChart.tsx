// import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";

interface Job {
    name: string;
    value: number;
}

interface Props {
    data: Job[];
    value: number; // Assuming this is the value to display in the header
    percentage: number;
    isIncrease: boolean;
}
  
export default function TopJobChart({ data, value, percentage, isIncrease }: Props) {
    const top3Data = data.slice(0, 3);
  
    return (
      <div className="bg-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Top 10 Job Roles</h3>
          {/* <span className="text-sm text-gray-500">This month</span> */}
        </div>
  
        {/* Percentage change */}
        <div className="flex items-center gap-2 text-sm mb-2">
        <div className="text-4xl font-bold">{value}</div>
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
          <div className="text-xs text-gray-400">from last month</div>
        </div>
  
        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top3Data}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              barSize={200}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis type="number" axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(37,99,235,0.1)" }}
                formatter={(value: number) => [`${value}`, "Applicants"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#2563EB">
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{ fill: "#111827", fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
