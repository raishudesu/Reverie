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
import { useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { SignUpSchema } from "@/lib/types";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useFirebaseServices();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "", // Set your default email value here
      password: "", // Set your default password value here
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    try {
      setIsLoading(true);

      await signUp(data.email, data.password, data.username);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 p-10 border rounded-lg">
        <div className="text-3xl font-semibold">Create an account</div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="Your@email.com"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter your password"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading && <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
        </form>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            Have an account?{" "}
            <span>
              <Button variant={"link"} onClick={() => navigate("/")}>
                Sign in
              </Button>
            </span>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default SignUpForm;
