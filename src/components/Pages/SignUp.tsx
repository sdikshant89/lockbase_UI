import { useLockbaseApi } from '@/api/ApiService';
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
import { useEffect, useState } from 'react';
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
  const api = useLockbaseApi();
  const {
    request: fetchCountryCodes,
    isLoading: countryLoading,
    data: countryCodes,
    error: countryError,
  } = api.getCountryCodes;

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
    countryCode: z.string().min(1, 'Select a code'),
    cell: z
      .string()
      .regex(/^\d+$/, 'Should contain only digits')
      .min(7, 'Invalid phone number')
      .max(14, 'Invalid phone number'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      countryCode: '',
      cell: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-11/12 h-auto max-w-md max-h-[95vh]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'linear' }}
        className="bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center"
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
            className="space-y-3 p-5 w-full flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-1">
                    <FormLabel>Full Name</FormLabel>
                  </div>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-1">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative flex justify-start items-center gap-3">
                      <Input
                        className="w-[90%]"
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
            <div className="flex items-center w-full gap-2">
              <div className="basis-1/3">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={(v) => {
                            const dial = v.split('-')[1];
                            field.onChange(dial);
                          }}
                          value={
                            field.value
                              ? `${
                                  countryCodes?.find(
                                    (x) => x.dial_code === field.value
                                  )?.code
                                }-${field.value}`
                              : undefined
                          }
                        >
                          <SelectTrigger
                            className="m-0"
                            disabled={countryLoading}
                          >
                            {countryLoading ? (
                              'Loading...'
                            ) : (
                              <SelectValue placeholder="Code" />
                            )}
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 w-[50%] h-48">
                            {countryLoading && (
                              <div className="px-3 py-2 text-sm">
                                Loading...
                              </div>
                            )}
                            {countryError && (
                              <div className="px-3 py-2 text-sm text-red-600">
                                Failed to load codes
                              </div>
                            )}

                            {!countryLoading &&
                              !countryError &&
                              countryCodes?.map((c) => (
                                <SelectItem
                                  key={c.code}
                                  value={`${c.code}-${c.dial_code}`}
                                  className="
                                cursor-pointer 
                                px-3 py-2 
                                text-sm 
                                hover:bg-neutral-100 
                                dark:hover:bg-neutral-800 
                                data-[state=checked]:bg-neutral-200 
                                dark:data-[state=checked]:bg-neutral-700 
                                data-[highlighted]:bg-neutral-200 
                                dark:data-[highlighted]:bg-neutral-800
                                data-[highlighted]:text-black 
                                dark:data-[highlighted]:text-white
                              "
                                >
                                  {c.name} ({c.dial_code})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-2/3">
                <FormField
                  control={form.control}
                  name="cell"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cell</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="(123)456-789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              className="bg-yellow-200 dark:bg-amber-300 hover:font-bold mt-2 transition-all hover:scale-[1.02] text-black"
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
