"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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

const Header = () => {
  const { userDetails, setUserDetails } = useUserContext();
  const router = useRouter();

  const logOutHandle = () => {
    localStorage.removeItem('userInfo');
    setUserDetails(null);
    router.push('/');
  }

  return (
    <div className="p-3 shadow-md flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image
          src={logo}
          width={40}
          height={40}
          alt="logo"
          className="rounded-md"
        />
        <span className="font-bold text-blue-800">Email Builder</span>
      </div>

      {userDetails ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={userDetails?.picture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={'/editor'}>
                Editor
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>logOutHandle()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Header;
