import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { motion } from 'motion/react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className="w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto max-w-md max-h-[80vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'linear' }}
        className="rounded-lg flex flex-col justify-center items-center gap-y-10"
      >
        <h1
          className="h-auto mx-4 pt-6 font-semibold text-6xl sm:text-8xl text-center text-wrap text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
          style={{ fontStretch: 'extra-expanded' }}
        >
          Lockdɒƨɘ
        </h1>
        <Link to="/sign-up">
          <Button className="transition ease-in-out bg-white delay-100 text-black hover:-translate-y-1 hover:scale-110 hover:font-bold duration-300 flex justify-center items-center gap-x-1">
            {' '}
            Sign Up
            <ChevronRightIcon className="text-black " />
          </Button>
        </Link>
        <div className="flex justify-center items-center w-1/3 sm:w-1/2 -my-5">
          <Separator className="bg-gray-500 " />{' '}
          <span className="text-gray-400 mx-2">OR</span>
          <Separator className="bg-gray-500 " />
        </div>

        <div className="flex justify-center items-center text-white">
          <span>Already Have an account?</span>
          <Button
            variant="link"
            className="transition ease-in-out delay-100 text-md sm:text-lg hover:-translate-y-1 hover:scale-110 hover:font-bold duration-200 text-blue-600"
          >
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
