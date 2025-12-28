// import googleIcon from '@/components/icons/google.png';
// import metaIcon from '@/components/icons/meta.png';
// import xIcon from '@/components/icons/x.png';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

function SignIn() {
  const [viewPass, setViewPass] = useState(false);
  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password too short!' }).max(20),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 h-auto max-w-md max-h-[80vh]"
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
          Lockbase
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-5 w-full flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="mail@loackbase.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link to="/forgot-pass">
                      <Button
                        variant="link"
                        className="p-0 text-right font-light text-blue-600 dark:text-blue-400"
                      >
                        Forgot Password?
                      </Button>
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative flex justify-start items-center gap-3">
                      <Input
                        type={viewPass ? 'text' : 'password'}
                        placeholder="password"
                        {...field}
                      />
                      {viewPass ? (
                        <EyeOpenIcon onClick={() => setViewPass(false)} />
                      ) : (
                        <EyeNoneIcon onClick={() => setViewPass(true)} />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-yellow-200 dark:bg-amber-300 text-black hover:font-bold transition-all hover:scale-[1.02]"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>
        {/* <div className="flex justify-center items-center w-28 my-1">
          <Separator className="bg-gray-500" />{' '}
          <span className="text-gray-400 mx-2 text-nowrap">
            OR continue with
          </span>
          <Separator className="bg-gray-500 " />
        </div>
        <div className="h-12 w-full mt-2 mb-4 flex justify-center items-center overflow-hidden">
          <Button className="h-full shadow-none">
            <img
              src={googleIcon}
              alt="Google"
              className="w-full h-full object-contain"
            />
          </Button>
          <Button className="h-full shadow-none">
            <img
              src={metaIcon}
              alt="Meta"
              className="w-full h-full object-contain"
            />
          </Button>
          <Button className="h-full shadow-none">
            <img src={xIcon} alt="X" className="w-full h-full object-contain" />
          </Button>
        </div> */}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'linear' }}
        className="bg-white dark:bg-gray-800 h-16 mt-5 rounded-lg flex justify-center items-center"
      >
        <h1>Don't have an account?</h1>
        <Link to="/sign-up">
          <Button variant="link" className="text-blue-500 text-md p-2">
            Sign Up
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default SignIn;
