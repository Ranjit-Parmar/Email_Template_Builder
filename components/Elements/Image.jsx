import React from 'react'
import defaultImage from '@/public/hero.png'
import Image from 'next/image'

const ImageElement = ({element}) => {
  return (
    <div style={element?.outerStyle} >
        <Image style={element?.innerStyle} src={defaultImage} alt='defaultImage' />
    </div>
  )
}

export default ImageElement