import { SidebarTrigger } from '../ui/sidebar';

function AppHeader() {
  return (
    <div className="py-4 pl-4 flex justify-start items-center gap-3 bg-sidebar">
      <SidebarTrigger className="scale-110" />
      <h1 className="text-2xl">Dashboard</h1>
    </div>
  );
}

export default AppHeader;
