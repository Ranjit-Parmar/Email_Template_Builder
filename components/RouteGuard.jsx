// components/RouteGuard.js
"use client";
import { useUserContext } from "@/app/ConvexClientProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RouteGuard = ({ children }) => {

  const { userDetails } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.push("/"); // Redirect to sign-in if not logged in
    }
  }, [userDetails, router]);

  if (!userDetails) return null; // Or return a loading spinner

  return <>{children}</>;
  
};

export default RouteGuard;
