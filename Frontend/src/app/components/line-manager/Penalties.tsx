import { AlertTriangle, Plus, FileText, Filter } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import { useState } from 'react';

const teamMembers = [
  { id: 1, name: 'Sarah Johnson', department: 'Engineering', position: 'Senior Developer', points: 1000 },
  { id: 2, name: 'Mike Chen', department: 'Engineering', position: 'Developer', points: 965 },
  { id: 3, name: 'David Lee', department: 'Engineering', position: 'Developer', points: 990 },
  { id: 4, name: 'Emily Brown', department: 'Engineering', position: 'QA Engineer', points: 845 },
  { id: 5, name: 'John Smith', department: 'Engineering', position: 'Developer', points: 950 },
  { id: 6, name: 'Lisa Wang', department: 'Engineering', position: 'Junior Developer', points: 980 },
];

const penaltyReasons = [
  'Late submission of deliverables',
  'Missed team meeting',
  'Incomplete task documentation',
  'Failed to follow procedures',
  'Attendance issues',
  'Code quality standards not met',
  'Safety violation',
  'Other (specify below)',
];

const severityPointsImpact = {
  Low: 10,
  Medium: 25,
  High: 50,
};

const severitySuggestions = {
  Low: { min: 5, max: 20, suggested: 10 },
  Medium: { min: 20, max: 50, suggested: 25 },
  High: { min: 50, max: 100, suggested: 50 },
};

const issuedPenalties = [
  { 
    id: 'P-125', 
    employee: 'Sarah Johnson', 
    reason: 'Late submission of deliverables', 
    severity: 'Low' as const,
    status: 'Active' as const,
    date: '2026-02-03',
    requiresApproval: false,
    pointsDeducted: 10,
    employeePointsAfter: 1000
  },
  { 
    id: 'P-124', 
    employee: 'Mike Chen', 
    reason: 'Missed team meeting', 
    severity: 'Low' as const,
    status: 'Active' as const,
    date: '2026-02-02',
    requiresApproval: false,
    pointsDeducted: 10,
    employeePointsAfter: 965
  },
  { 
    id: 'P-123', 
    employee: 'Emily Brown', 
    reason: 'Incomplete task documentation', 
    severity: 'Medium' as const,
    status: 'Pending Approval' as const,
    date: '2026-02-01',
    requiresApproval: true,
    approvalLevel: 'General Manager',
    pointsDeducted: 25,
    employeePointsAfter: 845
  },
  { 
    id: 'P-122', 
    employee: 'David Lee', 
    reason: 'Attendance issues', 
    severity: 'Medium' as const,
    status: 'Resolved' as const,
    date: '2026-01-28',
    requiresApproval: false,
    resolvedDate: '2026-02-02',
    pointsDeducted: 25,
    employeePointsAfter: 990,
    pointsRestored: 25
  },
];

const severityColors = {
  Low: 'bg-yellow-100 text-yellow-800',
  Medium: 'bg-orange-100 text-orange-800',
  High: 'bg-red-100 text-red-800',
};

const statusColors = {
  Active: 'text-red-600',
  'Pending Approval': 'text-blue-600',
  Resolved: 'text-gray-600',
};

export function Penalties() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    reason: '',
    customReason: '',
    severity: 'Low',
    description: '',
    evidence: '',
    pointsToDeduct: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle penalty issuance
    alert('Penalty issued successfully');
    setShowForm(false);
    setFormData({
      employee: '',
      reason: '',
      customReason: '',
      severity: 'Low',
      description: '',
      evidence: '',
      pointsToDeduct: 10,
    });
  };

  const activePenalties = issuedPenalties.filter(p => p.status === 'Active').length;
  const pendingApproval = issuedPenalties.filter(p => p.status === 'Pending Approval').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Team Penalties</h2>
          <p className="text-gray-600">Issue and manage penalties for team members</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <Plus className="w-4 h-4" />
          Issue Penalty
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Issued"
          value={issuedPenalties.length.toString()}
          icon={FileText}
          iconBgColor="bg-gray-100"
          iconColor="text-gray-600"
        />
        <StatsCard
          title="Active"
          value={activePenalties.toString()}
          icon={AlertTriangle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Pending Approval"
          value={pendingApproval.toString()}
          icon={AlertTriangle}
          trend={{ value: 'GM review required', isPositive: false }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="This Month"
          value="7"
          icon={FileText}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      {/* Penalty Issuance Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-200">
          <h3 className="text-lg text-gray-900 mb-4">Issue New Penalty</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Employee*</label>
                <select 
                  value={formData.employee}
                  onChange={(e) => setFormData({...formData, employee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="">Choose an employee...</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} - {member.position} ({member.points} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Severity Level*</label>
                <select 
                  value={formData.severity}
                  onChange={(e) => {
                    const newSeverity = e.target.value as keyof typeof severitySuggestions;
                    setFormData({
                      ...formData, 
                      severity: newSeverity,
                      pointsToDeduct: severitySuggestions[newSeverity].suggested
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="Low">Low (Suggested: 5-20 points)</option>
                  <option value="Medium">Medium (Suggested: 20-50 points, Requires GM Approval)</option>
                  <option value="High">High (Suggested: 50-100 points, Requires Director Approval)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Compliance Points to Deduct*</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.pointsToDeduct}
                    onChange={(e) => setFormData({...formData, pointsToDeduct: parseInt(e.target.value) || 0})}
                    min={severitySuggestions[formData.severity as keyof typeof severitySuggestions].min}
                    max={severitySuggestions[formData.severity as keyof typeof severitySuggestions].max}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">points</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-600">
                    Range: {severitySuggestions[formData.severity as keyof typeof severitySuggestions].min}-
                    {severitySuggestions[formData.severity as keyof typeof severitySuggestions].max} points for {formData.severity} severity
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData, 
                      pointsToDeduct: severitySuggestions[formData.severity as keyof typeof severitySuggestions].suggested
                    })}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Use suggested ({severitySuggestions[formData.severity as keyof typeof severitySuggestions].suggested})
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Reason*</label>
              <select 
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Select a reason...</option>
                {penaltyReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {formData.reason === 'Other (specify below)' && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">Custom Reason*</label>
                <input
                  type="text"
                  value={formData.customReason}
                  onChange={(e) => setFormData({...formData, customReason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Specify the reason..."
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">Description*</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="Provide detailed information about the incident..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Attachment (Optional)</label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Issue Penalty (-{formData.pointsToDeduct} points)
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Issued Penalties Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Issued Penalties</h3>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Points Impact</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {issuedPenalties.map((penalty) => (
                <tr key={penalty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{penalty.reason}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${severityColors[penalty.severity]}`}>
                      {penalty.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-red-600">-{penalty.pointsDeducted}</span>
                    {penalty.pointsRestored && (
                      <span className="text-green-600 ml-2">(+{penalty.pointsRestored} restored)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={statusColors[penalty.status]}>
                      {penalty.status}
                    </span>
                    {penalty.requiresApproval && (
                      <p className="text-xs text-gray-500 mt-1">{penalty.approvalLevel}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{penalty.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-amber-900 mb-1">Penalty Points Guidelines</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• <strong>Low Severity:</strong> 5-20 points (Can be issued directly without approval)</li>
              <li>• <strong>Medium Severity:</strong> 20-50 points (Requires General Manager approval)</li>
              <li>• <strong>High Severity:</strong> 50-100 points (Requires Director approval)</li>
              <li>• You can set custom point deductions within the allowed range for each severity level</li>
              <li>• Always provide clear documentation and evidence when issuing penalties</li>
              <li>• Resolved penalties may result in compliance points being restored</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}