import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'

const HeaderLayout = () => {
  return (
    <div className='flex justify-between items-center h-12 w-full my-2'>
        <div className='ml-3 h-full flex justify-center items-center p-1'>
            <Image src={logo} height={50} width={50} alt='logo' className='rounded-full'/>
        </div>
        <div className='mr-3 h-full w-full'>
            <ul className='w-full h-full flex justify-evenly items-center font-medium'>
                <li className='py-2 px-4'>home</li>
                <li className='py-2 px-4'>about</li>
                <li className='py-2 px-4'>contact</li>
                <li className='py-2 px-4'>help</li>
            </ul>
        </div>
    </div>
  )
}

export default HeaderLayout