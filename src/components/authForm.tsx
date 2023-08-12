"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";
import { useSignIn } from "@/stores/useFirebase";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const InputForm = () => {
  const { signIn, currentUser } = useSignIn();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "", // Set your default email value here
      password: "", // Set your default password value here
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await signIn(data.email, data.password);
      toast({
        title: `Welcome ${data.email}`,
      });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 p-10 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-lg">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
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
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" type="submit">
            Sign in
          </Button>
        </form>
        <div className="flex flex-col items-center gap-2">
          <h1>or</h1>
          <Button variant={"ghost"} className="w-full flex items-center gap-2">
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
          <p className="text-sm">
            Doesn't have an account?{" "}
            <span>
              <a href="" className="text-blue-500">
                Sign up
              </a>
            </span>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default InputForm;
