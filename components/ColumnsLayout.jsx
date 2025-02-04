import { ElementContext } from "@/context/ElementContext";
import { LayoutContext } from "@/context/LayoutContext";
import React, { useState, useContext } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Button from "./Elements/Button";
import DataTable from "./Elements/Table";
import ImageElement from "./Elements/Image";
import Typography from "./Elements/Typography";
import Divider from "./Elements/Divider";
import Spacer from "./Elements/Spacer";


const ColumnsLayout = ({ layout }) => {

  const { setLayoutDataArray, setLayoutDataObj } = useContext(LayoutContext);
  const {elementDataObj, setElementDataObj} = useContext(ElementContext);
  const [dragOver, setDragOver] = useState(null);
  const [isDraggingElement, setIsDraggingElement] = useState(false);

 
  const onDragOverHandle = (e,index) => {
    e.preventDefault();
    
    if(elementDataObj?.dragValue){
      setIsDraggingElement(true)
     setDragOver({
       index : index,
       columnId : layout.id
     })
    }
  }

  const onDragLeaveHandle = () => {
    setIsDraggingElement(false);
  }

  const onDropHandle = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    if(elementDataObj?.dragValue){     
      setLayoutDataArray((pre)=>
      pre.map((val)=>val.id==dragOver?.columnId?{...val,[dragOver.index]:elementDataObj?.dragValue}:val)
      )
            
      setLayoutDataObj(null);
      setElementDataObj(null);
    }
    setIsDraggingElement(false);
  }

  const getElementHandle = (element) => {  
    if(element?.type === 'button'){
      return <Button element={element}/>
    }else if(element?.type === 'table'){
      return <DataTable element={element}/>
    }else if(element?.type === 'image'){
      return <ImageElement element={element}/>  
    }else if(element?.type === 'typography'){
      return <Typography element={element}/> 
    }else if(element?.type === 'divider'){
      return <Divider element={element}/>
    }else if(element?.type === 'spacer'){
      return <Spacer element={element}/>
    }  
    return element?.type;
  }

  return (

    <ResizablePanelGroup direction="horizontal"
      style={{
        display: "flex",
        gap: "0px",
      }}
      className="group "
  
    >

      {Array.from({ length: layout.numOfColumns }).map((_, index) => {
        return (
          <React.Fragment key={index}>
          <ResizablePanel
            minSize={layout.numOfColumns === 4? 20 : 25}
            style={{...layout?.style, backgroundColor: (index==dragOver?.index && dragOver?.columnId && isDraggingElement) ?  '#dcfce7' : '#f3f4f6'}}
            onDragOver={(e)=>onDragOverHandle(e,index)}
            onDragLeave={onDragLeaveHandle}
            onDrop={(e)=>onDropHandle(e,index)}
            >
            
            {getElementHandle(layout?.[index]) || "Add element here"}
            

            
          </ResizablePanel>
          {index !== layout.numOfColumns - 1 && <ResizableHandle withHandle className="opacity-0 group-hover:opacity-100 w-0"/>}
         
            </React.Fragment>
        );
      })}
    </ResizablePanelGroup>
  );
};

export default ColumnsLayout;


