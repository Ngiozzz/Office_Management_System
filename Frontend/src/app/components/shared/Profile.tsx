import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function Profile() {
  const { role } = useParams();
  const isSuperAdmin = role === 'super-admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">Profile</h2>
        <p className="text-gray-600">
          {isSuperAdmin ? 'Manage your account information' : 'View your account information'}
        </p>
      </div>

      {!isSuperAdmin && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Only Super Admin can edit user information. Contact your administrator to update your profile.
          </p>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl">
            JD
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl text-gray-900">John Doe</h3>
              {isSuperAdmin && (
                <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            <p className="text-gray-600 mb-4">Software Engineer</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                john.doe@company.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Joined Jan 15, 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Account Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isSuperAdmin}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isSuperAdmin 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              disabled={!isSuperAdmin}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isSuperAdmin 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              disabled={!isSuperAdmin}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isSuperAdmin 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Department</label>
            <input
              type="text"
              defaultValue="Engineering"
              disabled={!isSuperAdmin}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isSuperAdmin 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
        </div>
        {isSuperAdmin && (
          <div className="mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Email Notifications Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Notifications</h3>
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-900 mb-1">Email Notifications Enabled</p>
            <p className="text-xs text-gray-600">
              You will receive email notifications for tasks, penalties, and important updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}