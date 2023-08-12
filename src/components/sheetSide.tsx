"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { useSignIn } from "@/stores/useFirebase";
import { toast } from "./ui/use-toast";
import { MdLogout } from "react-icons/md";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  const { currentUser, signOut } = useSignIn();
  const userSignOut = () => {
    try {
      signOut();
      toast({
        title: "User signed out.",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:hidden grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <AiOutlineMenu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>reverie.notes</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col justify-center items-center gap-4">
                {currentUser ? (
                  <Button
                    variant={"ghost"}
                    onClick={userSignOut}
                    className="flex gap-2 items-center"
                  >
                    Sign out
                    <MdLogout size={20} />
                  </Button>
                ) : (
                  <>
                    <Button>Sign in</Button>
                    <Button variant={"ghost"}>Sign up</Button>
                  </>
                )}
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
