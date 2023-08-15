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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFirebaseServices } from "@/stores/useFirebase";
import { MdModeEdit } from "react-icons/md";

const EditUsernameDialog = () => {
  const [open, setOpen] = useState(false);
  const { updateUsername, currentUser } = useFirebaseServices();
  const [newUsername, setNewUsername] = useState("");
  const uid = currentUser?.uid;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:scale-[1.2] transition ease-in-out">
          <MdModeEdit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit username</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              type="text"
              placeholder="Set new username"
              className="col-span-3"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              updateUsername(uid, newUsername);
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

export default EditUsernameDialog;
