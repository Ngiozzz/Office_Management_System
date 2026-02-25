import { useState } from 'react';
import { DataTable } from '@/app/components/shared/DataTable';
import { Plus, Edit, Trash2, Lock, Unlock, Filter, X, Mail, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Director' | 'General Manager' | 'Line Manager' | 'Staff';
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  compliancePoints: number;
}

const users: User[] = [
  { id: 'U-001', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'General Manager', department: 'Engineering', status: 'Active', lastLogin: '2026-02-17 09:30', compliancePoints: 1000 },
  { id: 'U-002', name: 'Mike Chen', email: 'mike.c@company.com', role: 'Line Manager', department: 'Engineering', status: 'Active', lastLogin: '2026-02-17 10:15', compliancePoints: 965 },
  { id: 'U-003', name: 'David Lee', email: 'david.l@company.com', role: 'Staff', department: 'Engineering', status: 'Active', lastLogin: '2026-02-17 08:45', compliancePoints: 990 },
  { id: 'U-004', name: 'Emily Brown', email: 'emily.b@company.com', role: 'Staff', department: 'Finance', status: 'Active', lastLogin: '2026-02-16 16:20', compliancePoints: 845 },
  { id: 'U-005', name: 'Jennifer Martinez', email: 'jennifer.m@company.com', role: 'General Manager', department: 'Sales', status: 'Active', lastLogin: '2026-02-17 09:00', compliancePoints: 1000 },
  { id: 'U-006', name: 'Robert Smith', email: 'robert.s@company.com', role: 'Line Manager', department: 'Marketing', status: 'Inactive', lastLogin: '2026-02-10 14:30', compliancePoints: 980 },
  { id: 'U-007', name: 'Lisa Wang', email: 'lisa.w@company.com', role: 'Staff', department: 'Engineering', status: 'Active', lastLogin: '2026-02-17 11:00', compliancePoints: 955 },
  { id: 'U-008', name: 'John Anderson', email: 'john.a@company.com', role: 'Director', department: 'Executive', status: 'Active', lastLogin: '2026-02-17 07:30', compliancePoints: 1000 },
];

const columns = [
  { key: 'id', header: 'User ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    render: (user: User) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        user.role === 'Director' ? 'bg-purple-100 text-purple-700' :
        user.role === 'General Manager' ? 'bg-blue-100 text-blue-700' :
        user.role === 'Line Manager' ? 'bg-green-100 text-green-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {user.role}
      </span>
    ),
  },
  { key: 'department', header: 'Department' },
  {
    key: 'status',
    header: 'Status',
    render: (user: User) => (
      <span className={`px-3 py-1 rounded-full text-xs ${
        user.status === 'Active' ? 'bg-green-100 text-green-700' :
        user.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
        'bg-red-100 text-red-700'
      }`}>
        {user.status}
      </span>
    ),
  },
  { key: 'compliancePoints', header: 'Points' },
  { key: 'lastLogin', header: 'Last Login' },
];

export function UserManagement() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Staff',
    department: '',
    password: '',
    confirmPassword: '',
    sendEmail: true,
    compliancePoints: '1000',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) newErrors.department = 'Department is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate user creation
    const newUser = {
      id: `U-${String(users.length + 1).padStart(3, '0')}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role as User['role'],
      department: formData.department,
      status: 'Active' as const,
      lastLogin: 'Never',
      compliancePoints: parseInt(formData.compliancePoints),
    };

    console.log('New user created:', newUser);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);

    // Reset form and close modal
    setShowUserForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'Staff',
      department: '',
      password: '',
      confirmPassword: '',
      sendEmail: true,
      compliancePoints: '1000',
      phoneNumber: '',
    });
    setErrors({});
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm text-green-900 mb-1">User Created Successfully!</h4>
            <p className="text-sm text-green-700">
              The user account has been created and {formData.sendEmail ? 'an invitation email has been sent.' : 'login credentials should be shared manually.'}
            </p>
          </div>
          <button onClick={() => setShowSuccessMessage(false)} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Create, edit, and manage all system users</p>
        </div>
        <button 
          onClick={() => setShowUserForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl text-green-600 mt-1">
            {users.filter(u => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Managers</p>
          <p className="text-2xl text-blue-600 mt-1">
            {users.filter(u => u.role.includes('Manager')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Inactive Users</p>
          <p className="text-2xl text-orange-600 mt-1">
            {users.filter(u => u.status === 'Inactive').length}
          </p>
        </div>
      </div>

      {/* User Creation Form - Inline */}
      {showUserForm && (
        <div className="bg-white rounded-lg shadow-md border-2 border-purple-300">
          {/* Form Header */}
          <div className="bg-purple-50 border-b border-purple-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Add New User</h3>
                <p className="text-sm text-gray-600">Create a new user account with role and permissions</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowUserForm(false);
                setErrors({});
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">1</div>
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">First Name*</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Last Name*</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email Address*</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john.doe@company.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Role & Department */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">2</div>
                Role & Department
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">User Role*</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Staff">Staff - Regular employee access</option>
                    <option value="Line Manager">Line Manager - Team management access</option>
                    <option value="General Manager">General Manager - Department oversight</option>
                    <option value="Director">Director - Executive access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Department*</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select department...</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">Human Resources</option>
                    <option value="Operations">Operations</option>
                    <option value="Executive">Executive</option>
                  </select>
                  {errors.department && <p className="text-xs text-red-600 mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Initial Compliance Points</label>
                  <input
                    type="number"
                    value={formData.compliancePoints}
                    onChange={(e) => setFormData({...formData, compliancePoints: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    max="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Default: 1000 points</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">3</div>
                Security & Access
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Initial Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter secure password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                  
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Confirm Password*</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                </p>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">4</div>
                Account Setup
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 mb-1">Welcome Email & Notifications</p>
                    <p className="text-xs text-gray-600">
                      User will receive a welcome email with login credentials and will be automatically enrolled in email notifications for tasks, penalties, and important updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowUserForm(false);
                  setErrors({});
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create User Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">All Users</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
        <DataTable 
          columns={columns} 
          data={users}
          searchable
          searchPlaceholder="Search users by name, email, or department..."
        />
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors">
            <Edit className="w-4 h-4" />
            Bulk Edit
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 border border-green-200 transition-colors">
            <Unlock className="w-4 h-4" />
            Reset Passwords
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 border border-orange-200 transition-colors">
            <Lock className="w-4 h-4" />
            Suspend Users
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border border-red-200 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete Users
          </button>
        </div>
      </div>
    </div>
  );
}