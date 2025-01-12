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
import * as motion from 'motion/react-client';
import { useForm } from 'react-hook-form';

function SignIn() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto max-w-md max-h-[80vh]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: 0.5, ease: 'linear' }}
        className="bg-white rounded-lg flex flex-col justify-center items-center"
      >
        <h1
          className="h-auto mx-4 pt-6 font-semibold text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-orange-400"
          style={{ fontStretch: 'extra-expanded' }}
        >
          Lockdɒƨɘ
        </h1>
        <Form {...form}>
          <form className="space-y-4 p-5 w-full flex flex-col justify-center">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@loackbase.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-yellow-200" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'linear' }}
        className="bg-white h-16 mt-5 rounded-lg flex justify-center items-center"
      >
        <h1>Forgot Password?</h1>
        <Button variant="link" className="text-blue-500">
          Reset
        </Button>
      </motion.div>
    </div>
  );
}

export default SignIn;
