import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const UpdatePostDialog = ({
  postId,
  currentContent,
}: {
  postId: number;
  currentContent: string;
}) => {
  const [open, setOpen] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(currentContent);
  const { updatePost, currentUser } = useFirebaseServices();
  const uid = currentUser?.uid;
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
        <div className="flex w-full ">
          <div className="w-full flex justify-center items-center gap-4">
            <Textarea
              id="post"
              className="col-span-3 w-full scrollbar-thin scrollbar-thumb-gray-400 text-md"
              placeholder="edit post"
              rows={6}
              value={updatedPost}
              onChange={(e) => setUpdatedPost(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              updatePost(uid, postId, updatedPost);
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostDialog;
