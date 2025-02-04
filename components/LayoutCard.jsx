import React from 'react'
import Image from 'next/image';

const LayoutCard = ({layout}) => {
  return (
    <div className='flex gap-2 items-center justify-start hover:border border-dashed border-blue-700 rounded-md px-2'>
                  <div>
                    <Image src={layout.icon} alt='icon' width={50} height={50}/>
                    <p className='text-sm'>{layout.label}</p>
                  </div>
    </div>
  )
}

export default LayoutCard