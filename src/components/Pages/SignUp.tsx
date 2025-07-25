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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function SignUp() {
  const [viewPass, setViewPass] = useState(false);

  const formSchema = z.object({
    fullname: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password too short!' })
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
      email: '',
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
        className="bg-white rounded-lg flex flex-col justify-center items-center"
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
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rick C-137" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
            <FormField
              control={form.control}
              name="cell"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cell No</FormLabel>
                  <FormControl>
                    <div className="flex justify-start items-center gap-x-2">
                      <Select>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA/US">+1</SelectItem>
                          <SelectItem value="IN">+91</SelectItem>
                          <SelectItem value="CN">+86</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="(123)456-789" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-yellow-200 hover:font-bold mt-2"
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
        className="bg-white h-16 mt-5 rounded-lg flex justify-center items-center"
      >
        <h1>Already have an account</h1>
        <Button variant="link" className="text-blue-500 text-md">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </motion.div>
    </div>
  );
}
