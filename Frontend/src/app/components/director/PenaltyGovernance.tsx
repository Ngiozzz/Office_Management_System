import { Shield, AlertTriangle, Lock, AlertCircle, FileText, Search } from 'lucide-react';
import { DataTable } from '@/app/components/shared/DataTable';
import { useState } from 'react';

interface PenaltyAudit {
  id: string;
  employee: string;
  department: string;
  reason: string;
  severity: 'Low' | 'Medium' | 'High';
  issuedBy: string;
  approvedBy: string;
  timestamp: string;
  status: string;
}

const auditLogs: PenaltyAudit[] = [
  { id: 'P-201', employee: 'Sarah Johnson', department: 'Engineering', reason: 'Security violation', severity: 'High', issuedBy: 'John Davis (LM)', approvedBy: 'Pending Director', timestamp: '2026-02-03 14:30', status: 'Pending' },
  { id: 'P-200', employee: 'Mike Chen', department: 'Marketing', reason: 'Missed critical deadline', severity: 'Medium', issuedBy: 'Lisa Wang (LM)', approvedBy: 'Jennifer Martinez (GM)', timestamp: '2026-02-03 09:15', status: 'Active' },
  { id: 'P-199', employee: 'David Lee', department: 'Sales', reason: 'Incomplete documentation', severity: 'Medium', issuedBy: 'Robert Smith (LM)', approvedBy: 'Jennifer Martinez (GM)', timestamp: '2026-02-02 16:45', status: 'Active' },
  { id: 'P-198', employee: 'Emily Brown', department: 'Finance', reason: 'Late submission', severity: 'Low', issuedBy: 'Patricia Wong (LM)', approvedBy: 'Auto-approved', timestamp: '2026-02-02 11:20', status: 'Resolved' },
  { id: 'P-197', employee: 'John Smith', department: 'Engineering', reason: 'Attendance issues', severity: 'Low', issuedBy: 'John Davis (LM)', approvedBy: 'Auto-approved', timestamp: '2026-02-01 10:00', status: 'Active' },
];

const columns = [
  { key: 'id', header: 'Penalty ID' },
  { key: 'employee', header: 'Employee' },
  { key: 'department', header: 'Department' },
  { key: 'reason', header: 'Reason' },
  {
    key: 'severity',
    header: 'Severity',
    render: (item: PenaltyAudit) => {
      const colors = {
        Low: 'bg-yellow-100 text-yellow-800',
        Medium: 'bg-orange-100 text-orange-800',
        High: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${colors[item.severity]}`}>
          {item.severity}
        </span>
      );
    },
  },
  { key: 'issuedBy', header: 'Issued By' },
  { key: 'approvedBy', header: 'Approved By' },
  { key: 'timestamp', header: 'Timestamp' },
  {
    key: 'status',
    header: 'Status',
    render: (item: PenaltyAudit) => {
      const colors = {
        Pending: 'text-blue-600',
        Active: 'text-red-600',
        Resolved: 'text-gray-600',
      };
      return <span className={colors[item.status as keyof typeof colors]}>{item.status}</span>;
    },
  },
];

const highSeverityPenalties = [
  {
    id: 'P-201',
    employee: 'Sarah Johnson',
    department: 'Engineering',
    reason: 'Unauthorized access to production systems',
    description: 'Employee accessed production database without proper authorization and change management approval, violating security protocols.',
    severity: 'High' as const,
    issuedBy: 'John Davis (Line Manager)',
    issuedDate: '2026-02-03',
    evidence: 'System logs attached, incident report filed',
  },
];

export function PenaltyGovernance() {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Penalty Governance</h2>
        <p className="text-gray-600">Audit, review, and manage all organizational penalties</p>
      </div>

      {/* Control Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg text-gray-900">Audit Trail</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Complete record of all penalty transactions and approvals</p>
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            View Full Audit
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg text-gray-900">Freeze Penalties</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Temporarily suspend penalty issuance for specific departments</p>
          <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
            Manage Freeze
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg text-gray-900">Override</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Issue, modify, or dismiss penalties with director authority</p>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
            Executive Override
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total Penalties</p>
          <p className="text-2xl text-gray-900 mt-1">89</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">High Severity</p>
          <p className="text-2xl text-red-600 mt-1">1</p>
          <p className="text-xs text-red-600 mt-1">Requires approval</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl text-amber-600 mt-1">24</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Under Review</p>
          <p className="text-2xl text-blue-600 mt-1">5</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Resolved</p>
          <p className="text-2xl text-green-600 mt-1">60</p>
        </div>
      </div>

      {/* High Severity Approvals */}
      {highSeverityPenalties.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg text-gray-900">High Severity Penalties Requiring Approval</h3>
          </div>
          <div className="space-y-4">
            {highSeverityPenalties.map((penalty) => (
              <div
                key={penalty.id}
                className="border border-red-200 rounded-lg p-5 bg-red-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">{penalty.id}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-300">
                        HIGH SEVERITY
                      </span>
                    </div>
                    <h4 className="text-lg text-gray-900 mb-2">
                      {penalty.employee} - {penalty.department}
                    </h4>
                    <p className="text-sm text-gray-900 mb-2">
                      <strong>Reason:</strong> {penalty.reason}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">{penalty.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Issued By:</p>
                        <p className="text-gray-900">{penalty.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date:</p>
                        <p className="text-gray-900">{penalty.issuedDate}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Evidence:</p>
                        <p className="text-gray-900">{penalty.evidence}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-red-200">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Approve Penalty
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Reject & Return
                  </button>
                  <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Request Additional Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flagged Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg text-gray-900">Flagged Activities</h3>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, message: 'Multiple penalties issued to same employee within 7 days', department: 'Engineering', severity: 'high' },
            { id: 2, message: 'Unusual spike in penalties for Marketing department (+40%)', department: 'Marketing', severity: 'medium' },
            { id: 3, message: 'Penalty issued without supporting documentation', department: 'Sales', severity: 'medium' },
            { id: 4, message: 'High severity penalty downgraded by manager', department: 'Finance', severity: 'low' },
          ].map((flag) => (
            <div
              key={flag.id}
              className={`p-4 rounded-lg border-l-4 ${
                flag.severity === 'high'
                  ? 'bg-red-50 border-red-500'
                  : flag.severity === 'medium'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">{flag.message}</p>
                  <p className="text-xs text-gray-600">Department: {flag.department}</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 ml-4">Investigate</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg text-gray-900">Penalty History & Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Department</label>
            <select 
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Severity</label>
            <select 
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Date Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={auditLogs}
          searchable
          searchPlaceholder="Search penalties by employee, department, or reason..."
        />
      </div>

      {/* Export & Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg text-gray-900">Reports & Export</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Export to PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Export to Excel
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Generate Compliance Report
          </button>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-purple-900 mb-1">Director Governance Authority</h4>
            <p className="text-sm text-purple-700">
              As Director, you have full oversight of the penalty system. You can approve or reject all penalties,
              freeze penalty issuance by department, and override any decisions. All high severity penalties require
              your explicit approval before activation. Use the audit trail to ensure compliance and fair application
              of organizational policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
