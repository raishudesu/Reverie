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
import { useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";

const FormSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useFirebaseServices();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "", // Set your default email value here
      password: "", // Set your default password value here
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await signUp(data.email, data.password);
      toast({
        title: `Account successfully created`,
      });
      form.reset();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 p-10 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-lg">
        <div className="text-3xl font-semibold">Create an account</div>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="re-enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-2" type="submit">
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
