import React, { useContext, useEffect } from 'react'
import Image from 'next/image';
import { SelectedElementContext } from '@/context/SelectedElement';

const LeftImageArticle = ({layout}) => {

    const { selectedElement, setSelectedElement, selectedHeader, setSelectedHeader, selectedHeading, setSelectedHeading, selectedLeftImageArticle, setSelectedLeftImageArticle, selectedRightImageArticle, setSelectedRightImageArticle } = useContext(SelectedElementContext);

    useEffect(()=>{
          if(selectedElement || selectedHeader || selectedHeading || selectedRightImageArticle){
            setSelectedLeftImageArticle();
          }
        },[selectedElement, selectedHeader, selectedHeading, selectedRightImageArticle])
      
        const onClickHandle = ({layout,id}) => {
          setSelectedLeftImageArticle()
          setSelectedRightImageArticle()
          setSelectedHeader()
          setSelectedHeading()
          setSelectedElement({layout,id});
        }
    return (
        <>
        <div className={`flex ${(layout?.type==selectedElement?.layout?.type && layout?.id==selectedElement?.layout?.id) && 'border border-blue-500'} `} onClick={()=>onClickHandle({layout,id:layout?.id})}>
             <div style={layout?.style} className='w-full flex'>
                            {layout?.content}
                        </div>
                        <div style={layout?.outerStyle} className='min-w-44'>
                                <Image 
                                    src={layout?.imageUrl} 
                                    alt='image_placeholder' 
                                    className='w-auto'  // Use inline style to dynamically adjust width
                                    width={300}
                                    height={300}
                                />      
                        </div>
        </div>
        </>
    )
}

export default LeftImageArticle;
