import Image from 'next/image'
import React from 'react'
import HeroImage from '@/public/hero.png'

const Hero = () => {
  return (
    <div className='px-10 md:px-28 lg:px-44 flex flex-col items-center mt-10'>        
        <p>Welcome to <span className='text-2xl font-bold text-blue-800'>Email Builder</span> – the ultimate solution to streamline your email campaigns! Our platform empowers you to design, customize, and manage stunning emails with ease.</p>
        <Image
        src={HeroImage}
        alt='HeroImage'
        width={400}
        height={400}
        className='rounded-sm'
        />
    </div>
  )
}

export default Hero