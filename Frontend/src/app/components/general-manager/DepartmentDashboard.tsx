import { Users, CheckCircle, Clock, Award } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const teamPerformance = [
  { team: 'Team Alpha', tasks: 45, completed: 42 },
  { team: 'Team Beta', tasks: 38, completed: 35 },
  { team: 'Team Gamma', tasks: 52, completed: 48 },
  { team: 'Team Delta', tasks: 41, completed: 39 },
];

const weeklyProgress = [
  { day: 'Mon', completed: 28, pending: 12 },
  { day: 'Tue', completed: 32, pending: 10 },
  { day: 'Wed', completed: 30, pending: 8 },
  { day: 'Thu', completed: 35, pending: 7 },
  { day: 'Fri', completed: 33, pending: 9 },
];

const lineManagers = [
  { name: 'Alice Williams', team: 'Team Alpha', members: 12, tasksCompleted: 42, performance: 93 },
  { name: 'Bob Martinez', team: 'Team Beta', members: 10, tasksCompleted: 35, performance: 92 },
  { name: 'Carol Davis', team: 'Team Gamma', members: 14, tasksCompleted: 48, performance: 92 },
  { name: 'David Chen', team: 'Team Delta', members: 11, tasksCompleted: 39, performance: 95 },
];

export function DepartmentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Department Dashboard</h2>
        <p className="text-gray-600">Engineering Department Overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Teams"
          value="4"
          icon={Users}
          trend={{ value: '12 members per team avg', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Tasks Completed"
          value="164"
          icon={CheckCircle}
          trend={{ value: '12% this week', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Avg. Response Time"
          value="2.3 hrs"
          icon={Clock}
          trend={{ value: '0.5 hrs faster', isPositive: true }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Department Penalties"
          value="13"
          icon={Award}
          trend={{ value: '3 this week', isPositive: false }}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#93c5fd" name="Total Tasks" />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Managers Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Line Managers Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Team</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Members</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Tasks Completed</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lineManagers.map((manager) => (
                <tr key={manager.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{manager.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{manager.team}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{manager.members}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{manager.tasksCompleted}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${manager.performance}%` }}
                        />
                      </div>
                      <span className="text-gray-900">{manager.performance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '10 mins ago', activity: 'Team Alpha completed "API Integration" task', type: 'success' },
            { time: '1 hour ago', activity: 'Team Beta: 2 members checked in late', type: 'warning' },
            { time: '2 hours ago', activity: 'Team Gamma: Penalty issued for missed deadline', type: 'info' },
            { time: '3 hours ago', activity: 'Team Delta: Task "Security Audit" assigned', type: 'info' },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                item.type === 'success'
                  ? 'bg-green-50 border-green-500'
                  : item.type === 'warning'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <p className="text-sm text-gray-900">{item.activity}</p>
              <p className="text-xs text-gray-600 mt-1">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}