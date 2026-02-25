import { Users, Clock, TrendingUp, UserCheck } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const attendanceData = [
  { day: 'Mon', present: 145, absent: 13 },
  { day: 'Tue', present: 148, absent: 10 },
  { day: 'Wed', present: 142, absent: 16 },
  { day: 'Thu', present: 150, absent: 8 },
  { day: 'Fri', present: 138, absent: 20 },
];

const departmentDistribution = [
  { name: 'Engineering', value: 45, color: '#3b82f6' },
  { name: 'Sales', value: 32, color: '#10b981' },
  { name: 'Marketing', value: 28, color: '#f59e0b' },
  { name: 'Operations', value: 38, color: '#8b5cf6' },
  { name: 'HR', value: 15, color: '#ec4899' },
];

export function WorkforceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Workforce & Attendance Analytics</h2>
        <p className="text-gray-600">Comprehensive view of workforce metrics and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Workforce"
          value="158"
          icon={Users}
          trend={{ value: '3 new this month', isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Avg. Attendance"
          value="92.5%"
          icon={UserCheck}
          trend={{ value: '1.2% increase', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Avg. Work Hours"
          value="8.2 hrs"
          icon={Clock}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Productivity Score"
          value="87%"
          icon={TrendingUp}
          trend={{ value: '5% increase', isPositive: true }}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="present" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Present"
              />
              <Line 
                type="monotone" 
                dataKey="absent" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Absent"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Workforce Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance Heatmap */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Department Attendance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Total Staff</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Present Today</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Attendance Rate</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Avg. Work Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { dept: 'Engineering', total: 45, present: 42, rate: 93, hours: 8.5 },
                { dept: 'Sales', total: 32, present: 30, rate: 94, hours: 8.2 },
                { dept: 'Marketing', total: 28, present: 25, rate: 89, hours: 8.0 },
                { dept: 'Operations', total: 38, present: 36, rate: 95, hours: 8.3 },
                { dept: 'HR', total: 15, present: 14, rate: 93, hours: 8.1 },
              ].map((row) => (
                <tr key={row.dept} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.dept}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.present}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            row.rate >= 90 ? 'bg-green-600' : 'bg-orange-600'
                          }`}
                          style={{ width: `${row.rate}%` }}
                        />
                      </div>
                      <span className="text-gray-900">{row.rate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.hours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
