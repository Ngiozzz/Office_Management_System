import { AlertTriangle, TrendingDown, Users, CheckCircle, XCircle } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const departmentPenalties = [
  { department: 'Engineering', penalties: 12, resolved: 8, active: 4 },
  { department: 'Sales', penalties: 8, resolved: 5, active: 3 },
  { department: 'Marketing', penalties: 15, resolved: 10, active: 5 },
  { department: 'Finance', penalties: 5, resolved: 4, active: 1 },
];

const pendingApprovals = [
  { 
    id: 'P-156', 
    employee: 'Sarah Johnson', 
    department: 'Engineering',
    reason: 'Failed to follow security procedures', 
    severity: 'Medium' as const,
    issuedBy: 'John Davis (Line Manager)',
    date: '2026-02-03',
    description: 'Accessed production database without following change management protocol.',
    pointsToDeduct: 30,
    currentPoints: 950
  },
  { 
    id: 'P-155', 
    employee: 'Mike Chen', 
    department: 'Marketing',
    reason: 'Missed critical deadline', 
    severity: 'Medium' as const,
    issuedBy: 'Lisa Wang (Line Manager)',
    date: '2026-02-02',
    description: 'Campaign launch materials not delivered on scheduled date, causing client delays.',
    pointsToDeduct: 25,
    currentPoints: 965
  },
  { 
    id: 'P-154', 
    employee: 'Emma Wilson', 
    department: 'Sales',
    reason: 'Incomplete client documentation', 
    severity: 'High' as const,
    issuedBy: 'Robert Smith (Line Manager)',
    date: '2026-02-01',
    description: 'Client contract submitted without required compliance documentation.',
    requiresDirectorApproval: true,
    pointsToDeduct: 60,
    currentPoints: 890
  },
];

const recentPenalties = [
  { employee: 'David Lee', department: 'Engineering', reason: 'Late deliverable', severity: 'Low', date: '2026-02-03', status: 'Active' },
  { employee: 'Emily Brown', department: 'Finance', reason: 'Attendance issues', severity: 'Low', date: '2026-02-02', status: 'Resolved' },
  { employee: 'John Smith', department: 'Sales', reason: 'Incomplete documentation', severity: 'Medium', date: '2026-02-02', status: 'Active' },
  { employee: 'Lisa Wang', department: 'Marketing', reason: 'Missed team meeting', severity: 'Low', date: '2026-02-01', status: 'Active' },
];

const severityColors = {
  Low: 'bg-yellow-100 text-yellow-800',
  Medium: 'bg-orange-100 text-orange-800',
  High: 'bg-red-100 text-red-800',
};

const severitySuggestions = {
  Low: { min: 5, max: 20, suggested: 10 },
  Medium: { min: 20, max: 50, suggested: 25 },
  High: { min: 50, max: 100, suggested: 50 },
};

export function PenaltyPerformance() {
  const [editingPenalty, setEditingPenalty] = useState<string | null>(null);
  const [customPoints, setCustomPoints] = useState<{[key: string]: number}>({});

  const handlePointsChange = (penaltyId: string, points: number) => {
    setCustomPoints(prev => ({...prev, [penaltyId]: points}));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Penalty Management</h2>
        <p className="text-gray-600">Track and approve penalties across all departments</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Penalties"
          value="40"
          icon={AlertTriangle}
          trend={{ value: '+3 this week', isPositive: false }}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatsCard
          title="Active Penalties"
          value="13"
          icon={TrendingDown}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Pending Approval"
          value={pendingApprovals.length.toString()}
          icon={Users}
          trend={{ value: 'Requires action', isPositive: false }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Resolution Rate"
          value="67.5%"
          icon={CheckCircle}
          trend={{ value: 'vs last month', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
        <h3 className="text-lg text-gray-900 mb-4">Pending Approvals</h3>
        <div className="space-y-4">
          {pendingApprovals.map((penalty) => (
            <div
              key={penalty.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-500">{penalty.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${severityColors[penalty.severity]}`}>
                      {penalty.severity} Severity
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                      -{customPoints[penalty.id] ?? penalty.pointsToDeduct} points
                    </span>
                    {penalty.requiresDirectorApproval && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                        Director Approval Required
                      </span>
                    )}
                  </div>
                  <h4 className="text-base text-gray-900 mb-1">{penalty.employee} - {penalty.department}</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Reason:</strong> {penalty.reason}</p>
                  <p className="text-sm text-gray-600 mb-2">{penalty.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <p className="text-xs text-gray-500">
                      Issued by: {penalty.issuedBy} on {penalty.date}
                    </p>
                    <p className="text-xs text-gray-500">
                      Employee Balance: {penalty.currentPoints} → {penalty.currentPoints - (customPoints[penalty.id] ?? penalty.pointsToDeduct)} points
                    </p>
                  </div>
                </div>
              </div>
              
              {editingPenalty === penalty.id && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <label className="block text-sm text-gray-700 mb-2">Adjust Compliance Points to Deduct</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={customPoints[penalty.id] ?? penalty.pointsToDeduct}
                      onChange={(e) => handlePointsChange(penalty.id, parseInt(e.target.value) || 0)}
                      min={severitySuggestions[penalty.severity].min}
                      max={severitySuggestions[penalty.severity].max}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Range: {severitySuggestions[penalty.severity].min}-{severitySuggestions[penalty.severity].max} points
                    </span>
                    <button
                      onClick={() => setEditingPenalty(null)}
                      className="ml-auto px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                {!penalty.requiresDirectorApproval ? (
                  <>
                    <button 
                      onClick={() => setEditingPenalty(editingPenalty === penalty.id ? null : penalty.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      {editingPenalty === penalty.id ? 'Cancel Edit' : 'Adjust Points'}
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Approve ({customPoints[penalty.id] ?? penalty.pointsToDeduct} pts)
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      <XCircle className="w-4 h-4 inline mr-1" />
                      Reject
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                    Forward to Director
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
                  Request More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Penalties Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Penalties by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentPenalties}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="active" fill="#f59e0b" name="Active Penalties" />
            <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Department Summary</h3>
          <div className="space-y-4">
            {departmentPenalties.map((dept) => {
              const resolutionRate = Math.round((dept.resolved / dept.penalties) * 100);
              return (
                <div key={dept.department} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-900">{dept.department}</h4>
                    <span className="text-sm text-amber-600">{dept.penalties} total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs mb-2">
                    <div>
                      <p className="text-gray-600">Active</p>
                      <p className="text-red-600 mt-1 font-medium">{dept.active}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Resolved</p>
                      <p className="text-green-600 mt-1 font-medium">{dept.resolved}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Resolution</p>
                      <p className="text-gray-900 mt-1 font-medium">{resolutionRate}%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-600 h-2 rounded-full"
                        style={{ width: `${(dept.penalties / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Penalty Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentPenalties.map((penalty, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">
                    <strong>{penalty.employee}</strong> - {penalty.department}
                  </p>
                  <p className="text-xs text-gray-600">{penalty.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${severityColors[penalty.severity]}`}>
                      {penalty.severity}
                    </span>
                    <span className="text-xs text-gray-500">{penalty.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Penalty Activity Log */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Penalty Activity Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPenalties.map((penalty, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.reason}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${severityColors[penalty.severity]}`}>
                      {penalty.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{penalty.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-blue-900 mb-1">Approval Guidelines</h4>
            <p className="text-sm text-blue-700">
              As a General Manager, you are responsible for reviewing and approving Medium severity penalties.
              High severity penalties require Director approval. Ensure all penalties have proper documentation
              before approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}