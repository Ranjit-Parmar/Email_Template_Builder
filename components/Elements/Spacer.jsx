import React from 'react'

const Spacer = ({element}) => {
  return (
    <div style={element?.style} className='h-6 w-full bg-white'></div>
  )
}

export default Spacer