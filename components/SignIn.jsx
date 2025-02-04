'use client';
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const SignIn = () => {
    
const createdUser = useMutation(api.users.createUser);   


const googleLogin = useGoogleLogin({

    onSuccess: async (tokenResponse) => {

      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
      );

      const user = userInfo.data;

    const result = await createdUser({
        name: user?.name,
        email: user?.email,
        profile: user?.picture,
      })

      const userDetails = {...user,_id:result?.id ?? result}
      
      if(typeof window!==undefined){
        localStorage.setItem('userInfo', JSON.stringify(userDetails));
      }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div className='bg-blue-600 p-3 font-normal rounded-sm text-white cursor-pointer' onClick={googleLogin}>
          Get Started
    </div>
  )
}

export default SignIn