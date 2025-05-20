"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import mobile from "@/public/mobile.png";
import desktop from "@/public/desktop.png";
import Image from "next/image";
import ColumnsLayout from "./ColumnsLayout";
import { LayoutContext } from "@/context/LayoutContext";
import HeadingLayout from "./HeadingLayout";
import LeftImageArticle from "./LeftImageArticle";
import RightImageArticle from "./RightImageArticle";
import { ElementContext } from "@/context/ElementContext";
import HeaderLayout from "./HeaderLayout";
import { SelectedElementContext } from "@/context/SelectedElement";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { cleanHtmlForEmail } from "@/utils/cleanHtmlForEmail";

const Canvas = () => {
  const [viewPort, setViewPort] = useState("desktop");
  const {
    layoutDataObj,
    setLayoutDataObj,
    layoutDataArray,
    setLayoutDataArray,
    setLayoutHTML
  } = useContext(LayoutContext);
  const { setSelectedHeader, selectedElement, setSelectedElement } = useContext(SelectedElementContext);
  const { setElementDataObj } = useContext(ElementContext);
  const [isDraggingLayout, setIsDraggingLayout] = useState(false);
  const htmlRef = useRef()

  useEffect(()=>{
  getHTMLCode()
  })
  const onDragOverHandle = (e) => {
    e.preventDefault();
    if (layoutDataObj?.dragValue) {
      setIsDraggingLayout(true);
    }
  };

  const onDragLeaveHandle = () => {
    setIsDraggingLayout(false);
  };

  const onDropHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingLayout(false);

    if (layoutDataObj?.dragValue) {
      setLayoutDataArray((prev) => [...prev, layoutDataObj?.dragValue]);
      setSelectedHeader(layoutDataObj?.dragValue);
      setLayoutDataObj(null);
      setElementDataObj(null);
    }
  };

  const getLayoutHandle = (layout) => {
    if (layout?.type === "column") {
      return <ColumnsLayout layout={layout} />;
    } else if (layout?.type === "heading") {
      return <HeadingLayout layout={layout} />;
    } else if (layout?.type === "left-image-article") {
      return <LeftImageArticle layout={layout} />;
    } else if (layout?.type === "right-image-article") {
      return <RightImageArticle layout={layout} />;
    } else if (layout?.type === "header") {
      return <HeaderLayout layout={layout} />;
    }
    return layout?.type;
  };

  const deleteHandle = (layoutId) => {
     const updatedLayout = layoutDataArray.filter(val=>val.id != layoutId)
          setLayoutDataArray(updatedLayout)
          setSelectedElement(null)
  };
  const MoveUpHandle = (layoutId) => {

    const layoutIndex = layoutDataArray.findIndex(val=>val.id === layoutId)

    if(layoutDataArray[layoutIndex-1] === undefined){
      return
    }else{
      if(layoutIndex > 0){
          setLayoutDataArray((prev)=>{
          let updatedlayout = [...prev];
          [[updatedlayout[layoutIndex], updatedlayout[layoutIndex-1]]=[updatedlayout[layoutIndex-1], updatedlayout[layoutIndex]]]
          return updatedlayout
        })
      }
    }
  };
  const MoveDownHandle = (layoutId) => {

    const layoutIndex = layoutDataArray.findIndex(val=>val.id === layoutId)
   if(layoutDataArray[layoutIndex+1] === undefined){
      return
    }else{
    if(layoutIndex > 0){
      setLayoutDataArray((prev)=>{
        let updatedlayout = [...prev];
        [[updatedlayout[layoutIndex], updatedlayout[layoutIndex+1]]=[updatedlayout[layoutIndex+1], updatedlayout[layoutIndex]]]
        return updatedlayout
      })
    }
  }
  };

  const getHTMLCode = () => {
  if (htmlRef.current) {
    const rawHTML = htmlRef.current.innerHTML;
    const cleaned = cleanHtmlForEmail(rawHTML);
    setLayoutHTML(cleaned);
  }
};
  return (
    <>
      <div className=" col-span-3 h-screen bg-gray-100 space-y-5 overflow-y-auto custom-scrollbar">
        <div className=" flex gap-4 justify-center items-center mt-2">
          <Image
            src={mobile}
            alt="mobile_icon"
            width={35}
            height={35}
            className={`${viewPort === "mobile" ? "bg-slate-200 border border-dashed border-blue-600" : ""} p-1`}
            onClick={() => setViewPort("mobile")}
          />
          <Image
            src={desktop}
            alt="desktop_icon"
            width={35}
            height={35}
            className={`${viewPort === "desktop" ? "bg-slate-200 border border-dashed border-blue-600" : ""} p-1`}
            onClick={() => setViewPort("desktop")}
          />
        </div>

        <div className=" mt-20 flex justify-center">
          <div
            className={` bg-white p-5 w-full ${viewPort === "desktop" ? "max-w-2xl" : "max-w-md"}
           ${isDraggingLayout ? "!bg-green-100 p-3" : ""}

           `}
            onDragOver={onDragOverHandle}
            onDragLeave={onDragLeaveHandle}
            onDrop={(e) => onDropHandle(e)}
            ref={htmlRef}
          >
            {(layoutDataArray?.length > 0 &&
              layoutDataArray?.map((layout, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="relative">
                      {getLayoutHandle(layout)}
                   {
                    selectedElement?.layout?.id == layout?.id &&
                    <div className="absolute top-0 bottom-0 justify-center items-center -right-10 flex flex-col">
                       <div className="cursor-pointer p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"  onClick={() => deleteHandle(layout.id)}>
                          <Trash className="h-4 w-4 text-red-500"/>
                      </div>
                       <div className="cursor-pointer bg-blue-200 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"  onClick={() => MoveUpHandle(layout.id)}>
                          <ArrowUp className="h-4 w-4"/>
                      </div>
                       <div className="cursor-pointer bg-blue-200 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"  onClick={() => MoveDownHandle(layout.id)}>
                          <ArrowDown className="h-4 w-4"/>
                      </div>
                   </div>
                   }
                      </div>
                  </React.Fragment>
                );
              })) || (
              <h2 className="p-4 text-center bg-gray-100 border border-dashed text-gray-500">
                Add layout here
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
