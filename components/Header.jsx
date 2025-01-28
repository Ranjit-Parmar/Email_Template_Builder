import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import SignIn from '@/components/SignIn'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='p-3 shadow-md flex justify-between items-center'>
        <div className='flex gap-2 items-center'>

        <Image
        src={logo}
        width={40}
        height={40}
        alt='logo'
        className='rounded-md'
        />
        <span className='font-bold text-blue-800'>Email Builder</span>
        </div>
        <SignIn/>
    </div>
  )
}

export default Header