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
import { zodResolver } from '@hookform/resolvers/zod';
import * as motion from 'motion/react-client';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { z } from 'zod';

function Mfa() {
  const { username } = useParams();
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
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    console.log(username);
  }
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-4/5 h-auto max-w-md max-h-[80vh]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
        className="bg-white rounded-lg flex flex-col justify-center items-center"
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
              className="ml-2 bg-yellow-200 hover:font-bold w-24"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}

export default Mfa;
