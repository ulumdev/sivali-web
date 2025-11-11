import TopJobChart from "../new-components/TopJobChart";
import CardStat from "../new-components/CardStat";
import BalanceCard from "../new-components/BalanceCard";
import { Filter, DownloadCloud } from "lucide-react";

export default function DashboardCompany() {
  const jobData = [
    { name: "Bartender", value: 450 },
    { name: "UI Designer", value: 410 },
    { name: "Room Attendance", value: 390 },
  ];

  return (
    <>
      {/* Row 1: filter bulan & export */}
      <div className="flex flex-col sm:flex-row sm:justify-end mb-4 gap-3">
        <div className="flex items-center gap-3">
          {/* Dropdown Status dengan icon Filter */}
          <div className="relative">
            <select
              value=""
              className="appearance-none pr-10 pl-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Last month</option>
              <option>This month</option>
              <option>Last 3 months</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
            <span>Export</span>
            <DownloadCloud className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2: Chart + CardStat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        {/* Chart (col-span-2 di desktop) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border h-[360px]">
          <TopJobChart
            data={jobData}
            value={140}
            percentage={14}
            isIncrease={false}
          />
        </div>

        {/* Card Stats (stack in mobile, column in desktop) */}
        <div className="flex flex-col gap-6">
          <CardStat
            title="Pekerja Aktif"
            value="410"
            percentage={14}
            isIncrease
          />
          <CardStat
            title="Job Posting Aktif"
            value="178"
            percentage={7}
            isIncrease={false}
          />
        </div>
      </div>

      {/* Row 3: Balance + Expense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard title="Balance" amount={6000000} isIncrease />
        <BalanceCard title="Expense" amount={4000000} isIncrease={false} />
      </div>
    </>
  );
}
