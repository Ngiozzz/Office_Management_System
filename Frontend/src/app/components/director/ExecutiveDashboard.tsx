import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Building2,
  Target
} from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const performanceData = [
  { month: 'Jan', revenue: 45000, tasks: 320 },
  { month: 'Feb', revenue: 52000, tasks: 385 },
  { month: 'Mar', revenue: 48000, tasks: 360 },
  { month: 'Apr', revenue: 61000, tasks: 425 },
  { month: 'May', revenue: 55000, tasks: 390 },
  { month: 'Jun', revenue: 67000, tasks: 450 },
];

const departmentData = [
  { department: 'Engineering', performance: 92, staff: 45 },
  { department: 'Sales', performance: 88, staff: 32 },
  { department: 'Marketing', performance: 85, staff: 28 },
  { department: 'Operations', performance: 90, staff: 38 },
  { department: 'HR', performance: 87, staff: 15 },
];

const alerts = [
  { id: 1, type: 'critical', message: 'Engineering: 3 critical tasks overdue', time: '10 mins ago' },
  { id: 2, type: 'warning', message: 'Sales: Team attendance below threshold', time: '1 hour ago' },
  { id: 3, type: 'info', message: 'Marketing: Budget utilization at 85%', time: '2 hours ago' },
];

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$328K"
          icon={TrendingUp}
          trend={{ value: '12.5% from last month', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Employees"
          value="158"
          icon={Users}
          trend={{ value: '3 new hires', isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Tasks Completed"
          value="2,330"
          icon={CheckCircle}
          trend={{ value: '8.2% increase', isPositive: true }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Active Departments"
          value="5"
          icon={Building2}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Company Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fill="#93c5fd" 
              name="Revenue ($)"
            />
            <Area 
              type="monotone" 
              dataKey="tasks" 
              stroke="#8b5cf6" 
              fill="#c4b5fd" 
              name="Tasks Completed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="performance" fill="#3b82f6" name="Performance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg text-gray-900">Critical Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                <p className="text-xs text-gray-600">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Overview Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Department Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Staff Count</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentData.map((dept) => (
                <tr key={dept.department} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{dept.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{dept.staff}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dept.performance}%` }}
                        />
                      </div>
                      <span className="text-gray-900">{dept.performance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      dept.performance >= 90
                        ? 'bg-green-100 text-green-700'
                        : dept.performance >= 85
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {dept.performance >= 90 ? 'Excellent' : dept.performance >= 85 ? 'Good' : 'Fair'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
