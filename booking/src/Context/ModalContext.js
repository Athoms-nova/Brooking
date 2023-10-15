

import { useState } from "react";
import { createContext } from "react";




export const ModalContext = createContext()

export const ModalContextProvider = ({children}) => {
    const [modalConnection, setModalConnection] = useState(false)
    
    const ModalConnectionVisible = () => {
        setModalConnection(true)
    }

    const ModalConnectionCacher = () => {
        setModalConnection(false)
    }

    return(
        <ModalContext.Provider value={{modalConnection, ModalConnectionVisible, ModalConnectionCacher}}>
            {children}
        </ModalContext.Provider>
    )
}
