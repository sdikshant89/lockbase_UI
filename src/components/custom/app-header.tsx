import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { generateThemeSwitch } from './theme-changer';
import { useTheme } from './theme-provider';

function AppHeader() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between bg-blue-400 dark:bg-black ps-6 pe-2 text-white">
      <div className="py-5 flex justify-start items-center gap-3  dark:text-zinc-200">
        <SidebarTrigger className="scale-[1.25] hover:scale-150 transition-all hover:bg-transparent shadow-none dark:text-white" />
        <Separator orientation="vertical" className="font-extrabold" />
        <h1 className="text-xl">Home</h1>
      </div>
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          className="text-white hover:text-white bg-red-400 hover:bg-red-500 dark:bg-red-600 hover:dark:bg-red-800 hover:scale-105 transition-all"
        >
          <LogOut />
          Logout
        </Button>
        <Button
          className="p-0 transition-all hover:scale-110 shadow-none"
          onClick={handleClick}
        >
          {generateThemeSwitch(theme)}
        </Button>
      </div>
    </div>
  );
}

export default AppHeader;
