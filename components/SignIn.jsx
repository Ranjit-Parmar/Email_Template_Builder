'use client';
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'

const SignIn = () => {
    
const googleLogin = useGoogleLogin({

    onSuccess: async (tokenResponse) => {

      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
      );

      console.log(userInfo);

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