import { motion } from 'motion/react';
import { FcReading } from 'react-icons/fc';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

function AuthorCard() {
  return (
    <div className="absolute bottom-7 left-5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="p-0 transition-all hover:scale-110"
            onClick={() =>
              window.open(
                'https://sharmadshan.netlify.app/',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-zinc-200 rounded-lg flex justify-center items-center gap-2 px-4 py-2 text-xl font-light hover:font-medium transition-all border-2 border-amber-300 dark:border-gray-500 "
            >
              <FcReading className="scale-[1.5]" />
              Dikshant S.
            </motion.div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Meet the Author</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default AuthorCard;
