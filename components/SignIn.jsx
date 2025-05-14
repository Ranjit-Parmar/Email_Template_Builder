'use client';
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserContext } from '@/app/ConvexClientProvider';
import { useRouter } from 'next/navigation'; // ✅ import router

const SignIn = () => {
  const createdUser = useMutation(api.users.createUser);
  const { setUserDetails } = useUserContext();
  const router = useRouter(); // ✅ define router

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse?.access_token}`,
            },
          }
        );

        const user = userInfo.data;

        const result = await createdUser({
          name: user?.name,
          email: user?.email,
          profile: user?.picture,
        });

        const fullUserDetails = {
          ...user,
          _id: result?.id ?? result,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('userInfo', JSON.stringify(fullUserDetails));
        }

        setUserDetails(fullUserDetails);

        // ✅ Navigate to recent templates page
        router.push('/dashboard');
      } catch (err) {
        console.error('Google login error:', err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div
      className="bg-blue-600 p-3 font-normal rounded-sm text-white cursor-pointer"
      onClick={googleLogin}
    >
      Get Started
    </div>
  );
};

export default SignIn;
