import { ModeToggle } from "./mode-toggle";
import { SheetSide } from "./sheetSide";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="fixed top-0 w-full h-[3.5em] shadow-sm shadow-gray-200 dark:shadow-gray-700 flex justify-center items-center">
      <div className="w-full md:w-[75%] flex justify-between items-center gap-4">
        <div className="flex justify-center items-center">
          <SheetSide />

          <h1 className="font-bold text-2xl">reverie.notes</h1>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button>Sign in</Button>
          <Button variant={"ghost"}>Sign up</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
