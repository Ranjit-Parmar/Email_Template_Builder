import React from 'react'
import { Textarea } from "@/components/ui/textarea"


const Typography = () => {
  return <div className='bg-white w-full h-full'>
   <Textarea placeholder="Type your message here." style={{fontSize: '20px'}} className="border-transparent hover:border hover:resize resize-none p-2 text-base outline-none w-full h-full"/>
  </div>

}

export default Typography