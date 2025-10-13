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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Is it better to loop into two group of question and answer or hardcode it?
// How to prepoluate?
// How to add an option of having once's own custom security question?

function SecQue() {
  const formSchema = z.object({
    fullname: z.string({
      required_error: 'Answer is required',
      invalid_type_error: 'Name must be a string',
    }),
    password: z
      .string()
      .min(4, {
        message: 'Answer too short! Not recommended for security purposes',
      })
      .max(20, { message: 'Max 20 characters allowed!' }),
    cell: z
      .number()
      .positive()
      .min(7, { message: 'Invalid phone number' })
      .max(14, { message: 'Invalid phone number' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      password: '',
      cell: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 h-auto max-w-md max-h-[95vh]"
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
          Lockdɒƨɘ
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 p-5 w-full flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-1">
                    <FormLabel>Answer</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cell"
              render={() => (
                <FormItem>
                  <div className="mb-1">
                    <FormLabel>Security Question</FormLabel>
                  </div>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA/US">+1</SelectItem>
                        <SelectItem value="IN">+91</SelectItem>
                        <SelectItem value="CN">+86</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <div className="mb-1">
                    <FormLabel>Answer</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-yellow-200 dark:bg-amber-300 hover:font-bold mt-2 transition-all hover:scale-[1.02]"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: 'linear' }}
        className="bg-white dark:bg-gray-800  h-16 mt-5 rounded-lg flex justify-center items-center"
      >
        <h1>Already have an account</h1>
        <Button variant="link" className="text-blue-500 text-md">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default SecQue;
