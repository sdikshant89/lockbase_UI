import { useTheme } from '@/components/custom/theme-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';

export const generateThemeSwitch = (theme: string) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {theme === 'dark' ? (
        <motion.div
          key="light-icon"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 0.9 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Sun className="h-8 w-8 text-zinc-800 dark:text-zinc-100" />
        </motion.div>
      ) : (
        <motion.div
          key="dark-icon"
          initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 0.9 }}
          exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Moon className="h-8 w-8 dark:text-zinc-100" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="absolute top-8 right-5">
      <Button className="p-2 transition-all scale-150" onClick={handleClick}>
        {generateThemeSwitch(theme)}
      </Button>
    </div>
  );
}
