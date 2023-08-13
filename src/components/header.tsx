import { ModeToggle } from "./mode-toggle";
import { SheetSide } from "./sheetSide";
import { useFirebaseServices } from "@/stores/useFirebase";

const Header = () => {
  const { currentUser } = useFirebaseServices();
  return (
    <div className="fixed top-0 p-2 w-full h-[3.5em] shadow-sm shadow-gray-200 dark:shadow-gray-700 flex justify-center items-center">
      <div
        className={
          currentUser
            ? "w-full md:w-[75%] flex justify-start md:justify-center items-center gap-4"
            : "w-full md:w-[75%] flex justify-between items-center gap-4"
        }
      >
        <div className="flex justify-center items-center gap-2">
          {currentUser && <SheetSide />}

          <h1 className="font-bold text-2xl">Reverie</h1>
        </div>
        {!currentUser ? <ModeToggle /> : null}
      </div>
    </div>
  );
};

export default Header;
