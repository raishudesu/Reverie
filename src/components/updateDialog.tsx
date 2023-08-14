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
import { Label } from "@/components/ui/label";
import { AiOutlineEdit } from "react-icons/ai";
import { Textarea } from "./ui/textarea";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useState } from "react";

const UpdateDialog = ({ postId }: { postId: number }) => {
  const [updatedPost, setUpdatedPost] = useState("");
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
            <Label htmlFor="post" className="text-right">
              Post
            </Label>
            <Textarea
              id="post"
              className="col-span-3 w-full"
              placeholder="edit post"
              value={updatedPost}
              onChange={(e) => setUpdatedPost(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => updatePost(uid, postId, updatedPost)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
