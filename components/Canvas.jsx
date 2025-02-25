'use client'
import React, { useContext, useState } from "react";
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

const Canvas = () => {

  const [viewPort, setViewPort] = useState('desktop');
  const {layoutDataObj, setLayoutDataObj, layoutDataArray, setLayoutDataArray} = useContext(LayoutContext);
  const { setSelectedHeader } = useContext(SelectedElementContext);
  const {setElementDataObj} = useContext(ElementContext);
  const [isDraggingLayout, setIsDraggingLayout] = useState(false);
  

  const onDragOverHandle = (e) => {
    e.preventDefault();
    if(layoutDataObj?.dragValue){
      setIsDraggingLayout(true);
    }
  }

  const onDragLeaveHandle = () => {
    setIsDraggingLayout(false);
  }

  const onDropHandle = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsDraggingLayout(false);
    
    if(layoutDataObj?.dragValue){
      setLayoutDataArray((prev) => [...prev, layoutDataObj?.dragValue]);
      setSelectedHeader(layoutDataObj?.dragValue)
      setLayoutDataObj(null);
      setElementDataObj(null);
    }
};

  const getLayoutHandle = (layout) => {
        
    if(layout?.type==='column'){
      return <ColumnsLayout layout={layout}/>
    }else if(layout?.type==='heading'){
      return <HeadingLayout layout={layout}/>
    }else if(layout?.type==='left-image-article'){
      return <LeftImageArticle layout={layout}/>
    }else if(layout?.type==='right-image-article'){
      return <RightImageArticle layout={layout}/>
    }else if(layout?.type==='header'){
      return <HeaderLayout layout={layout}/>
    }
    return layout?.type;
  }
  
  return (
    <>
      <div className="col-span-3 h-screen bg-gray-100 space-y-5 overflow-y-auto custom-scrollbar">
        <div className="flex gap-4 justify-center items-center mt-2">
          <Image
            src={mobile}
            alt="mobile_icon"
            width={35}
            height={35}
            className={`${viewPort==='mobile'? 'bg-slate-200 border border-dashed border-blue-600' : ''} p-1`}
            onClick={()=>setViewPort('mobile')}
          />
          <Image
            src={desktop}
            alt="desktop_icon"
            width={35}
            height={35}
            className={`${viewPort==='desktop'? 'bg-slate-200 border border-dashed border-blue-600' : ''} p-1`}
            onClick={()=>setViewPort('desktop')}
          />
        </div>

        <div className="mt-20 flex justify-center">
          <div className={`bg-white p-5 w-full ${viewPort==='desktop'?'max-w-2xl':'max-w-md'}
           ${isDraggingLayout ?'!bg-green-100 p-3' : ''}

           `}
               onDragOver={onDragOverHandle}
               onDragLeave={onDragLeaveHandle}
               onDrop={(e)=>onDropHandle(e)}
          >
                
                {layoutDataArray?.length > 0 && layoutDataArray?.map((layout,i)=>{
                  return <div key={i}>
                    {getLayoutHandle(layout)}
                  </div>
                }) || <h2 className="p-4 text-center bg-gray-100 border border-dashed text-gray-500">Add layout here</h2>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
