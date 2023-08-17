import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { toast } from "./ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const FormSchema = z.object({
  post: z.string().min(3, {
    message: "A post must be at least 3 characters.",
  }),
});

const UpdatePostDialog = ({
  postId,
  currentContent,
}: {
  postId: number;
  currentContent: string;
}) => {
  const [open, setOpen] = useState(false);
  const { updatePost } = useFirebaseServices();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      post: currentContent,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    try {
      updatePost(postId, data.post);
      toast({
        title: "Successfully posted!",
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:scale-[1.2] transition ease-in-out">
          <MdModeEdit size={22} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Edit post" {...field} />
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

export default UpdatePostDialog;
