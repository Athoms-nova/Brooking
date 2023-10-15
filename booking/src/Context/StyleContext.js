import { useEffect } from "react";
import { createContext, useState } from "react";

export const StyleContext = createContext();

export const StyleContextProvider = ({ children }) => {
    const [corpHomeClass, setCorpHomeClass] = useState("corp-presentation") 
    const [presentationHome, setPresentationHome] = useState("presentation-home")
    const [formeConnectClass, setFormeConnectClass] = useState("form-connection")
    const [formeConnectClassParent, setFormeConnectClassParent] = useState("connection")
    const [cardHotelCorp, setCardHotelCorp] = useState("card-hotel-corp")
    const [nosHotelStyle, setNosHotelStyle] = useState("nos-hotels")
    const [corpPageProfil, setCorpPageProfil] = useState("corp")

    useEffect(() => {
      
  }, [formeConnectClass])
  return (
    <StyleContext.Provider
      value={{ corpHomeClass, setCorpHomeClass, 
        formeConnectClass, setFormeConnectClass, 
        presentationHome, setPresentationHome, 
        formeConnectClassParent, setFormeConnectClassParent,
        cardHotelCorp, setCardHotelCorp,
        nosHotelStyle, setNosHotelStyle,
        corpPageProfil, setCorpPageProfil
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
