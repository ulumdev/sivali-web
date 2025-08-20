import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from 'recharts'
  
  interface JobData {
    name: string
    value: number
  }
  
  interface ChartProps {
    data: JobData[]
  }
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white text-sm px-2 py-1 rounded">
          {payload[0].value}
        </div>
      )
    }
    return null
  }
  
  const TopJobBarChart: React.FC<ChartProps> = ({ data }) => {
    return (
      <div className="w-full h-64 bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 10 Job Roles</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  
  export default TopJobBarChart
  