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

const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useFirebaseServices();

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
      form.reset();
      navigate("/home");
    } catch (error) {
      console.log(error);
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
                  <Input placeholder="Your@email.com" {...field} />
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-2" type="submit">
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
              <Button variant={"link"} onClick={() => navigate("/signup")}>
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
