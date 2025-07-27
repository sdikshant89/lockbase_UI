import { useTheme } from '@/components/custom/theme-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';

function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="absolute top-8 right-5">
      <Button
        className="p-0 transition-all hover:scale-110"
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
  );
}

export default ThemeChanger;
