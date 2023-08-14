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
  const { updateUsername, currentUser } = useFirebaseServices();
  const [newUsername, setNewUsername] = useState("");
  const uid = currentUser?.uid;
  return (
    <Dialog>
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
          <div className="grid grid-cols-4 items-center gap-4">
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
          <DialogTrigger>
            {" "}
            <Button
              type="submit"
              onClick={() => updateUsername(uid, newUsername)}
            >
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUsernameDialog;
