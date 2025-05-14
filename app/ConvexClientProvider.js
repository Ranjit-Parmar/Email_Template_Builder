'use client'
import { ElementContextProvider } from '@/context/ElementContext';
import { LayoutContext } from '@/context/LayoutContext';
import { SelectedElementContext } from '@/context/SelectedElement';
import { SelectedTableCellContext } from '@/context/SelectedTableCell';
import { UserContext } from '@/context/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useContext, useEffect, useState } from 'react';

const ConvexClientProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUserInsideEditor,setIsUserInsideEditor] = useState(false)
  const [layoutDataObj, setLayoutDataObj] = useState(null);
  const [layoutDataArray, setLayoutDataArray] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedTableCell, setSelectedTableCell] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState();
  const [selectedHeading, setSelectedHeading] = useState();
  const [selectedLeftImageArticle, setSelectedLeftImageArticle] = useState();
  const [selectedRightImageArticle, setSelectedRightImageArticle] = useState();

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      const emailTemplate = localStorage.getItem('emailTemplate');
      setUserDetails(userInfo ? JSON.parse(userInfo) : null);
      setLayoutDataArray(emailTemplate ? JSON.parse(emailTemplate) : []);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('emailTemplate', JSON.stringify(layoutDataArray));
    }
  }, [layoutDataArray]);

  useEffect(() => {
    if (selectedElement) {
      const updatedLayoutDataArray = layoutDataArray.map((val) =>
        val.id === selectedElement?.layout?.id ? selectedElement.layout : val
      );
      setLayoutDataArray(updatedLayoutDataArray);
    }
  }, [selectedElement]);

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  // Only render context providers after localStorage is loaded (client-only)
  if (!isLoaded) return null;

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{ userDetails, setUserDetails, isUserInsideEditor,setIsUserInsideEditor }}>
          <LayoutContext.Provider value={{ layoutDataObj, setLayoutDataObj, layoutDataArray, setLayoutDataArray }}>
            <ElementContextProvider>
              <SelectedElementContext.Provider value={{
                selectedElement, setSelectedElement,
                selectedHeader, setSelectedHeader,
                selectedHeading, setSelectedHeading,
                selectedLeftImageArticle, setSelectedLeftImageArticle,
                selectedRightImageArticle, setSelectedRightImageArticle
              }}>
                <SelectedTableCellContext.Provider value={{ selectedTableCell, setSelectedTableCell }}>
                  <div>{children}</div>
                </SelectedTableCellContext.Provider>
              </SelectedElementContext.Provider>
            </ElementContextProvider>
          </LayoutContext.Provider>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};

export default ConvexClientProvider;
