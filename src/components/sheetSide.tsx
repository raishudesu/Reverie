"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { useFirebaseServices } from "@/stores/useFirebase";
import { toast } from "./ui/use-toast";
import { MdLogout } from "react-icons/md";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  const { currentUser, signOut } = useFirebaseServices();
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
            <div className="grid gap-4 py-4 h-full">
              <div className="flex flex-col justify-between items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                      <AiOutlineUser size={20} />
                    </div>

                    <h1 className="text-sm">{currentUser?.email}</h1>
                  </div>
                  {currentUser ? (
                    <div className="flex gap-2 font-semibold justify-center items-center text-xl">
                      <AiOutlineUser size={20} />
                      My Reverie
                    </div>
                  ) : (
                    <div className="flex gap-2 font-semibold items-center text-xl">
                      Sign in to use the app
                    </div>
                  )}

                  <ModeToggle />
                </div>

                {currentUser ? (
                  <div className="flex justify-start items-start w-full">
                    <Button
                      variant={"ghost"}
                      onClick={userSignOut}
                      className="flex gap-2 items-center"
                    >
                      Sign out
                      <MdLogout size={20} />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
