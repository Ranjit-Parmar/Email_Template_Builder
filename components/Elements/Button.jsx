import React from 'react'

const Button = ({element}) => {
  return (
    <div className='bg-white h-full w-full'>
        <input style={element.style} type='button' value="Click me" className='p-3' />
    </div>
  )
}

export default Button