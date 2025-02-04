import Canvas from "@/components/Canvas";
import Header from "@/components/Header";
import Settings from "@/components/Settings";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <div className="border grid grid-cols-5">
        <Sidebar />
        <Canvas />
        <Settings />
      </div>
    </>
  );
};

export default page;
