import React from 'react'
import defaultImage from '@/public/hero.png'
import Image from 'next/image'

const ImageElement = ({element}) => {

  return (
    <div style={element?.style?.outerStyle} >
        <Image style={element?.style?.innerStyle} width={500} height={500} src={element?.imageUrl || defaultImage} alt='defaultImage' />
    </div>
  )
}

export default ImageElement