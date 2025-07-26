import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { FcLinux } from 'react-icons/fc';
import { Link } from 'react-router';

function RequireAuth() {
  // Logic to check if the user is logged in the application
  // if not logged in then return below

  return (
    <BackgroundGradientAnimation
      gradientBackgroundEnd="rgb(120,0,0)"
      firstColor="255,69,0"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 h-auto max-w-md max-h-[80vh]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
          className="bg-white py-4 px-6 rounded-lg flex flex-col justify-start items-center"
        >
          <h1 className="h-auto w-max py-4 font-medium text-5xl flex justify-center items-center">
            <FcLinux className="size-16" /> Aw Snap!
          </h1>
          <p className="font-light text-lg w-auto text-center">
            Looks like you’ve wandered into the VIP section only the chosen ones
            may pass! 😅 Try logging in first, and we’ll roll out the red carpet
            to your dashboard!
          </p>
          <Link to="/sign-in">
            <Button className="my-4 bg-blue-300 hover:font-bold text-md font-light">
              Sign In <ArrowRight />
            </Button>
          </Link>
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}

export default RequireAuth;
