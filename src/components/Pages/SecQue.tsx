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
import { zodResolver } from '@hookform/resolvers/zod';
import * as motion from 'motion/react-client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function SecQue() {
  const { securityQuestionsAPI } = useLockbaseApi();

  const formSchema = z.object({
    question1: z.string().min(1, 'Select a question'),
    question2: z.string().min(1, 'Select a question'),
    answer1: z
      .string({
        required_error: 'Answer is required',
        invalid_type_error: 'Answer must be a string',
      })
      .min(4, 'Answer should be least 4 char long'),
    answer2: z
      .string({
        required_error: 'Answer is required',
        invalid_type_error: 'Answer must be a string',
      })
      .min(4, 'Answer should be least 4 char long'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
    },
  });

  const selectedQuestion1 = form.watch('question1');
  const selectedQuestion2 = form.watch('question2');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    securityQuestionsAPI.getSecurityQuestions();
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
        className="bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center"
      >
        {securityQuestionsAPI.isLoading && (
          <div className="mx-4 my-8">
            <h1 className="mb-4 text-4xl text-amber-300">Loading...</h1>
          </div>
        )}
        {securityQuestionsAPI.error && (
          <div className="mx-4 my-8">
            <h1 className="mb-4 text-4xl text-red-500">Aw Snap!</h1>
            Error Occured, please try refreshing the page
          </div>
        )}
        {!securityQuestionsAPI.isLoading &&
          !securityQuestionsAPI.error &&
          securityQuestionsAPI.data && (
            <>
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
                    name="question1"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Question 1.</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger
                              className="m-0"
                              disabled={securityQuestionsAPI.isLoading}
                            >
                              <SelectValue placeholder="Question" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 w-full h-48">
                              {!securityQuestionsAPI.isLoading &&
                                !securityQuestionsAPI.error &&
                                securityQuestionsAPI.data?.map((c) => (
                                  <SelectItem
                                    key={c.id}
                                    value={String(c.id)}
                                    disabled={
                                      selectedQuestion2 === String(c.id)
                                    }
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
                                    {c.question}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answer1"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-1">
                          <FormLabel>Answer</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Answer to question 1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="question2"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Question 2.</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger
                              className="m-0"
                              disabled={securityQuestionsAPI.isLoading}
                            >
                              <SelectValue placeholder="Question" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 w-full h-48">
                              {!securityQuestionsAPI.isLoading &&
                                !securityQuestionsAPI.error &&
                                securityQuestionsAPI.data?.map((c) => (
                                  <SelectItem
                                    key={c.id}
                                    value={String(c.id)}
                                    disabled={
                                      selectedQuestion1 === String(c.id)
                                    }
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
                                    {c.question}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answer2"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-1">
                          <FormLabel>Answer</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Answer to question 2"
                            {...field}
                          />
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
            </>
          )}
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
