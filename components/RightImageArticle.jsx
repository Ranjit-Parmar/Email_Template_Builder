import React, { useContext, useEffect, useState } from 'react'
import hero from '@/public/hero.png';
import { ImageIcon } from 'lucide-react'
import Image from 'next/image';
import { SelectedElementContext } from '@/context/SelectedElement';

const RightImageArticle = ({layout}) => {
    const [isImage, setIsImage] = useState(true);
    const [imageWidth, setImageWidth] = useState(100);
    const { selectedElement, setSelectedElement, selectedHeader, setSelectedHeader, selectedHeading, setSelectedHeading, selectedLeftImageArticle, setSelectedLeftImageArticle, selectedRightImageArticle, setSelectedRightImageArticle } = useContext(SelectedElementContext);

    const onChangeHandle = (e) => {
      setImageWidth(e.target.value);
    }

    useEffect(()=>{
              if(selectedElement || selectedHeader || selectedHeading || selectedLeftImageArticle){
                setSelectedRightImageArticle();
              }
            },[selectedElement, selectedHeader, selectedHeading, selectedLeftImageArticle])
          
            const onClickHandle = ({layout,id}) => {
              setSelectedRightImageArticle({layout,id})
              setSelectedLeftImageArticle()
              setSelectedHeader()
              setSelectedHeading()
              setSelectedElement();
            } 

    return (
        <>
          <div className={`flex gap-2 ${(layout?.type==selectedRightImageArticle?.layout?.type && layout?.id==selectedRightImageArticle?.layout?.id) && 'border border-blue-500'} `} onClick={()=>onClickHandle({layout,id:layout?.id})}>
            <div style={layout?.style} className='w-full flex'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, voluptatum. Molestiae quos quaerat, quas at officia, itaque corrupti quod possimus commodi saepe ipsa dolore. Quo quasi repellendus cum et voluptates distinctio ab quibusdam unde laborum corrupti eos, ex ea quam iusto neque, amet voluptatem ratione voluptas?
            </div>
            <div style={{ width: `${imageWidth}%` }} className='w-full flex justify-center items-start min-w-44'>
                {isImage ? (
                    <Image 
                        src={hero} 
                        alt='image_placeholder' 
                        className='w-auto'  // Use inline style to dynamically adjust width
                    />
                ) : (
                    <ImageIcon className='h-24 w-auto'/>
                )}
            </div>
        </div>
        <input type="range" min="0" max="100" value={imageWidth} onChange={onChangeHandle} />
        </>
    )
}

export default RightImageArticle;
