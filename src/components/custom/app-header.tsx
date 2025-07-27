import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { useTheme } from './theme-provider';

function AppHeader() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between bg-sidebar px-4">
      <div className="py-5 flex justify-start items-center gap-3  dark:text-zinc-200">
        <SidebarTrigger className="scale-[1.25]" />
        <Separator orientation="vertical" className="font-extrabold" />
        <h1 className="text-2xl">Home</h1>
      </div>
      <div className="flex items-center">
        <Button
          className="p-0 transition-all hover:scale-110 shadow-none"
          onClick={handleClick}
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.img
                key="light-icon"
                src="/LightMode.png"
                className="scale-90"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 0.75 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            ) : (
              <motion.img
                key="dark-icon"
                src="/DarkMode.png"
                className="scale-90"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 0.75 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}

export default AppHeader;
