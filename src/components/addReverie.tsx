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
  post: z.string().min(3, {
    message: "A post must be at least 3 characters.",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-2xl flex justify-center items-center gap-2">
                Post
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's up?"
                  className="text-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full lg:w-[100px] px-6 self-end" type="submit">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default AddReverie;
