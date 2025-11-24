import { useLockbaseApi } from '@/api/ApiService';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/imputOtp';
import { setVerified } from '@/store/slices/signUpSlice';
import { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

function Mfa() {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const { verifyOtpAPI } = useLockbaseApi();
  const signUpState = useSelector((state: RootState) => state.signUp);

  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const res = await verifyOtpAPI.verifyOtp({
        email: signUpState.email,
        otp: values.otp,
      });
      if (!res?.success) {
        toast.warning('OTP could not be verified', {
          description:
            res?.errorMessage || 'Something went wrong, try refreshing page',
        });
        return;
      }
      toast.success('Success!', {
        description: 'User Registration Successful',
      });
      dispatch(setVerified(true));
    } catch {
      toast.error('Network error', {
        description: 'Please check your connection and try again',
      });
    }
  }
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  async function handleResend() {
    try {
      // const res = await verifyOtpAPI.resendOtp({
      //   email: signUpState.email,
      // });
      // if (!res?.success) {
      //   toast.warning("Could not resend OTP", {
      //     description: res?.errorMessage || "Try again",
      //   });
      //   return;
      // }
      // toast.success("OTP sent!", {
      //   description: "A new OTP has been emailed to you",
      // });
      setTimeLeft(120);
    } catch {
      toast.error('Network error');
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-4/5 h-auto max-w-md max-h-[80vh]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
        className="bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center"
      >
        <h1
          className="h-auto mx-4 pt-6 font-semibold text-5xl text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
          style={{ fontStretch: 'extra-expanded' }}
        >
          Enter OTP
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-5 md:ml-8 mb-3 w-full flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mt-4 mb-2 ml-4 scale-105">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                    <br />
                    <span className="font-light text-red-400">
                      (check spam folder too)
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="ml-2 mt-4 bg-yellow-200 dark:bg-amber-300 hover:font-bold transition-all hover:scale-[1.02] text-black w-24"
              type="submit"
            >
              {verifyOtpAPI.isLoading && (
                <LoaderCircle className="animate-spin h-5 w-5" />
              )}

              {!verifyOtpAPI.isLoading &&
                !verifyOtpAPI.data &&
                !verifyOtpAPI.error &&
                'Verify'}

              {verifyOtpAPI.error && 'Try Again'}
            </Button>
          </form>
        </Form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'linear' }}
        className="bg-white dark:bg-gray-800  h-16 mt-5 rounded-lg flex justify-center items-center gap-2"
      >
        <h1>Didn't receive email OTP?</h1>
        {timeLeft === 0 ? (
          <Button
            variant="link"
            className="text-blue-500 text-md"
            onClick={handleResend}
          >
            Resend OTP
          </Button>
        ) : (
          <p className="text-sm text-gray-500">
            Resend available in {formatTime(timeLeft)}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Mfa;
