

import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import { NavContext } from "./NavContext";




export const RouteContext = createContext()

export const RouteContextProvider = ({children}) => {
    const actuelURL = useLocation()
    const {URLConnection,URLHotels} = useContext(NavContext)

    useEffect( () => {
        if(actuelURL.pathname === "/connection"){ 
            URLConnection("connection")
        }
        else if(actuelURL.pathname === "/inscription"){ 
            URLConnection("inscription")
        }
        else if(actuelURL.pathname === "/nos-offres"){
            URLHotels()
        }
    }, [])

    return(
        <RouteContext.Provider value={{actuelURL}}>
            {children}
        </RouteContext.Provider>
    )
}
