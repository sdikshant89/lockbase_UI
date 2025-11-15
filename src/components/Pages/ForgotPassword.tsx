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
import * as motion from 'motion/react-client';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

function ForgotPassword() {
  const FormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
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
                  <div className="mb-1">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="mail@loackbase.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-yellow-200 dark:bg-amber-300 text-black hover:font-bold transition-all hover:scale-[1.02]"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
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

export default ForgotPassword;
