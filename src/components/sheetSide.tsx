"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import ModeToggle from "./mode-toggle";
import { useFirebaseServices } from "@/stores/useFirebase";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { useState } from "react";
import { LucideBookKey } from "lucide-react";
import SignOutDialog from "./signOutDialog";
import ProfilePic from "./profilePic";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

const SheetSide = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, username, profilePicUrl } = useFirebaseServices();

  return (
    <div className="md:hidden ">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side} open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <HiMenuAlt1 size={25} />
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="flex justify-center">
                <LucideBookKey size={30} />
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
              <div className="flex flex-col justify-between items-start gap-4">
                <div className="flex flex-col justify-start items-start gap-6">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                      <ProfilePic profPicUrl={profilePicUrl} />
                    </div>
                    <h1 className="text-md font-bold">{username}</h1>
                  </div>

                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home");
                      setOpen(false);
                    }}
                  >
                    <AiOutlineUser size={20} />
                    Profile
                  </button>
                  <button
                    className="flex gap-2 font-semibold items-center text-xl"
                    onClick={() => {
                      navigate("/home/entries");
                      setOpen(false);
                    }}
                  >
                    <CgNotes size={20} />
                    Entries
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
                    <SignOutDialog />
                  </div>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default SheetSide;
