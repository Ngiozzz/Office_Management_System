import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckSquare,
  Clock,
  Tag,
  Paperclip,
  Repeat,
  Users,
  Target
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string;
  department: string;
  dueDate: string;
  dueTime: string;
  estimatedHours: string;
  tags: string[];
  attachments: string;
  recurring: boolean;
  recurrencePattern: string;
  notifyAssignee: boolean;
  watchers: string[];
  successCriteria: string;
}

const teamMembers = [
  { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', department: 'Engineering' },
  { id: 2, name: 'Mike Chen', position: 'Developer', department: 'Engineering' },
  { id: 3, name: 'David Lee', position: 'Developer', department: 'Engineering' },
  { id: 4, name: 'Emily Brown', position: 'QA Engineer', department: 'Finance' },
  { id: 5, name: 'John Smith', position: 'Developer', department: 'Engineering' },
  { id: 6, name: 'Lisa Wang', position: 'Junior Developer', department: 'Engineering' },
  { id: 7, name: 'Jennifer Martinez', position: 'Marketing Manager', department: 'Marketing' },
  { id: 8, name: 'Robert Anderson', position: 'Sales Lead', department: 'Sales' },
];

const taskCategories = [
  'Development',
  'Bug Fix',
  'Testing',
  'Documentation',
  'Code Review',
  'Meeting',
  'Research',
  'Optimization',
  'Design',
  'Planning',
  'Deployment',
  'Training',
  'Other'
];

const availableTags = [
  'Urgent', 'Backend', 'Frontend', 'Database', 'API', 'Security', 
  'Performance', 'UI/UX', 'Client Request', 'Technical Debt', 'Enhancement'
];

export function CreateTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: 'Development',
    priority: 'Medium',
    assignedTo: '',
    department: '',
    dueDate: '',
    dueTime: '',
    estimatedHours: '',
    tags: [],
    attachments: '',
    recurring: false,
    recurrencePattern: 'weekly',
    notifyAssignee: true,
    watchers: [],
    successCriteria: '',
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([
        ...checklist,
        { id: Date.now().toString(), text: newChecklistItem, completed: false }
      ]);
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleToggleTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.description.trim()) newErrors.description = 'Task description is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Please assign the task to someone';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newTask = {
      ...formData,
      id: `T-${Date.now()}`,
      checklist,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    console.log('Task created:', newTask);
    alert('Task created successfully!');
    navigate(-1);
  };

  const selectedMember = teamMembers.find(m => m.name === formData.assignedTo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl text-gray-900">Create New Task</h1>
                <p className="text-sm text-gray-600 mt-1">Fill in the details to assign a new task</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Save className="w-4 h-4" />
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-red-900 mb-1">Please fix the following errors:</h4>
                  <ul className="text-sm text-red-700 list-disc list-inside">
                    {Object.values(errors).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Task Title*</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter a clear, descriptive task title"
                />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Description*</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={5}
                  placeholder="Provide detailed information about the task, requirements, and expected deliverables..."
                />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Category*</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {taskCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Priority*</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskFormData['priority'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low - Can be completed when time permits</option>
                    <option value="Medium">Medium - Normal priority</option>
                    <option value="High">High - Important, needs attention soon</option>
                    <option value="Critical">Critical - Urgent, requires immediate action</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment & Schedule */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Assignment & Schedule
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Assign To*</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => {
                      const member = teamMembers.find(m => m.name === e.target.value);
                      setFormData({ 
                        ...formData, 
                        assignedTo: e.target.value,
                        department: member?.department || ''
                      });
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.assignedTo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select team member...</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name} - {member.position} ({member.department})
                      </option>
                    ))}
                  </select>
                  {errors.assignedTo && <p className="text-xs text-red-600 mt-1">{errors.assignedTo}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Auto-filled based on assignee"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Due Date*</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dueDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dueDate && <p className="text-xs text-red-600 mt-1">{errors.dueDate}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Due Time (Optional)</label>
                  <input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Estimated Hours</label>
                  <input
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 8"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Additional Watchers */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Additional Watchers (Optional)</label>
                <select
                  multiple
                  value={formData.watchers}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, watchers: selected });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  size={4}
                >
                  {teamMembers
                    .filter(m => m.name !== formData.assignedTo)
                    .map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple watchers who will receive updates</p>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Task Details
            </h3>

            <div className="space-y-4">
              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Tag className="w-4 h-4" />
                    Add Tags
                  </button>
                  {showTagDropdown && (
                    <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs transition-colors ${
                              formData.tags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Success Criteria */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Success Criteria</label>
                <textarea
                  value={formData.successCriteria}
                  onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Define what constitutes successful completion of this task..."
                />
              </div>

              {/* Checklist */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Subtasks / Checklist</label>
                <div className="space-y-2 mb-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckSquare className="w-4 h-4 text-gray-400" />
                      <span className="flex-1 text-sm text-gray-900">{item.text}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddChecklistItem())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a subtask or checklist item..."
                  />
                  <button
                    type="button"
                    onClick={handleAddChecklistItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Attachments / References</label>
                <input
                  type="text"
                  value={formData.attachments}
                  onChange={(e) => setFormData({ ...formData, attachments: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Links to documents, Jira tickets, design files, etc."
                />
              </div>
            </div>
          </div>

          {/* Recurrence Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-blue-600" />
              Recurrence Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Repeat className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-900">Make this a recurring task</p>
                    <p className="text-xs text-gray-600">Task will be automatically recreated based on schedule</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.recurring}
                    onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.recurring && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Recurrence Pattern</label>
                  <select
                    value={formData.recurrencePattern}
                    onChange={(e) => setFormData({ ...formData, recurrencePattern: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Notification Settings
            </h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Notify assignee immediately</p>
                  <p className="text-xs text-gray-600">Send email and push notification to the assigned person</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifyAssignee}
                  onChange={(e) => setFormData({ ...formData, notifyAssignee: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
