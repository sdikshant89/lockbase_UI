import AppHeader from '@/components/custom/app-header';
import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

function DashLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full overflow-hidden dark:bg-gradient-to-br bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900 dark:from-zinc-800 dark:via-gray-800 dark:to-zinc-900 dark:text-white  sm:ml-0 ml-4 mt-4 mr-4 mb-4 border-none rounded-2xl relative h-[calc(100vh-2rem)]">
        <div className="sticky top-0 z-20">
          <AppHeader />
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default DashLayout;
