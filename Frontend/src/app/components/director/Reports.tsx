import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const reports = [
  {
    id: 1,
    title: 'Monthly Performance Report',
    description: 'Comprehensive overview of company performance metrics',
    date: '2026-01-31',
    type: 'Performance',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Workforce Analytics Summary',
    description: 'Attendance, productivity, and workforce trends',
    date: '2026-01-31',
    type: 'Workforce',
    format: 'Excel',
  },
  {
    id: 3,
    title: 'Department Budget Analysis',
    description: 'Budget utilization across all departments',
    date: '2026-01-31',
    type: 'Financial',
    format: 'PDF',
  },
  {
    id: 4,
    title: 'Task Completion Report',
    description: 'Task performance and completion rates',
    date: '2026-01-31',
    type: 'Operations',
    format: 'Excel',
  },
  {
    id: 5,
    title: 'Points System Overview',
    description: 'Points distribution and redemption analytics',
    date: '2026-01-31',
    type: 'Points',
    format: 'PDF',
  },
];

const quickStats = [
  { label: 'Reports Generated', value: '48', icon: FileText, color: 'bg-blue-100 text-blue-600' },
  { label: 'Scheduled Reports', value: '12', icon: Calendar, color: 'bg-green-100 text-green-600' },
  { label: 'Active Dashboards', value: '8', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Reports & Exports</h2>
          <p className="text-gray-600">Generate and download comprehensive business reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FileText className="w-4 h-4" />
          Generate Custom Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Executive Summary', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
            { name: 'Financial Report', icon: FileText, color: 'bg-green-100 text-green-600' },
            { name: 'HR Analytics', icon: FileText, color: 'bg-blue-100 text-blue-600' },
            { name: 'Operations Report', icon: FileText, color: 'bg-orange-100 text-orange-600' },
            { name: 'Sales Performance', icon: TrendingUp, color: 'bg-pink-100 text-pink-600' },
            { name: 'Custom Report', icon: FileText, color: 'bg-gray-100 text-gray-600' },
          ].map((template, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`${template.color} p-2 rounded-lg`}>
                  <template.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-900">{template.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-gray-900 mb-1">{report.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{report.type}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{report.format}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Scheduled Reports</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">Manage Schedule</button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Weekly Performance Summary', frequency: 'Every Monday, 9:00 AM', nextRun: '2026-02-10' },
            { name: 'Monthly Financial Report', frequency: 'Last day of month, 5:00 PM', nextRun: '2026-02-28' },
            { name: 'Daily Attendance Report', frequency: 'Every day, 6:00 PM', nextRun: '2026-02-03' },
          ].map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900 mb-1">{schedule.name}</p>
                <p className="text-xs text-gray-600">{schedule.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Next run</p>
                <p className="text-sm text-gray-900">{schedule.nextRun}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
