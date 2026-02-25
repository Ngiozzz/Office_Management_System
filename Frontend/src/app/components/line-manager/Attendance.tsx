import { Calendar, Clock, UserCheck, UserX } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';

const attendanceData = [
  { name: 'Sarah Johnson', checkIn: '08:45 AM', checkOut: '05:30 PM', hours: '8.75', status: 'Present' },
  { name: 'Mike Chen', checkIn: '08:50 AM', checkOut: '05:35 PM', hours: '8.75', status: 'Present' },
  { name: 'David Lee', checkIn: '08:55 AM', checkOut: '05:40 PM', hours: '8.75', status: 'Present' },
  { name: 'Emily Brown', checkIn: '09:15 AM', checkOut: '-', hours: '-', status: 'Late' },
  { name: 'John Smith', checkIn: '08:30 AM', checkOut: '05:15 PM', hours: '8.75', status: 'Present' },
  { name: 'Lisa Wang', checkIn: '-', checkOut: '-', hours: '-', status: 'Absent' },
];

export function Attendance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Team Attendance</h2>
        <p className="text-gray-600">Monitor team check-ins and work hours</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Present Today"
          value="10/12"
          icon={UserCheck}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Absent"
          value="1"
          icon={UserX}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Late Arrivals"
          value="1"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Avg. Work Hours"
          value="8.5 hrs"
          icon={Calendar}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Today's Attendance (Feb 3, 2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Team Member</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Work Hours</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.hours}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        record.status === 'Present'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'Late'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Weekly Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
            const present = [11, 12, 10, 11, 10][index];
            const total = 12;
            const percentage = Math.round((present / total) * 100);

            return (
              <div key={day} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">{day}</p>
                <p className="text-2xl text-gray-900 mb-2">{present}/{total}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      percentage >= 90 ? 'bg-green-600' : percentage >= 75 ? 'bg-blue-600' : 'bg-orange-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Late Arrivals */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recent Late Arrivals</h3>
          <div className="space-y-3">
            {[
              { name: 'Emily Brown', date: '2026-02-03', time: '09:15 AM' },
              { name: 'Mike Chen', date: '2026-02-01', time: '09:10 AM' },
              { name: 'Lisa Wang', date: '2026-01-31', time: '09:05 AM' },
            ].map((late, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">{late.name}</p>
                  <p className="text-xs text-gray-600">{late.date}</p>
                </div>
                <span className="text-sm text-orange-600">{late.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Absences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recent Absences</h3>
          <div className="space-y-3">
            {[
              { name: 'Lisa Wang', date: '2026-02-03', reason: 'Sick Leave' },
              { name: 'John Smith', date: '2026-01-30', reason: 'Personal Leave' },
              { name: 'Sarah Johnson', date: '2026-01-28', reason: 'Sick Leave' },
            ].map((absence, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">{absence.name}</p>
                  <p className="text-xs text-gray-600">{absence.date}</p>
                </div>
                <span className="text-sm text-red-600">{absence.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
