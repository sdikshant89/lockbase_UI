import { resetSignUp } from '@/store/slices/signUpSlice';
import { RootState } from '@/store/store';
import { ChevronsRight, SquareArrowOutUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { EncryptedText } from '../ui/encrypted-text';

function SignUpSuccess() {
  const dispatch = useDispatch();
  const signUpState = useSelector((state: RootState) => state.signUp);

  const handleReset = () => {
    dispatch(resetSignUp());
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-11/12 h-auto max-w-md max-h-[95vh] p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
        className="bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center"
      >
        <p className="my-6 mx-5 text-center text-3xl text-gray-700 dark:text-gray-300 ">
          Welcome <br />
          <div className="font-semibold text-5xl text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400 flex justify-center items-center gap-2 hover:scale-110 transition-all 3s">
            <EncryptedText text={signUpState.username} revealDelayMs={115} />
          </div>
        </p>
        <p>Your account has been successfully created.</p>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          You can now sign in and start using Lockbase.
        </p>

        <div className="flex justify-center items-center w-full my-5 gap-2">
          <Link to="/sign-up" onClick={handleReset}>
            <Button className="bg-purple-200 dark:bg-purple-400 text-black hover:font-bold transition-all hover:scale-[1.02]">
              Sign up for new account <SquareArrowOutUpRight />
            </Button>
          </Link>

          <Link to="/sign-in" onClick={handleReset}>
            <Button className="bg-yellow-200 dark:bg-amber-300 text-black hover:font-bold transition-all hover:scale-[1.02] flex justify-center items-center gap-1">
              <div>Sign In</div>
              <ChevronsRight />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUpSuccess;
