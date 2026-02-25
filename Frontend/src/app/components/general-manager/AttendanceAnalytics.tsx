import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';
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
  BarChart,
  Bar
} from 'recharts';

const weeklyAttendance = [
  { day: 'Mon', present: 44, absent: 3, late: 2 },
  { day: 'Tue', present: 45, absent: 2, late: 1 },
  { day: 'Wed', present: 43, absent: 4, late: 3 },
  { day: 'Thu', present: 46, absent: 1, late: 1 },
  { day: 'Fri', present: 42, absent: 5, late: 2 },
];

const teamAttendance = [
  { team: 'Team Alpha', rate: 94 },
  { team: 'Team Beta', rate: 92 },
  { team: 'Team Gamma', rate: 96 },
  { team: 'Team Delta', rate: 91 },
];

export function AttendanceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Attendance Analytics</h2>
        <p className="text-gray-600">Department-wide attendance trends and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Avg. Attendance"
          value="93.6%"
          icon={Calendar}
          trend={{ value: '2.1% increase', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Present Today"
          value="44/47"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Avg. Work Hours"
          value="8.3 hrs"
          icon={Clock}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="On-Time Rate"
          value="95.2%"
          icon={TrendingUp}
          trend={{ value: '1.5% increase', isPositive: true }}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent" />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} name="Late" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Attendance Rates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Team Attendance Rates</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Team Attendance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Team Attendance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Team</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Total Members</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Present Today</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Absent</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Late Arrivals</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { team: 'Team Alpha', total: 12, present: 11, absent: 1, late: 1, rate: 94 },
                { team: 'Team Beta', total: 10, present: 9, absent: 1, late: 0, rate: 92 },
                { team: 'Team Gamma', total: 14, present: 14, absent: 0, late: 1, rate: 96 },
                { team: 'Team Delta', total: 11, present: 10, absent: 1, late: 0, rate: 91 },
              ].map((row) => (
                <tr key={row.team} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.team}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.total}</td>
                  <td className="px-6 py-4 text-sm text-green-600">{row.present}</td>
                  <td className="px-6 py-4 text-sm text-red-600">{row.absent}</td>
                  <td className="px-6 py-4 text-sm text-orange-600">{row.late}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            row.rate >= 95 ? 'bg-green-600' : row.rate >= 90 ? 'bg-blue-600' : 'bg-orange-600'
                          }`}
                          style={{ width: `${row.rate}%` }}
                        />
                      </div>
                      <span className="text-gray-900">{row.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Attendance Alerts</h3>
        <div className="space-y-3">
          {[
            { team: 'Team Delta', message: 'Attendance below 95% threshold this week', severity: 'warning' },
            { team: 'Team Alpha', message: '3 consecutive late arrivals detected', severity: 'info' },
          ].map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'warning'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <p className="text-sm text-gray-900">
                <strong>{alert.team}:</strong> {alert.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
