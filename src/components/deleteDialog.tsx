import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BsFillTrashFill } from "react-icons/bs";
import { useFirebaseServices } from "@/stores/useFirebase";

const DeleteDialog = ({ postId }: { postId: number }) => {
  const { deletePost, currentUser } = useFirebaseServices();
  const uid = currentUser?.uid;
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <BsFillTrashFill
          size={20}
          className="hover:scale-[1.2] transition ease-in-out"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost(uid, postId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
