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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useFirebaseServices } from "@/stores/useFirebase";

const FormSchema = z.object({
  post: z
    .string()
    .min(3, {
      message: "A post must be at least 3 characters.",
    })
    .max(160, {
      message: "A post must not be longer than 30 characters.",
    }),
});

const AddReverie = () => {
  const { addPost } = useFirebaseServices();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    try {
      addPost(data.post);
      toast({
        title: "Successfully posted!",
      });
      form.setValue("post", "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post reverie</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's happening?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="px-6" type="submit">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default AddReverie;
