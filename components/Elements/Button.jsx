import React from 'react'

const Button = ({element}) => {

  const onButtonClickHandle = () => {
    alert(`Button clicked: ${element?.url}`)
  }
  return (
    <div style={element.outerStyle} >
        <input style={element.style} type='button' value={element?.content} className='p-3' onClick={onButtonClickHandle}/>
    </div>
  )
}

export default Button