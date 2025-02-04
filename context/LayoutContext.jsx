'use client'
import { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutContextProvider = ({ children }) => {
    const [layoutDataObj, setLayoutDataObj] = useState(null);
    const [layoutDataArray, setLayoutDataArray] = useState([]);
    
    return (
        <LayoutContext.Provider value={{ layoutDataObj, setLayoutDataObj, layoutDataArray, setLayoutDataArray }}>
            {children}
        </LayoutContext.Provider>
    );
}