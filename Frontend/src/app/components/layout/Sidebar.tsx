import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Award, 
  BarChart3, 
  FileText,
  UserCircle,
  Building2,
  Shield,
  Calendar,
  TrendingUp,
  Settings,
  Database
} from 'lucide-react';
import type { UserRole } from '@/app/components/auth/RoleSelection';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  userRole: UserRole;
}

const navigationByRole: Record<UserRole, NavItem[]> = {
  'super-admin': [
    { path: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: 'user-management', label: 'User Management', icon: <Users className="w-5 h-5" /> },
    { path: 'system-settings', label: 'System Settings', icon: <Settings className="w-5 h-5" /> },
    { path: 'audit-logs', label: 'Audit Logs', icon: <Database className="w-5 h-5" /> },
    { path: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
  ],
  director: [
    { path: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: 'organization-tasks', label: 'Organization Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { path: 'workforce-analytics', label: 'Workforce Analytics', icon: <Users className="w-5 h-5" /> },
    { path: 'penalty-governance', label: 'Penalty Governance', icon: <Shield className="w-5 h-5" /> },
    { path: 'reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { path: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
  ],
  'general-manager': [
    { path: 'dashboard', label: 'Department Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: 'department-tasks', label: 'Department Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { path: 'attendance-analytics', label: 'Attendance Analytics', icon: <Calendar className="w-5 h-5" /> },
    { path: 'penalty-performance', label: 'Penalty Management', icon: <TrendingUp className="w-5 h-5" /> },
    { path: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
  ],
  'line-manager': [
    { path: 'dashboard', label: 'Team Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: 'team-tasks', label: 'Team Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { path: 'attendance', label: 'Attendance', icon: <Calendar className="w-5 h-5" /> },
    { path: 'penalties', label: 'Penalties', icon: <Award className="w-5 h-5" /> },
    { path: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
  ],
  staff: [
    { path: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: 'my-tasks', label: 'My Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { path: 'my-penalties', label: 'My Penalties', icon: <Award className="w-5 h-5" /> },
    { path: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
  ],
};

export function Sidebar({ userRole }: SidebarProps) {
  const navItems = navigationByRole[userRole];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            userRole === 'super-admin' ? 'bg-purple-600' : 'bg-blue-600'
          }`}>
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg text-gray-900">OMS</h2>
            <p className="text-xs text-gray-500">Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={`/${userRole}/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? userRole === 'super-admin' 
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">© 2026 Office Management System</p>
      </div>
    </div>
  );
}