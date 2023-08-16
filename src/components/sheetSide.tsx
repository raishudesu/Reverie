"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineBell, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { useFirebaseServices } from "@/stores/useFirebase";
import { toast } from "./ui/use-toast";
import { MdLogout } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { useState } from "react";
import { LucideBookKey } from "lucide-react";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signOut, loadingFetch, username } =
    useFirebaseServices();
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
        <Sheet key={side} open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <AiOutlineMenu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="flex justify-center">
                <LucideBookKey size={30} />
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4 h-full">
              <div className="flex flex-col justify-between items-start gap-4">
                <div className="flex flex-col justify-start items-start gap-6">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                      <AiOutlineUser size={20} />
                    </div>
                    {loadingFetch ? (
                      <BiLoaderAlt className="animate-spin" size={20} />
                    ) : null}
                    <h1 className="text-md font-bold">{username}</h1>
                  </div>
                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home");
                      setOpen(false);
                    }}
                  >
                    <CgNotes size={20} />
                    Entries
                  </button>
                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home/profile");
                      setOpen(false);
                    }}
                  >
                    <AiOutlineUser size={20} />
                    Profile
                  </button>
                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home/notifications");
                      setOpen(false);
                    }}
                  >
                    <AiOutlineBell size={20} />
                    Notifications
                  </button>
                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home/settings");
                      setOpen(false);
                    }}
                  >
                    <FiSettings size={20} />
                    Settings
                  </button>

                  <ModeToggle />
                </div>

                {currentUser ? (
                  <div className="flex justify-start items-start w-full">
                    <Button
                      variant={"ghost"}
                      onClick={userSignOut}
                      className="flex gap-2 items-center"
                    >
                      <MdLogout size={22} />
                      Sign out
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
