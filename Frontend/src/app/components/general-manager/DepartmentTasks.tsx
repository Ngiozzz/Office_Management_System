import { DataTable } from '@/app/components/shared/DataTable';
import { Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  team: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
}

const tasks: Task[] = [
  { id: 'T-101', title: 'Database Migration', team: 'Team Alpha', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-10' },
  { id: 'T-102', title: 'API Documentation', team: 'Team Beta', assignedTo: 'Mike Chen', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-12' },
  { id: 'T-103', title: 'UI Component Library', team: 'Team Gamma', assignedTo: 'David Lee', priority: 'High', status: 'Completed', dueDate: '2026-02-08' },
  { id: 'T-104', title: 'Code Review Process', team: 'Team Alpha', assignedTo: 'Emily Brown', priority: 'Low', status: 'Pending', dueDate: '2026-02-15' },
  { id: 'T-105', title: 'Performance Optimization', team: 'Team Delta', assignedTo: 'John Smith', priority: 'High', status: 'In Progress', dueDate: '2026-02-11' },
  { id: 'T-106', title: 'Security Testing', team: 'Team Beta', assignedTo: 'Lisa Wang', priority: 'High', status: 'In Progress', dueDate: '2026-02-09' },
  { id: 'T-107', title: 'User Feedback Analysis', team: 'Team Gamma', assignedTo: 'Tom Anderson', priority: 'Medium', status: 'Completed', dueDate: '2026-02-07' },
];

const columns = [
  { key: 'id', header: 'Task ID' },
  { key: 'title', header: 'Title' },
  { key: 'team', header: 'Team' },
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
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {task.status}
      </span>
    ),
  },
  { key: 'dueDate', header: 'Due Date' },
];

export function DepartmentTasks() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Department Tasks</h2>
          <p className="text-gray-600">Manage and track all tasks across your teams</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={() => navigate('/create-task')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Task
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
          <p className="text-sm text-gray-600">High Priority</p>
          <p className="text-2xl text-red-600 mt-1">
            {tasks.filter(t => t.priority === 'High').length}
          </p>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable 
          columns={columns} 
          data={tasks}
          searchable
          searchPlaceholder="Search tasks, teams, or assignees..."
        />
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta'].map((team) => {
          const teamTasks = tasks.filter(t => t.team === team);
          const completed = teamTasks.filter(t => t.status === 'Completed').length;
          const completionRate = Math.round((completed / teamTasks.length) * 100);

          return (
            <div key={team} className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-sm text-gray-900 mb-3">{team}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="text-gray-900">{teamTasks.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Completed</span>
                  <span className="text-green-600">{completed}</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-900">{completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}