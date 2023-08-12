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
    <div className="md:hidden">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <AiOutlineMenu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">Reverie</SheetTitle>
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
                ) : null}
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
