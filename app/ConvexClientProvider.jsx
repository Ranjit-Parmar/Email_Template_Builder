'use client'
import { ElementContextProvider } from '@/context/ElementContext';
import { LayoutContextProvider } from '@/context/LayoutContext';
import { UserContext } from '@/context/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useContext, useEffect, useState } from 'react';

const ConvexClientProvider = ({ children }) => { 

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                setUserDetails(userInfo);  // If user info exists in localStorage, set it in context
            } else {
                setUserDetails(null);  
            }
    }, []);

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserContext.Provider value={{userDetails, setUserDetails}}>
                    <LayoutContextProvider>
                        <ElementContextProvider>
                            <div>{children}</div>
                        </ElementContextProvider>
                    </LayoutContextProvider>
                </UserContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}


export const useUserContext = () => {
    return useContext(UserContext);
  };

export default ConvexClientProvider;
