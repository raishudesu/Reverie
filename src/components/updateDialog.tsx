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
import { AiOutlineEdit } from "react-icons/ai";
import { Textarea } from "./ui/textarea";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useState } from "react";

const UpdateDialog = ({
  postId,
  currentContent,
}: {
  postId: number;
  currentContent: string;
}) => {
  const [updatedPost, setUpdatedPost] = useState(currentContent);
  const { updatePost, currentUser } = useFirebaseServices();
  const uid = currentUser?.uid;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:scale-[1.2] transition ease-in-out">
          <AiOutlineEdit size={25} />
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
              className="col-span-3 w-full resize-none"
              placeholder="edit post"
              value={updatedPost}
              onChange={(e) => setUpdatedPost(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button
              type="submit"
              onClick={() => updatePost(uid, postId, updatedPost)}
            >
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
