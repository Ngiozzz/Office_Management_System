import { Bell, ChevronDown, CheckCircle, AlertTriangle, Info, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '@/app/components/auth/RoleSelection';

interface TopBarProps {
  pageTitle: string;
  userRole: UserRole;
}

const roleLabels: Record<UserRole, string> = {
  'super-admin': 'Super Admin',
  director: 'Director',
  'general-manager': 'General Manager',
  'line-manager': 'Line Manager',
  staff: 'Staff',
};

const roleColors: Record<UserRole, string> = {
  'super-admin': 'bg-purple-100 text-purple-700',
  director: 'bg-purple-100 text-purple-700',
  'general-manager': 'bg-blue-100 text-blue-700',
  'line-manager': 'bg-green-100 text-green-700',
  staff: 'bg-orange-100 text-orange-700',
};

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Task Due Soon',
    message: 'Database Schema Update is due in 2 hours',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Penalty Issued',
    message: 'You have been assigned a penalty for late arrival',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Task Completed',
    message: 'Your task "API Documentation" has been approved',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Security Audit"',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Meeting Reminder',
    message: 'Team standup meeting at 3:00 PM today',
    time: '4 hours ago',
    read: true,
  },
];

export function TopBar({ pageTitle, userRole }: TopBarProps) {
  const navigate = useNavigate();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const handleRoleSwitch = (newRole: UserRole) => {
    localStorage.setItem('userRole', newRole);
    navigate(`/${newRole}/dashboard`);
    setShowRoleSwitcher(false);
  };

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Page Title */}
      <h1 className="text-xl text-gray-900">{pageTitle}</h1>

      {/* Right Side: Notifications & User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-[600px] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <p className="text-xs text-gray-500">{unreadCount} unread</p>
                    )}
                  </div>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                </div>

                {/* Notifications List */}
                <div className="divide-y divide-gray-100">
                  {notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm ${!notification.read ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {notificationList.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No notifications</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
              JD
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-900">John Doe</p>
              <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${roleColors[userRole]}`}>
                {roleLabels[userRole]}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Role Switcher Dropdown */}
          {showRoleSwitcher && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowRoleSwitcher(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">SWITCH ROLE (DEMO)</p>
                </div>
                {(['super-admin', 'director', 'general-manager', 'line-manager', 'staff'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      role === userRole ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className={`text-sm px-2 py-1 rounded ${roleColors[role]}`}>
                      {roleLabels[role]}
                    </span>
                  </button>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => navigate('/role-selection')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Back to Role Selection
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}