import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputFile = ({
  setImageUpload,
}: {
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files && e.target.files[0];
          if (selectedFile) {
            setImageUpload(selectedFile);
          }
        }}
      />
    </div>
  );
};

export default InputFile;
