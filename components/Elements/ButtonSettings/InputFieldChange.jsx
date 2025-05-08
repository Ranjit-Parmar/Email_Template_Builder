import { Input } from '@/components/ui/input'
import React from 'react'

const InputFieldChange = ({label, fieldName, elementFieldVal, onInputFieldChange}) => {
   const formatInputValue = (value) => {
    return value.replace('px', '');
   }
  return (
    <div >
          <label className='block text-sm font-medium text-gray-700'>
          {label}:
            <Input type="number" value={formatInputValue(elementFieldVal)} onChange={(e)=>onInputFieldChange(fieldName, e.target.value + 'px')}/>
          </label>
        </div>
  )
}

export default InputFieldChange