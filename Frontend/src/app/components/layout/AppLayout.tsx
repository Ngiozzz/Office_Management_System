import { Outlet, useParams } from 'react-router-dom';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { TopBar } from '@/app/components/layout/TopBar';
import type { UserRole } from '@/app/components/auth/RoleSelection';

interface AppLayoutProps {
  pageTitle: string;
}

export function AppLayout({ pageTitle }: AppLayoutProps) {
  const { role } = useParams();
  const userRole = (role || localStorage.getItem('userRole') || 'staff') as UserRole;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar pageTitle={pageTitle} userRole={userRole} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
