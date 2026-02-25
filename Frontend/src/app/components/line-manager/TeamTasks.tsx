import { useState } from 'react';
import { DataTable } from '@/app/components/shared/DataTable';
import { Plus, CheckCircle, X, Calendar, User, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
  description?: string;
  category?: string;
  estimatedHours?: number;
  attachments?: string;
}

const tasks: Task[] = [
  { id: 'T-201', title: 'Database Schema Update', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-05', category: 'Development', description: 'Update database schema for new features' },
  { id: 'T-202', title: 'Code Review: Feature X', assignedTo: 'Mike Chen', priority: 'Medium', status: 'Pending', dueDate: '2026-02-06', category: 'Review', description: 'Review code for Feature X implementation' },
  { id: 'T-203', title: 'Bug Fix: Login Issue', assignedTo: 'David Lee', priority: 'High', status: 'Completed', dueDate: '2026-02-04', category: 'Bug Fix', description: 'Fix login authentication bug' },
  { id: 'T-204', title: 'Write Unit Tests', assignedTo: 'Emily Brown', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-07', category: 'Testing', description: 'Write unit tests for new modules' },
  { id: 'T-205', title: 'Update Documentation', assignedTo: 'John Smith', priority: 'Low', status: 'Pending', dueDate: '2026-02-08', category: 'Documentation', description: 'Update API documentation' },
  { id: 'T-206', title: 'Performance Optimization', assignedTo: 'Lisa Wang', priority: 'High', status: 'In Progress', dueDate: '2026-02-05', category: 'Optimization', description: 'Optimize database queries' },
];

const teamMembers = [
  { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', currentTasks: 3 },
  { id: 2, name: 'Mike Chen', position: 'Developer', currentTasks: 2 },
  { id: 3, name: 'David Lee', position: 'Developer', currentTasks: 1 },
  { id: 4, name: 'Emily Brown', position: 'QA Engineer', currentTasks: 2 },
  { id: 5, name: 'John Smith', position: 'Developer', currentTasks: 1 },
  { id: 6, name: 'Lisa Wang', position: 'Junior Developer', currentTasks: 2 },
];

const taskCategories = [
  'Development',
  'Bug Fix',
  'Testing',
  'Documentation',
  'Review',
  'Meeting',
  'Research',
  'Optimization',
  'Other'
];

const columns = [
  { key: 'id', header: 'Task ID' },
  { key: 'title', header: 'Title' },
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

export function TeamTasks() {
  const navigate = useNavigate();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    assignedTo: '',
    priority: 'Medium',
    category: 'Development',
    dueDate: '',
    estimatedHours: '',
    description: '',
    attachments: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add task to tasks array
    const newTask: Task = {
      id: `T-${tasks.length + 1}`,
      ...formData,
    };
    tasks.push(newTask);
    // Reset form
    setFormData({
      title: '',
      assignedTo: '',
      priority: 'Medium',
      category: 'Development',
      dueDate: '',
      estimatedHours: '',
      description: '',
      attachments: '',
    });
    // Close form
    setShowTaskForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">Team Tasks</h2>
          <p className="text-gray-600">Assign and review tasks for your team</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowTaskForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Quick Assign
          </button>
          <button 
            onClick={() => navigate('/create-task')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create New Task
          </button>
        </div>
      </div>

      {/* Task Assignment Form */}
      {showTaskForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Assign New Task</h3>
            <button
              onClick={() => setShowTaskForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Task Title*</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Assign To*</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select team member...</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} - {member.position} ({member.currentTasks} active tasks)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Priority*</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Category*</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {taskCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Due Date*</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Estimated Hours</label>
                <input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 8"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Description*</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Provide detailed task description, requirements, and expected deliverables..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Attachments / References</label>
              <input
                type="text"
                value={formData.attachments}
                onChange={(e) => setFormData({...formData, attachments: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Links to documents, tickets, or resources..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-blue-900 mb-1">Task Assignment Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Provide clear, specific task descriptions and success criteria</li>
                    <li>• Consider team member workload before assigning</li>
                    <li>• Set realistic due dates with buffer time for complexity</li>
                    <li>• High priority tasks should be assigned to experienced team members</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Assign Task
              </button>
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl text-orange-600 mt-1">
            {tasks.filter(t => t.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable 
          columns={columns} 
          data={tasks}
          searchable
          searchPlaceholder="Search tasks or team members..."
        />
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Pending Task Approvals</h3>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
            3 Pending
          </span>
        </div>
        <div className="space-y-3">
          {[
            { id: 'T-203', employee: 'David Lee', task: 'Bug Fix: Login Issue', submitted: '2 hours ago' },
            { id: 'T-198', employee: 'Sarah Johnson', task: 'API Integration', submitted: '5 hours ago' },
            { id: 'T-195', employee: 'Mike Chen', task: 'UI Component Update', submitted: '1 day ago' },
          ].map((approval) => (
            <div
              key={approval.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">{approval.task}</p>
                <p className="text-xs text-gray-600">
                  {approval.id} • {approval.employee} • Submitted {approval.submitted}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}