import React, { useState } from 'react'
import hero from '@/public/hero.png';
import { ImageIcon } from 'lucide-react'
import Image from 'next/image';

const RightImageArticle = ({layout}) => {
    const [isImage, setIsImage] = useState(true);
    const [imageWidth, setImageWidth] = useState(100);

    const onChangeHandle = (e) => {
      setImageWidth(e.target.value);
    }

    return (
        <>
        <div className='flex border gap-2'>
            <div className='w-full flex text-center p-1'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, voluptatum. Molestiae quos quaerat, quas at officia, itaque corrupti quod possimus commodi saepe ipsa dolore. Quo quasi repellendus cum et voluptates distinctio ab quibusdam unde laborum corrupti eos, ex ea quam iusto neque, amet voluptatem ratione voluptas?
            </div>
            <div style={{ width: `${imageWidth}%` }} className='w-full flex justify-center items-start border'>
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
