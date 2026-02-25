import { DataTable } from '@/app/components/shared/DataTable';
import { Filter, Download } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  department: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Pending';
  dueDate: string;
}

const tasks: Task[] = [
  { id: 'T-001', title: 'Q1 Financial Report', department: 'Finance', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-15' },
  { id: 'T-002', title: 'Marketing Campaign Launch', department: 'Marketing', assignedTo: 'Mike Chen', priority: 'High', status: 'Completed', dueDate: '2026-02-10' },
  { id: 'T-003', title: 'System Infrastructure Upgrade', department: 'Engineering', assignedTo: 'David Lee', priority: 'High', status: 'Overdue', dueDate: '2026-01-31' },
  { id: 'T-004', title: 'Employee Onboarding Process', department: 'HR', assignedTo: 'Emily Brown', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-20' },
  { id: 'T-005', title: 'Client Presentation Deck', department: 'Sales', assignedTo: 'John Smith', priority: 'High', status: 'In Progress', dueDate: '2026-02-12' },
  { id: 'T-006', title: 'Security Audit', department: 'Engineering', assignedTo: 'Lisa Wang', priority: 'High', status: 'Pending', dueDate: '2026-02-25' },
  { id: 'T-007', title: 'Product Roadmap Review', department: 'Engineering', assignedTo: 'Tom Anderson', priority: 'Medium', status: 'Completed', dueDate: '2026-02-05' },
  { id: 'T-008', title: 'Budget Allocation Plan', department: 'Finance', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-18' },
];

const columns = [
  { key: 'id', header: 'Task ID' },
  { key: 'title', header: 'Title' },
  { key: 'department', header: 'Department' },
  { key: 'assignedTo', header: 'Assigned To' },
  {
    key: 'priority',
    header: 'Priority',
    render: (task: Task) => (
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          task.priority === 'High'
            ? 'bg-red-100 text-red-700'
            : task.priority === 'Medium'
            ? 'bg-orange-100 text-orange-700'
            : 'bg-blue-100 text-blue-700'
        }`}
      >
        {task.priority}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (task: Task) => (
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          task.status === 'Completed'
            ? 'bg-green-100 text-green-700'
            : task.status === 'In Progress'
            ? 'bg-blue-100 text-blue-700'
            : task.status === 'Overdue'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {task.status}
      </span>
    ),
  },
  { key: 'dueDate', header: 'Due Date' },
];

export function OrganizationTasks() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Organization Task Oversight</h2>
          <p className="text-gray-600">Monitor and manage all tasks across departments</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <p className="text-2xl text-gray-900 mt-1">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl text-blue-600 mt-1">
            {tasks.filter(t => t.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl text-green-600 mt-1">
            {tasks.filter(t => t.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Overdue</p>
          <p className="text-2xl text-red-600 mt-1">
            {tasks.filter(t => t.status === 'Overdue').length}
          </p>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable 
          columns={columns} 
          data={tasks} 
          searchable
          searchPlaceholder="Search tasks, departments, or assignees..."
        />
      </div>
    </div>
  );
}
