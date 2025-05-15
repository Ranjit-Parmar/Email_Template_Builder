  'use client';
  import Header from "@/components/Header";
  import Canvas from "@/components/Canvas";
  import Sidebar from "@/components/Sidebar";
  import Settings from "@/components/Settings";
  import RouteGuard from "@/components/RouteGuard";
  import { useContext, useEffect, useState } from "react";
  import { useUserContext } from "@/app/ConvexClientProvider";
  import { useConvex } from "convex/react";
  import { useParams } from "next/navigation";
  import { api } from "@/convex/_generated/api";
  import { LayoutContext } from "@/context/LayoutContext";
  import TemplateSkeleton from "@/components/TemplateSkeleton";

  export default function NewTemplatePage() {

    const [isLoading, setIsLoading] = useState(false)
    const { setLayoutDataArray } = useContext(LayoutContext);

    const {userDetails} = useUserContext();
    const {templateId} = useParams();
    const convex = useConvex();


    useEffect(()=>{

      if(userDetails){
        getEmailTemplate()
      }
      
    },[userDetails])
    
   const getEmailTemplate = async () => {
  setIsLoading(true);

  try {

      const result = await convex.query(api.template.getEmailTemplate, {
       templateId,
       email: userDetails?.email,
     });
        
    // Fallback: result might be null if no template is found
    if (result && result.template) {
      setLayoutDataArray(result.template);
      localStorage.setItem('emailTemplate', JSON.stringify(result.template)); // optionally update localStorage
    } else {
      setLayoutDataArray([]);
    }

  } catch (err) {
    console.error('Error fetching template:', err);
    setLayoutDataArray([]);
  }

  setIsLoading(false);
};


    return (
      <RouteGuard>
          <Header/>
          {!isLoading ? (
    <div className="border grid grid-cols-5">
      <Sidebar />
      <Canvas />
      <Settings />
    </div>
  ) : (
    <TemplateSkeleton />
  )}
      </RouteGuard>
    );
  }
