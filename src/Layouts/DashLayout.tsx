import AppHeader from '@/components/custom/app-header';
import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

function DashLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full bg-indigo-100 dark:bg-zinc-400 mt-4 mr-4 mb-4 border-none rounded-2xl overflow-hidden">
        <AppHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default DashLayout;
