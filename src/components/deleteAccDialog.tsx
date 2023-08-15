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
import { Button } from "@/components/ui/button";
import { TiDeleteOutline } from "react-icons/ti";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";

const DeleteAccDialog = () => {
  const navigate = useNavigate();
  const { deleteUserAcc } = useFirebaseServices();

  const handleDeleteAcc = () => {
    deleteUserAcc();
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-destructive flex gap-2 hover:text-destructive"
        >
          <TiDeleteOutline size={20} />
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAcc}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccDialog;
