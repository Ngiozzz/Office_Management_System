import { Users, CheckCircle, Clock, AlertTriangle, X, Calendar, Target } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const weeklyProgress = [
  { day: 'Mon', completed: 8, pending: 4 },
  { day: 'Tue', completed: 10, pending: 3 },
  { day: 'Wed', completed: 9, pending: 2 },
  { day: 'Thu', completed: 12, pending: 1 },
  { day: 'Fri', completed: 11, pending: 2 },
];

const teamMembers = [
  { name: 'Sarah Johnson', status: 'Present', tasks: 5, completed: 4, penalties: 0 },
  { name: 'Mike Chen', status: 'Present', tasks: 4, completed: 3, penalties: 1 },
  { name: 'David Lee', status: 'Present', tasks: 6, completed: 5, penalties: 0 },
  { name: 'Emily Brown', status: 'Late', tasks: 3, completed: 2, penalties: 2 },
  { name: 'John Smith', status: 'Present', tasks: 5, completed: 4, penalties: 0 },
  { name: 'Lisa Wang', status: 'Absent', tasks: 4, completed: 0, penalties: 1 },
];

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
  category: string;
  description: string;
}

const allTasks: Task[] = [
  { id: 'T-201', title: 'Database Schema Update', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-20', category: 'Development', description: 'Update database schema for new features' },
  { id: 'T-202', title: 'API Integration Testing', assignedTo: 'Sarah Johnson', priority: 'Medium', status: 'Pending', dueDate: '2026-02-22', category: 'Testing', description: 'Test all API endpoints' },
  { id: 'T-203', title: 'Security Audit', assignedTo: 'Sarah Johnson', priority: 'High', status: 'In Progress', dueDate: '2026-02-19', category: 'Security', description: 'Conduct security audit' },
  { id: 'T-204', title: 'Performance Optimization', assignedTo: 'Sarah Johnson', priority: 'Medium', status: 'Completed', dueDate: '2026-02-15', category: 'Optimization', description: 'Optimize query performance' },
  { id: 'T-205', title: 'Documentation Update', assignedTo: 'Sarah Johnson', priority: 'Low', status: 'Completed', dueDate: '2026-02-14', category: 'Documentation', description: 'Update API documentation' },
  
  { id: 'T-206', title: 'Code Review: Feature X', assignedTo: 'Mike Chen', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-21', category: 'Review', description: 'Review code for Feature X' },
  { id: 'T-207', title: 'Fix Login Bug', assignedTo: 'Mike Chen', priority: 'High', status: 'In Progress', dueDate: '2026-02-18', category: 'Bug Fix', description: 'Fix authentication issue' },
  { id: 'T-208', title: 'Unit Test Coverage', assignedTo: 'Mike Chen', priority: 'Low', status: 'Pending', dueDate: '2026-02-25', category: 'Testing', description: 'Increase test coverage' },
  { id: 'T-209', title: 'Refactor Payment Module', assignedTo: 'Mike Chen', priority: 'Medium', status: 'Completed', dueDate: '2026-02-12', category: 'Development', description: 'Refactor payment processing' },
  
  { id: 'T-210', title: 'Frontend Component Library', assignedTo: 'David Lee', priority: 'High', status: 'In Progress', dueDate: '2026-02-23', category: 'Development', description: 'Build reusable components' },
  { id: 'T-211', title: 'Dashboard Analytics', assignedTo: 'David Lee', priority: 'High', status: 'In Progress', dueDate: '2026-02-20', category: 'Development', description: 'Implement analytics dashboard' },
  { id: 'T-212', title: 'UI/UX Improvements', assignedTo: 'David Lee', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-24', category: 'Design', description: 'Improve user interface' },
  { id: 'T-213', title: 'Mobile Responsive Design', assignedTo: 'David Lee', priority: 'High', status: 'Completed', dueDate: '2026-02-16', category: 'Development', description: 'Make app responsive' },
  { id: 'T-214', title: 'A/B Testing Setup', assignedTo: 'David Lee', priority: 'Medium', status: 'Completed', dueDate: '2026-02-13', category: 'Testing', description: 'Setup A/B testing framework' },
  { id: 'T-215', title: 'Animation Polish', assignedTo: 'David Lee', priority: 'Low', status: 'Completed', dueDate: '2026-02-10', category: 'Design', description: 'Polish UI animations' },
  
  { id: 'T-216', title: 'Integration Testing', assignedTo: 'Emily Brown', priority: 'High', status: 'In Progress', dueDate: '2026-02-19', category: 'Testing', description: 'Complete integration tests' },
  { id: 'T-217', title: 'Bug Verification', assignedTo: 'Emily Brown', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-21', category: 'Testing', description: 'Verify bug fixes' },
  { id: 'T-218', title: 'Test Automation', assignedTo: 'Emily Brown', priority: 'Low', status: 'Completed', dueDate: '2026-02-11', category: 'Testing', description: 'Automate regression tests' },
  
  { id: 'T-219', title: 'API Documentation', assignedTo: 'John Smith', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-22', category: 'Documentation', description: 'Document API endpoints' },
  { id: 'T-220', title: 'User Guide Creation', assignedTo: 'John Smith', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-23', category: 'Documentation', description: 'Create user guide' },
  { id: 'T-221', title: 'Code Comments', assignedTo: 'John Smith', priority: 'Low', status: 'Pending', dueDate: '2026-02-26', category: 'Documentation', description: 'Add code comments' },
  { id: 'T-222', title: 'Architecture Diagram', assignedTo: 'John Smith', priority: 'Medium', status: 'Completed', dueDate: '2026-02-15', category: 'Documentation', description: 'Create system architecture diagram' },
  { id: 'T-223', title: 'Deployment Guide', assignedTo: 'John Smith', priority: 'High', status: 'Completed', dueDate: '2026-02-14', category: 'Documentation', description: 'Write deployment instructions' },
  
  { id: 'T-224', title: 'Database Optimization', assignedTo: 'Lisa Wang', priority: 'High', status: 'Pending', dueDate: '2026-02-20', category: 'Optimization', description: 'Optimize database queries' },
  { id: 'T-225', title: 'Error Handling', assignedTo: 'Lisa Wang', priority: 'Medium', status: 'Pending', dueDate: '2026-02-24', category: 'Development', description: 'Improve error handling' },
  { id: 'T-226', title: 'Code Cleanup', assignedTo: 'Lisa Wang', priority: 'Low', status: 'Pending', dueDate: '2026-02-28', category: 'Development', description: 'Clean up deprecated code' },
  { id: 'T-227', title: 'Logger Implementation', assignedTo: 'Lisa Wang', priority: 'Medium', status: 'Pending', dueDate: '2026-02-25', category: 'Development', description: 'Implement logging system' },
];

export function TeamDashboard() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleViewTasks = (memberName: string) => {
    if (selectedMember === memberName) {
      setSelectedMember(null); // Collapse if already selected
    } else {
      setSelectedMember(memberName);
    }
  };

  const memberTasks = selectedMember 
    ? allTasks.filter(task => task.assignedTo === selectedMember)
    : [];

  const activeTasks = memberTasks.filter(t => t.status !== 'Completed');
  const completedTasks = memberTasks.filter(t => t.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Team Dashboard</h2>
        <p className="text-gray-600">Team Alpha Overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Team Members"
          value="12"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Tasks This Week"
          value="27"
          icon={CheckCircle}
          trend={{ value: '5 more than last week', isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Present Today"
          value="10/12"
          icon={Users}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Alerts"
          value="2"
          icon={AlertTriangle}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Weekly Task Progress</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="completed" stroke="#10b981" fill="#86efac" name="Completed" />
            <Area type="monotone" dataKey="pending" stroke="#f59e0b" fill="#fbbf24" name="Pending" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Team Members Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Team Members Status</h3>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.name}>
              {/* Member Row */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{member.name}</p>
                  </div>
                  <div className="w-24">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        member.status === 'Present'
                          ? 'bg-green-100 text-green-700'
                          : member.status === 'Late'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                  <div className="w-16 text-sm text-gray-900 text-center">{member.tasks}</div>
                  <div className="w-20 text-sm text-gray-900 text-center">{member.completed}</div>
                  <div className="w-20 text-sm text-center">
                    <span className={member.penalties > 0 ? 'text-amber-600' : 'text-gray-600'}>
                      {member.penalties}
                    </span>
                  </div>
                  <div className="w-20">
                    <button 
                      className={`text-sm ${selectedMember === member.name ? 'text-blue-700 font-medium' : 'text-blue-600'} hover:text-blue-700`}
                      onClick={() => handleViewTasks(member.name)}
                    >
                      {selectedMember === member.name ? 'Hide' : 'View'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Task Details */}
              {selectedMember === member.name && (
                <div className="mt-3 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-900 mb-2">Tasks for {selectedMember}</h4>
                    <p className="text-xs text-gray-600">Total: {memberTasks.length} tasks ({activeTasks.length} active, {completedTasks.length} completed)</p>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600">In Progress</p>
                          <p className="text-lg text-blue-900">{memberTasks.filter(t => t.status === 'In Progress').length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-600">Pending</p>
                          <p className="text-lg text-gray-900">{memberTasks.filter(t => t.status === 'Pending').length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600">Completed</p>
                          <p className="text-lg text-green-900">{completedTasks.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Tasks */}
                  {activeTasks.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-blue-600" />
                        Active Tasks ({activeTasks.length})
                      </h5>
                      <div className="space-y-2">
                        {activeTasks.map((task) => (
                          <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-gray-500">{task.id}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                    task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                    'bg-blue-100 text-blue-700'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {task.status}
                                  </span>
                                </div>
                                <h6 className="text-sm text-gray-900 mb-1">{task.title}</h6>
                                <p className="text-xs text-gray-600">{task.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Calendar className="w-3 h-3" />
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Target className="w-3 h-3" />
                                {task.category}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Tasks */}
                  {completedTasks.length > 0 && (
                    <div>
                      <h5 className="text-xs text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        Completed Tasks ({completedTasks.length})
                      </h5>
                      <div className="space-y-2">
                        {completedTasks.map((task) => (
                          <div key={task.id} className="bg-green-50 border border-green-200 rounded-lg p-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs text-gray-500">{task.id}</span>
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                                    Completed
                                  </span>
                                </div>
                                <h6 className="text-xs text-gray-900">{task.title}</h6>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Calendar className="w-3 h-3" />
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Tasks Message */}
                  {memberTasks.length === 0 && (
                    <div className="text-center py-6 bg-white rounded-lg">
                      <Target className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No tasks assigned to {selectedMember}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          {[
            { type: 'warning', message: 'Lisa Wang is absent today', time: '1 hour ago' },
            { type: 'info', message: 'Emily Brown checked in late (9:15 AM)', time: '2 hours ago' },
            { type: 'success', message: 'David Lee completed all assigned tasks', time: '3 hours ago' },
          ].map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning'
                  ? 'bg-orange-50 border-orange-500'
                  : alert.type === 'info'
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-green-50 border-green-500'
              }`}
            >
              <p className="text-sm text-gray-900">{alert.message}</p>
              <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}