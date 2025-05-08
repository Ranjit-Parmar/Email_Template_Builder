import { Input } from '@/components/ui/input'
import React from 'react'

const InputButton = ({label, fieldName, elementFieldVal, onInputContentChange}) => {
    
  return (
    <div >
      <label className='block text-sm font-medium text-gray-700'>
      {label}:
        <Input type="text" value={elementFieldVal} onChange={(e)=>onInputContentChange(fieldName, e.target.value)}/>
      </label>
    </div>
  )
}

export default InputButton