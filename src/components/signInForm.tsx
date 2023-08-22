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
import { FcGoogle } from "react-icons/fc";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import { SignInSchema } from "@/lib/types";

const SignInForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useFirebaseServices();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "", // Set your default email value here
      password: "", // Set your default password value here
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 p-10 border rounded-lg">
        <div className="text-3xl font-semibold text-center">Sign in</div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
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
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading && <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
        <div className="flex flex-col items-center gap-2">
          <h1>or</h1>
          <Button
            variant={"outline"}
            className="w-full flex items-center gap-2"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
          <div className="text-sm">
            Doesn't have an account?{" "}
            <span>
              <Button
                variant={"link"}
                onClick={() => navigate("/signup")}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </span>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignInForm;
