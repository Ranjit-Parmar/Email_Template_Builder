import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

import { SelectedElementContext } from '@/context/SelectedElement';

const HeaderLayout = ({layout}) => {
  const { selectedElement, setSelectedElement, setSelectedHeader, selectedHeading, setSelectedHeading,  selectedLeftImageArticle, setSelectedLeftImageArticle,
    selectedRightImageArticle, setSelectedRightImageArticle } = useContext(SelectedElementContext);
  
  
    

  useEffect(()=>{
    if(selectedElement || selectedHeading || selectedLeftImageArticle || selectedRightImageArticle){
      setSelectedHeader();
    }
  },[selectedElement, selectedHeading, selectedLeftImageArticle, selectedRightImageArticle])

  const onClickHandle = ({layout,id}) => {
    setSelectedHeader()
    setSelectedElement({layout,id});
    setSelectedHeading();
    setSelectedLeftImageArticle();
    setSelectedRightImageArticle();
  }

  const isSelected = layout?.type === selectedElement?.layout?.type && layout?.id === selectedElement?.layout?.id;
  
  return (
   
    <header style={layout?.outerStyle} className={`${isSelected && 'border border-blue-500'}`} onClick={()=>onClickHandle({layout,id:layout?.id})}>
      {layout?.imageStyle?.position === 'left' && 
      <Image
        style={layout?.imageStyle} 
        src={layout?.imageStyle?.imageUrl} 
        height={50} 
        width={50} 
        alt='logo'
        />}
      <nav style={{...layout?.style, "backgroundColor": layout?.outerStyle?.backgroundColor}}>
        {
          layout?.links?.map((val,i)=>(
                <a key={i} className='flex items-center justify-center py-2 px-4'>{val}</a>
              ))
        }
      </nav>
      {layout?.imageStyle?.position === 'right' && 
      <Image
        style={layout?.imageStyle}
        src={layout?.imageStyle?.imageUrl} 
        height={50} 
        width={50} 
        alt='logo'
      />}
    </header>
  )
}

export default HeaderLayout