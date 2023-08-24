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
import { AddPostSchema } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { AiOutlineGlobal } from "react-icons/ai";

const AddReverie = () => {
  const { addPost } = useFirebaseServices();

  const form = useForm<z.infer<typeof AddPostSchema>>({
    resolver: zodResolver(AddPostSchema),
  });

  const onSubmit = (data: z.infer<typeof AddPostSchema>) => {
    try {
      addPost(data.display, data.post);
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
        <FormLabel className="text-2xl flex justify-start items-center gap-2">
          Post
        </FormLabel>
        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (
            <FormItem className="self-start">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="self-start">
                  <SelectTrigger>
                    <AiOutlineGlobal size={20} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
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
