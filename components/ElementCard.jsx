import Image from 'next/image'
import React from 'react'
import imagePlaceholder from '../public/image.png'

const ElementCard = ({element}) => {
  return (
    <div className='flex gap-2 items-center justify-start hover:border border-dashed border-blue-700 rounded-md px-2'>
                      <div>
                        <Image src={element.icon} alt='icon' width={50} height={50}/>
                        <p className='text-sm'>{element.label}</p>
                      </div>
        </div>
  )
}

export default ElementCard