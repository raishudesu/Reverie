import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsKey } from "react-icons/bs";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useState } from "react";
import { UpdatePwdSchema } from "@/lib/types";

const UpdatePwdDialog = () => {
  const [open, setOpen] = useState(false);
  const { updateUserPwd, currentUser } = useFirebaseServices();

  const form = useForm<z.infer<typeof UpdatePwdSchema>>({
    resolver: zodResolver(UpdatePwdSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UpdatePwdSchema>) => {
    try {
      updateUserPwd(data.password);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const provider = currentUser?.providerData[0].providerId;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {provider === "password" ? (
          <Button variant={"ghost"} className="flex gap-2">
            <BsKey size={20} /> Change password
          </Button>
        ) : (
          <Button variant={"ghost"} disabled className="flex gap-2">
            <BsKey size={20} /> Change password
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 md:self-end">
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePwdDialog;
