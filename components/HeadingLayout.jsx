import { SelectedElementContext } from '@/context/SelectedElement';
import React, { useContext, useEffect, useState } from 'react';

const HeadingLayout = ({layout}) => {

   const { selectedElement, setSelectedElement, selectedHeader, setSelectedHeader, selectedHeading, setSelectedHeading,  selectedLeftImageArticle, setSelectedLeftImageArticle,
   selectedRightImageArticle, setSelectedRightImageArticle } = useContext(SelectedElementContext);

  useEffect(()=>{
      if(selectedElement || selectedHeader || selectedLeftImageArticle || selectedRightImageArticle){
        setSelectedHeading();
      }
    },[selectedElement, selectedHeader, selectedLeftImageArticle, selectedRightImageArticle])
  
    const onClickHandle = ({layout,id}) => {
      setSelectedHeading({layout,id})
      setSelectedHeader();
      setSelectedElement();
      setSelectedLeftImageArticle();
      setSelectedRightImageArticle();
    }
  return (
      <div className={`h-11 ${(layout?.type==selectedHeading?.layout?.type && layout?.id==selectedHeading?.layout?.id) && 'border border-blue-500'}`} onClick={()=>onClickHandle({layout,id:layout?.id})}> 
      <input type="text" placeholder="Heading" className="text-center h-full text-3xl w-full font-bold outline-none"/>
      </div>
  );
}

export default HeadingLayout;
