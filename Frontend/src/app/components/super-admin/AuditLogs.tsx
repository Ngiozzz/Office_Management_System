import { useState } from 'react';
import { DataTable } from '@/app/components/shared/DataTable';
import { Filter, Download, Search, AlertCircle, CheckCircle, XCircle, Edit } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'User' | 'Task' | 'Penalty' | 'System' | 'Security';
  status: 'Success' | 'Failed' | 'Warning';
  ipAddress: string;
  details: string;
}

const auditLogs: AuditLog[] = [
  { id: 'A-1234', timestamp: '2026-02-17 10:45:32', user: 'admin@company.com', action: 'User Created', category: 'User', status: 'Success', ipAddress: '192.168.1.45', details: 'Created user: John Anderson (Staff)' },
  { id: 'A-1233', timestamp: '2026-02-17 10:30:15', user: 'jennifer.m@company.com', action: 'Penalty Approved', category: 'Penalty', status: 'Success', ipAddress: '192.168.1.23', details: 'Approved penalty P-156 for Sarah Johnson' },
  { id: 'A-1232', timestamp: '2026-02-17 10:15:08', user: 'mike.c@company.com', action: 'Task Assigned', category: 'Task', status: 'Success', ipAddress: '192.168.1.67', details: 'Assigned task T-207 to David Lee' },
  { id: 'A-1231', timestamp: '2026-02-17 09:58:42', user: 'unknown@external.com', action: 'Login Attempt', category: 'Security', status: 'Failed', ipAddress: '45.123.67.89', details: 'Failed login attempt - invalid credentials' },
  { id: 'A-1230', timestamp: '2026-02-17 09:45:20', user: 'admin@company.com', action: 'Settings Updated', category: 'System', status: 'Success', ipAddress: '192.168.1.45', details: 'Updated notification settings' },
  { id: 'A-1229', timestamp: '2026-02-17 09:30:55', user: 'robert.s@company.com', action: 'Role Changed', category: 'User', status: 'Success', ipAddress: '192.168.1.89', details: 'Changed role for Sarah Johnson to General Manager' },
  { id: 'A-1228', timestamp: '2026-02-17 09:15:33', user: 'system', action: 'Backup Completed', category: 'System', status: 'Success', ipAddress: 'Internal', details: 'Automated daily backup completed successfully' },
  { id: 'A-1227', timestamp: '2026-02-17 08:45:10', user: 'david.l@company.com', action: 'Password Reset', category: 'Security', status: 'Success', ipAddress: '192.168.1.34', details: 'User initiated password reset' },
  { id: 'A-1226', timestamp: '2026-02-17 08:30:28', user: 'emily.b@company.com', action: 'Task Completed', category: 'Task', status: 'Success', ipAddress: '192.168.1.56', details: 'Marked task T-204 as completed' },
  { id: 'A-1225', timestamp: '2026-02-17 08:00:05', user: 'admin@company.com', action: 'User Suspended', category: 'User', status: 'Warning', ipAddress: '192.168.1.45', details: 'Suspended user: Mark Thompson due to policy violation' },
];

const columns = [
  { key: 'id', header: 'Log ID' },
  { key: 'timestamp', header: 'Timestamp' },
  { key: 'user', header: 'User' },
  { key: 'action', header: 'Action' },
  {
    key: 'category',
    header: 'Category',
    render: (log: AuditLog) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        log.category === 'User' ? 'bg-blue-100 text-blue-700' :
        log.category === 'Task' ? 'bg-green-100 text-green-700' :
        log.category === 'Penalty' ? 'bg-orange-100 text-orange-700' :
        log.category === 'System' ? 'bg-purple-100 text-purple-700' :
        'bg-red-100 text-red-700'
      }`}>
        {log.category}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (log: AuditLog) => {
      const Icon = log.status === 'Success' ? CheckCircle : log.status === 'Failed' ? XCircle : AlertCircle;
      return (
        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
          log.status === 'Success' ? 'bg-green-100 text-green-700' :
          log.status === 'Failed' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          <Icon className="w-3 h-3" />
          {log.status}
        </span>
      );
    },
  },
  { key: 'ipAddress', header: 'IP Address' },
];

export function AuditLogs() {
  const [dateFilter, setDateFilter] = useState('today');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const exportLogs = () => {
    alert('Exporting audit logs to CSV...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Audit Logs</h2>
          <p className="text-gray-600">Track all system activities and user actions</p>
        </div>
        <button 
          onClick={exportLogs}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total Events (Today)</p>
          <p className="text-2xl text-gray-900 mt-1">{auditLogs.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Successful Actions</p>
          <p className="text-2xl text-green-600 mt-1">
            {auditLogs.filter(l => l.status === 'Success').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Failed Actions</p>
          <p className="text-2xl text-red-600 mt-1">
            {auditLogs.filter(l => l.status === 'Failed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Security Events</p>
          <p className="text-2xl text-orange-600 mt-1">
            {auditLogs.filter(l => l.category === 'Security').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="User">User Management</option>
              <option value="Task">Task Actions</option>
              <option value="Penalty">Penalty Actions</option>
              <option value="System">System Events</option>
              <option value="Security">Security Events</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Activity Log</h3>
        <DataTable 
          columns={columns} 
          data={auditLogs}
          searchable
          searchPlaceholder="Search logs by user, action, or IP address..."
        />
      </div>

      {/* Recent Security Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h3 className="text-lg text-gray-900">Security Alerts</h3>
        </div>

        <div className="space-y-3">
          {auditLogs
            .filter(log => log.status === 'Failed' || log.status === 'Warning')
            .slice(0, 3)
            .map((log) => (
              <div key={log.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">
                      <strong>{log.action}</strong> - {log.user}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{log.timestamp}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    log.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
