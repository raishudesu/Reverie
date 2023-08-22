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
import { RxUpdate } from "react-icons/rx";
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
import { EditEmailSchema } from "@/lib/types";

const EditEmailDialog = () => {
  const [open, setOpen] = useState(false);

  const { updateUserEmail, currentUser } = useFirebaseServices();

  const form = useForm<z.infer<typeof EditEmailSchema>>({
    resolver: zodResolver(EditEmailSchema),
    defaultValues: {
      email: "", // Set your default email value here
    },
  });

  const onSubmit = (data: z.infer<typeof EditEmailSchema>) => {
    try {
      updateUserEmail(data.email);
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
            <RxUpdate size={20} /> Update email
          </Button>
        ) : (
          <Button variant={"ghost"} disabled className="flex gap-2">
            <RxUpdate size={20} /> Update email
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update email</DialogTitle>
          <DialogDescription>
            Make changes to your email here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
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
                      placeholder={currentUser?.email as string | undefined}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 md:self-end">
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmailDialog;
