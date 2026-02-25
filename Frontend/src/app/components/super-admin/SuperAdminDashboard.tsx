import { Users, Building2, Shield, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const systemData = [
  { month: 'Sep', users: 145, tasks: 1240, logins: 3200 },
  { month: 'Oct', users: 152, tasks: 1380, logins: 3450 },
  { month: 'Nov', users: 158, tasks: 1420, logins: 3580 },
  { month: 'Dec', users: 165, tasks: 1510, logins: 3720 },
  { month: 'Jan', users: 172, tasks: 1650, logins: 3890 },
  { month: 'Feb', users: 178, tasks: 1720, logins: 4020 },
];

const roleDistribution = [
  { role: 'Staff', count: 120, percentage: 67 },
  { role: 'Line Managers', count: 35, percentage: 20 },
  { role: 'General Managers', count: 18, percentage: 10 },
  { role: 'Directors', count: 5, percentage: 3 },
];

const recentActivity = [
  { id: 1, type: 'user', action: 'New user created: John Anderson (Staff)', time: '5 mins ago', icon: Users },
  { id: 2, type: 'system', action: 'System backup completed successfully', time: '15 mins ago', icon: Shield },
  { id: 3, type: 'penalty', action: 'High severity penalty approved by Director', time: '32 mins ago', icon: AlertTriangle },
  { id: 4, type: 'role', action: 'Role changed: Sarah Johnson → General Manager', time: '1 hour ago', icon: Building2 },
  { id: 5, type: 'login', action: 'Peak concurrent users: 156 active sessions', time: '2 hours ago', icon: Activity },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Super Admin Dashboard</h2>
        <p className="text-gray-600">Complete system overview and administrative controls</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Users"
          value="178"
          icon={Users}
          trend={{ value: '+6 this month', isPositive: true }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Active Sessions"
          value="142"
          icon={Activity}
          trend={{ value: '79.8% online', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="System Health"
          value="99.2%"
          icon={Shield}
          trend={{ value: 'Uptime', isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Tasks"
          value="1,720"
          icon={TrendingUp}
          trend={{ value: '+70 this week', isPositive: true }}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Pending Actions"
          value="12"
          icon={AlertTriangle}
          trend={{ value: 'Requires attention', isPositive: false }}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Growth */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">System Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={systemData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                fill="#c4b5fd" 
                name="Active Users"
              />
              <Area 
                type="monotone" 
                dataKey="logins" 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                name="Monthly Logins"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roleDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Recent System Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">Storage Usage</h4>
          <p className="text-2xl text-gray-900 mb-1">42.3 GB</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">42% of 100 GB</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">API Calls (Today)</h4>
          <p className="text-2xl text-gray-900 mb-1">24,567</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from yesterday</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">Average Response Time</h4>
          <p className="text-2xl text-gray-900 mb-1">142ms</p>
          <p className="text-xs text-green-600 mt-2">↓ 8ms improvement</p>
        </div>
      </div>
    </div>
  );
}
