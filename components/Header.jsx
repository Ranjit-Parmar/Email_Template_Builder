"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.png";
import SignIn from "@/components/SignIn";
import Link from "next/link";
import { useUserContext } from "@/app/ConvexClientProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import SaveTemplateButton from "./SaveTemplate";
import ShareTemplateModal from "./ShareTemplateModal";// ✅ Import the new modal
import { Button } from "./ui/button";

const Header = () => {
  const { userDetails, setUserDetails } = useUserContext();
  const router = useRouter();

  const logOutHandle = () => {
    localStorage.clear();
    setUserDetails(null);
    router.push("/");
  };

  return (
     <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <Image src={logo} width={40} height={40} alt="logo" className="rounded-md" />
        <div className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition">
          Email Builder
        </div>
      </div>

      {/* Right side: Auth actions */}
      {userDetails ? (
        <div className="flex items-center gap-4">
          <SaveTemplateButton />

          {/* Share button */}
          <ShareTemplateModal
            userEmail={userDetails?.email}  // Make sure this is correctly passed
            templateId={"template-id-here"} // Replace this with actual dynamic templateId
            htmlContent={"<p>Template HTML content</p>"}  // Replace with actual HTML content
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Share
              </Button>
            }
          />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={userDetails?.picture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full cursor-pointer border border-gray-300"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full block">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOutHandle}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <SignIn />
      )}
    </header>
  );
};

export default Header;
