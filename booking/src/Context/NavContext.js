import { async } from "@firebase/util";
import { createRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import NosHotels from "../Page/NosHotels";
import { StyleContext } from "./StyleContext";
import { UserContext } from "./UserContext";

export const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const { deconnexionUser } = useContext(UserContext);
  const [navInfo, setNavInfo] = useState("home");
  const navigation = useNavigate();
  const {
    setCorpHomeClass,
    setFormeConnectClass,
    setPresentationHome,
    corpHomeClass,
    setCardHotelCorp,
    setNosHotelStyle,
    setCorpPageProfil,
  } = useContext(StyleContext);

  const GestionStyleFormReset = async (etatSuivat) => {
    await setFormeConnectClass("form-connection-reset");
    const effect = document.querySelector(".form-connection-reset");
    effect.addEventListener("animationend", (event) => {
      setFormeConnectClass("form-connection");
      setNavInfo(etatSuivat);
      navigation("/" + etatSuivat);
    });
  };

  const URLConnection = (choixCoInscri) => {
    setCorpHomeClass("corp-presentation-sans-animation");
    setPresentationHome("presentation-home");
    setFormeConnectClass("form-connection-bottom");
    if (choixCoInscri !== false) {
      setNavInfo(choixCoInscri);
    }
  };

  const ChargementNextWindo = async(windoNext, deconnection) => {
    if (windoNext === "nos hotels") {
      setNosHotelStyle("nos-hotels");
      setCardHotelCorp("card-hotels-corp");
    } else if (windoNext === "home") {
      setPresentationHome("presentation-home");
      setCorpHomeClass("corp-presentation");
      setFormeConnectClass("form-connection");
    } else if (windoNext === "profil") {
      setCorpPageProfil("corp");
    } else if (["connection", "inscription"].indexOf(windoNext) > -1) {
      if (navInfo === "nos hotels") {
        URLConnection(false);
      } else if (
        (navInfo !== windoNext) &
        ["connection", "inscription"].indexOf(navInfo)
      ) {
        GestionStyleFormReset(windoNext);
      } else {
        GestionStyleFormReset("connection");
      }
    }
    else if(windoNext === "profil"){setCorpPageProfil("corp");}

    if(deconnection){await deconnexionUser();}
    setNavInfo(windoNext);
    if(windoNext === "profil"){navigation("/user/profil")}
    else if(windoNext === "nos hotels"){navigation("/nos-offres")}
    else{navigation("/" + windoNext);}
  };

  const ResetNosHotel = async (windoNext) => {
    setCardHotelCorp("card-hotels-reset");
    await setNosHotelStyle("nos-hotels-reset");
    const effect = document.querySelector(".nos-hotels-reset");
    effect.addEventListener("animationend", (event) => {
      ChargementNextWindo(windoNext, false);
    });
  };

  const ResetProfil = async (windoNext, deconnection) => {
    await setCorpPageProfil("corp-reset");
    const effect = document.querySelector(".corp-reset");
    effect.addEventListener("animationend", (event) => {
      ChargementNextWindo(windoNext, deconnection)
      console.log(windoNext)
    });
  };

  const URLHotels = () => {
    setFormeConnectClass("form-connection-top");
    setNavInfo("nos hotels");
  };

  const OnClickConnection = async () => {
    if (navInfo === "inscription") {
      GestionStyleFormReset("connection");
    } else if (navInfo === "nos hotels") {
      ResetNosHotel("connection");
    } else if (corpHomeClass !== "corp-presentation-sans-animation") {
      setCorpHomeClass("corp-presentation-gauche");
    }
    if ( (navInfo !== "nos hotels") & (navInfo !== "inscription")) {
      setNavInfo("connection");
      navigation("/connection");
    }
  };

  const OnClickInscription = async () => {
    if (navInfo === "connection") {
      GestionStyleFormReset("inscription");
    } else if (navInfo === "nos hotels") {
      ResetNosHotel("inscription");
    } else if (corpHomeClass !== "corp-presentation-sans-animation") {
      setCorpHomeClass("corp-presentation-gauche");
    }
    if ((navInfo !== "nos hotels") & (navInfo !== "connection")) {
      setNavInfo("inscription");
      navigation("/inscription");
    }
  };

  const OnClickLogo = async () => {
    if (navInfo === "nos hotels") {
      ResetNosHotel("home");
    } else if (navInfo === "profil") {
      ResetProfil("home", false)
    } else if ((navInfo !== "home") & (navInfo !== "profil")) {
      setCorpHomeClass("corp-presentation-droit");
    }
    if ((navInfo !== "nos hotels") & (navInfo !== "profil")) {
      setNavInfo("home");
      navigation("/home");
    }
  };

  const OnClickNosHotels = async () => {
    if (navInfo !== "profil") {
      setFormeConnectClass("form-connection-top");
      await setPresentationHome("presentation-home-end");
      const effect = document.querySelector(".presentation-home-end");
      effect.addEventListener("animationend", (event) => {
        setNosHotelStyle("nos-hotels");
        setCardHotelCorp("card-hotels-corp");
        setNavInfo("nos hotels");
        navigation("/nos-offres");
      });
    } else {
      ResetProfil("nos hotels", false)
    }
  };

  const OnClickProfil = async () => {
    if (navInfo === "home") {
      await setPresentationHome("presentation-home-end");
      const effect = document.querySelector(".presentation-home-end");
      effect.addEventListener("animationend", (event) => {
        setCorpPageProfil("corp");
        setNavInfo("profil");
        navigation("/user/profil");
      });
    } else if (navInfo === "nos hotels") {
      ResetNosHotel("profil", false)
    }
  };

  const OnClickButtonDeconnexion = async () => {
    if (navInfo === "profil") {
      ResetProfil("home", true)
    } 
    else {
      await deconnexionUser();
    }
  };

  return (
    <NavContext.Provider
      value={{
        navInfo,
        setNavInfo,
        OnClickConnection,
        OnClickInscription,
        OnClickLogo,
        OnClickNosHotels,
        URLConnection,
        URLHotels,
        OnClickProfil,
        OnClickButtonDeconnexion,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
