import AppHeader from '@/components/custom/app-header';
import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

function DashLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full bg-zinc-400">
        <AppHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default DashLayout;
