import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, Check, Play } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
  points: number;
}

const tasks: Task[] = [
  {
    id: 'T-201',
    title: 'Database Schema Update',
    description: 'Update user table schema to include new fields',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-02-05',
    points: 50,
  },
  {
    id: 'T-207',
    title: 'Bug Fix: UI Issue',
    description: 'Fix alignment issue in dashboard cards',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-02-04',
    points: 50,
  },
  {
    id: 'T-208',
    title: 'Write Unit Tests',
    description: 'Create unit tests for authentication module',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-02-07',
    points: 50,
  },
  {
    id: 'T-209',
    title: 'Update Documentation',
    description: 'Update API documentation with new endpoints',
    priority: 'Low',
    status: 'Pending',
    dueDate: '2026-02-08',
    points: 30,
  },
  {
    id: 'T-210',
    title: 'Performance Review',
    description: 'Analyze and optimize database queries',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2026-02-10',
    points: 75,
  },
];

export function MyTasks() {
  const [filter, setFilter] = useState<'all' | 'Completed' | 'In Progress' | 'Pending'>('all');
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleAcceptTask = (taskId: string) => {
    setTaskList(taskList.map(task => 
      task.id === taskId ? { ...task, status: 'In Progress' as const } : task
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    setTaskList(taskList.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' as const } : task
    ));
  };

  const filteredTasks = filter === 'all' ? taskList : taskList.filter((task) => task.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">My Tasks</h2>
        <p className="text-gray-600">Track and manage your assigned tasks</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['all', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              filter === status
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {status === 'all' ? 'All Tasks' : status}
            <span className="ml-2 text-sm">
              ({status === 'all' ? taskList.length : taskList.filter((t) => t.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <p className="text-2xl text-gray-900 mt-1">{taskList.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl text-blue-600 mt-1">
            {taskList.filter((t) => t.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl text-green-600 mt-1">
            {taskList.filter((t) => t.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl text-orange-600 mt-1">
            {taskList.filter((t) => t.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Kanban View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg text-gray-900">Pending</h3>
            <span className="ml-auto px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
              {taskList.filter((t) => t.status === 'Pending').length}
            </span>
          </div>
          <div className="space-y-3">
            {taskList
              .filter((t) => t.status === 'Pending')
              .map((task) => (
                <TaskCard key={task.id} task={task} handleAcceptTask={handleAcceptTask} />
              ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg text-gray-900">In Progress</h3>
            <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
              {taskList.filter((t) => t.status === 'In Progress').length}
            </span>
          </div>
          <div className="space-y-3">
            {taskList
              .filter((t) => t.status === 'In Progress')
              .map((task) => (
                <TaskCard key={task.id} task={task} handleCompleteTask={handleCompleteTask} />
              ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg text-gray-900">Completed</h3>
            <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
              {taskList.filter((t) => t.status === 'Completed').length}
            </span>
          </div>
          <div className="space-y-3">
            {taskList
              .filter((t) => t.status === 'Completed')
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, handleAcceptTask, handleCompleteTask }: { task: Task, handleAcceptTask?: (taskId: string) => void, handleCompleteTask?: (taskId: string) => void }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-gray-500">{task.id}</span>
        <span
          className={`px-2 py-0.5 rounded text-xs ${
            task.priority === 'High'
              ? 'bg-red-100 text-red-700'
              : task.priority === 'Medium'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {task.priority}
        </span>
      </div>
      <h4 className="text-sm text-gray-900 mb-2">{task.title}</h4>
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>{task.dueDate}</span>
        </div>
        <span className="text-purple-600">+{task.points} pts</span>
      </div>
      
      {/* Action Buttons */}
      {handleAcceptTask && task.status === 'Pending' && (
        <button
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptTask(task.id);
          }}
        >
          <Play className="w-3 h-3" />
          Accept Task
        </button>
      )}
      {handleCompleteTask && task.status === 'In Progress' && (
        <button
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleCompleteTask(task.id);
          }}
        >
          <Check className="w-3 h-3" />
          Mark Complete
        </button>
      )}
    </div>
  );
}