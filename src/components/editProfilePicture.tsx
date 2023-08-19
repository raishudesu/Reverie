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
import { useState } from "react";
import { useFirebaseServices } from "@/stores/useFirebase";
import InputFile from "./inputFile";

const EditProfilePicture = () => {
  const [open, setOpen] = useState(false);
  const [noFile, setNoFile] = useState(false);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { uploadProfilePic } = useFirebaseServices();

  const handleUpload = () => {
    if (imageUpload) {
      uploadProfilePic(imageUpload);
      setOpen(false);
      setImageUpload(null);
      setNoFile(false);
    } else {
      setNoFile(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <InputFile setImageUpload={setImageUpload} />
        {noFile && (
          <div className="text-destructive text-sm">Select a file</div>
        )}
        <DialogFooter>
          <Button type="submit" className="md:self-end" onClick={handleUpload}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePicture;
