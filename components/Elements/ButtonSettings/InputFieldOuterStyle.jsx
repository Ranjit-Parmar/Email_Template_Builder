import React from 'react'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'

const InputFieldOuterStyle = ({label,elementFieldVal,onInputFieldOuterStyle}) => {
  return (
    <div className='flex items-center'>
        <label className='text-sm font-medium text-gray-700'>{label} : </label>
       <div className='flex space-x-3 ml-4'>
        <AlignLeft className={`border ${elementFieldVal==='left'?'text-blue-700':''}`} onClick={()=>onInputFieldOuterStyle('left')}/>
        <AlignCenter className={`border ${elementFieldVal==='center'?'text-blue-700':''}`} onClick={()=>onInputFieldOuterStyle('center')}/>
        <AlignRight className={`border ${elementFieldVal==='right'?'text-blue-700':''}`} onClick={()=>onInputFieldOuterStyle('right')}/>
       </div>
       
    </div>
  )
}

export default InputFieldOuterStyle