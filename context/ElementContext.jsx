'use client'
import { createContext, useState } from "react";

export const ElementContext = createContext();

export const ElementContextProvider = ({ children }) => {

    const [ elementDataObj, setElementDataObj ] = useState(null);
    return (
        <ElementContext.Provider value={{elementDataObj, setElementDataObj }}>
            {children}
        </ElementContext.Provider>
    );
}