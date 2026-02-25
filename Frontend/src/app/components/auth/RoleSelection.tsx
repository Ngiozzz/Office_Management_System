import { useNavigate } from 'react-router-dom';
import { Building2, Users, User, Briefcase, Shield } from 'lucide-react';

export type UserRole = 'super-admin' | 'director' | 'general-manager' | 'line-manager' | 'staff';

interface RoleCard {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  borderColor: string;
}

const roles: RoleCard[] = [
  {
    role: 'super-admin',
    title: 'Super Admin',
    description: 'Full system access, user management, system configuration, and audit controls.',
    icon: <Shield className="w-8 h-8" />,
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700',
    borderColor: 'border-purple-600',
  },
  {
    role: 'director',
    title: 'Director',
    description: 'Oversee organization, view analytics, manage penalties, and strategic planning.',
    icon: <Building2 className="w-8 h-8" />,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    borderColor: 'border-blue-600',
  },
  {
    role: 'general-manager',
    title: 'General Manager',
    description: 'Manage departments, track performance, and oversee line managers.',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    borderColor: 'border-blue-600',
  },
  {
    role: 'line-manager',
    title: 'Line Manager',
    description: 'Lead teams, assign tasks, track attendance, and manage team points.',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    borderColor: 'border-green-600',
  },
  {
    role: 'staff',
    title: 'Staff',
    description: 'Check-in/out, complete tasks, track points, and view attendance history.',
    icon: <User className="w-8 h-8" />,
    color: 'bg-orange-600',
    hoverColor: 'hover:bg-orange-700',
    borderColor: 'border-orange-600',
  },
];

export function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    // Store selected role in localStorage
    localStorage.setItem('userRole', role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl text-gray-900 mb-3">Select Your Role</h1>
          <p className="text-gray-600 text-lg">
            Choose a role to explore the system (Demo Mode)
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((roleCard) => (
            <button
              key={roleCard.role}
              onClick={() => handleRoleSelect(roleCard.role)}
              className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className={`${roleCard.color} ${roleCard.hoverColor} ${roleCard.borderColor} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  {roleCard.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-2">
                    {roleCard.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {roleCard.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Test Mode Notice */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-3">
            <p className="text-sm text-blue-800">
              <strong>Test Mode:</strong> You can switch roles anytime using the role switcher in the top navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}