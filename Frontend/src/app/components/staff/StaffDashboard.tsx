import { Clock, CheckCircle, Award, Calendar, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const weeklyTasks = [
  { day: 'Mon', completed: 5 },
  { day: 'Tue', completed: 6 },
  { day: 'Wed', completed: 5 },
  { day: 'Thu', completed: 7 },
  { day: 'Fri', completed: 6 },
];

export function StaffDashboard() {
  const isCheckedIn = true;
  const checkInTime = '08:45 AM';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Welcome Back, Sarah!</h2>
        <p className="text-gray-600">Tuesday, February 3, 2026</p>
      </div>

      {/* Check-In/Out Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isCheckedIn ? (
              <>
                <p className="text-sm opacity-90 mb-1">Checked in at</p>
                <p className="text-3xl mb-2">{checkInTime}</p>
                <p className="text-sm opacity-90">Total work time today: 6 hours 45 mins</p>
              </>
            ) : (
              <>
                <p className="text-lg mb-2">You haven't checked in yet</p>
                <p className="text-sm opacity-90">Click the button to start your day</p>
              </>
            )}
          </div>
          <button
            className={`px-6 py-3 rounded-lg transition-colors ${
              isCheckedIn
                ? 'bg-white text-blue-600 hover:bg-gray-100'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tasks Today"
          value="5"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Completed"
          value="4"
          icon={CheckCircle}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Compliance Points"
          value="970"
          icon={AlertTriangle}
          trend={{ value: 'Excellent standing', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Attendance"
          value="95%"
          icon={Calendar}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Weekly Task Completion Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Tasks Completed This Week</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyTasks}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="completed" stroke="#3b82f6" fill="#93c5fd" name="Tasks Completed" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Today's Tasks</h3>
        <div className="space-y-3">
          {[
            { id: 1, title: 'Database Schema Update', status: 'completed', priority: 'High', time: '2h' },
            { id: 2, title: 'Code Review: Feature X', status: 'completed', priority: 'Medium', time: '1h' },
            { id: 3, title: 'Write Unit Tests', status: 'completed', priority: 'Medium', time: '3h' },
            { id: 4, title: 'Update Documentation', status: 'completed', priority: 'Low', time: '1h' },
            { id: 5, title: 'Bug Fix: UI Issue', status: 'pending', priority: 'High', time: '2h' },
          ].map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                task.status === 'completed'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    task.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                >
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-600">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'Medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">This Week</h4>
          <p className="text-2xl text-gray-900 mb-1">27 tasks</p>
          <p className="text-sm text-green-600">+3 from last week</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">Team Rank</h4>
          <p className="text-2xl text-gray-900 mb-1">#1</p>
          <p className="text-sm text-blue-600">Top performer</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm text-gray-600 mb-2">Streak</h4>
          <p className="text-2xl text-gray-900 mb-1">12 days</p>
          <p className="text-sm text-orange-600">Perfect attendance</p>
        </div>
      </div>
    </div>
  );
}