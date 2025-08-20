// src/components/ChartTopJobs.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { role: 'Developer', count: 120 },
  { role: 'Designer', count: 98 },
  { role: 'Manager', count: 85 },
];

export default function ChartTopJobs() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-80">
      <h2 className="text-lg font-semibold mb-4">Top 10 Job Roles</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
