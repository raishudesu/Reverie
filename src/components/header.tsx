import { ModeToggle } from "./mode-toggle";
import { SheetSide } from "./sheetSide";
import { useFirebaseServices } from "@/stores/useFirebase";
import { LucideBookKey } from "lucide-react";
const Header = () => {
  const { currentUser } = useFirebaseServices();
  return (
    <div className="backdrop-blur-md fixed top-0 p-2 w-full h-[3.5em] border-b flex justify-center items-center">
      <div
        className={
          currentUser
            ? "w-full md:w-[75%] flex justify-start md:justify-center items-center gap-4"
            : "w-full md:w-[75%] flex justify-evenly md:justify-between items-center gap-4"
        }
      >
        <div className="flex justify-center items-center gap-2">
          {currentUser && <SheetSide />}
          <LucideBookKey />
          <h1 className="font-bold text-2xl">Reverie</h1>
        </div>
        {!currentUser ? <ModeToggle /> : null}
      </div>
    </div>
  );
};

export default Header;
