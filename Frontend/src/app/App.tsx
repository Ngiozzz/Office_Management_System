import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from '@/app/components/auth/SignIn';
import { RoleSelection } from '@/app/components/auth/RoleSelection';
import { AppLayout } from '@/app/components/layout/AppLayout';

// Super Admin Components
import { SuperAdminDashboard } from '@/app/components/super-admin/SuperAdminDashboard';
import { UserManagement } from '@/app/components/super-admin/UserManagement';
import { SystemSettings } from '@/app/components/super-admin/SystemSettings';
import { AuditLogs } from '@/app/components/super-admin/AuditLogs';

// Director Components
import { ExecutiveDashboard } from '@/app/components/director/ExecutiveDashboard';
import { OrganizationTasks } from '@/app/components/director/OrganizationTasks';
import { WorkforceAnalytics } from '@/app/components/director/WorkforceAnalytics';
import { PenaltyGovernance } from '@/app/components/director/PenaltyGovernance';
import { Reports } from '@/app/components/director/Reports';

// General Manager Components
import { DepartmentDashboard } from '@/app/components/general-manager/DepartmentDashboard';
import { DepartmentTasks } from '@/app/components/general-manager/DepartmentTasks';
import { AttendanceAnalytics } from '@/app/components/general-manager/AttendanceAnalytics';
import { PenaltyPerformance } from '@/app/components/general-manager/PenaltyPerformance';

// Line Manager Components
import { TeamDashboard } from '@/app/components/line-manager/TeamDashboard';
import { TeamTasks } from '@/app/components/line-manager/TeamTasks';
import { Attendance } from '@/app/components/line-manager/Attendance';
import { Penalties } from '@/app/components/line-manager/Penalties';

// Staff Components
import { StaffDashboard } from '@/app/components/staff/StaffDashboard';
import { MyTasks } from '@/app/components/staff/MyTasks';
import { MyPenalties } from '@/app/components/staff/MyPenalties';

// Shared Components
import { Profile } from '@/app/components/shared/Profile';
import { CreateTask } from '@/app/components/shared/CreateTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<AppLayout pageTitle="Super Admin Dashboard" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Shared Routes - accessible by all roles */}
        <Route path="/create-task" element={<CreateTask />} />

        {/* Director Routes */}
        <Route path="/director" element={<AppLayout pageTitle="Executive Dashboard" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ExecutiveDashboard />} />
          <Route path="organization-tasks" element={<OrganizationTasks />} />
          <Route path="workforce-analytics" element={<WorkforceAnalytics />} />
          <Route path="penalty-governance" element={<PenaltyGovernance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* General Manager Routes */}
        <Route path="/general-manager" element={<AppLayout pageTitle="Department Dashboard" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DepartmentDashboard />} />
          <Route path="department-tasks" element={<DepartmentTasks />} />
          <Route path="attendance-analytics" element={<AttendanceAnalytics />} />
          <Route path="penalty-performance" element={<PenaltyPerformance />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Line Manager Routes */}
        <Route path="/line-manager" element={<AppLayout pageTitle="Team Dashboard" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeamDashboard />} />
          <Route path="team-tasks" element={<TeamTasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="penalties" element={<Penalties />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<AppLayout pageTitle="Dashboard" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="my-penalties" element={<MyPenalties />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;