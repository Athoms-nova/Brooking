import CardHotel from "../Composant/CardHotel";
import "../Style/NosHotels.scss";
import { hotels } from "../Data/Data";
import Reservation from "./Reservation";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import ModalConnection from "./ModalConnection";
import { useEffect } from "react";
import { StyleContext } from "../Context/StyleContext";

const NosHotels = () => {
    const {user} = useContext(UserContext)
    const [tabStyleCard, setTabStyleCard] = useState([])
    const [flagEndAnim, setFlagEndAnim] = useState(true)
    const [compteur, setCompteur] = useState(0)
    const {nosHotelStyle} = useContext(StyleContext)


    useEffect( () => {
      const tabId = []
      for(let i=0; i<hotels.length; i++){ tabId.push({ visibility : "hidden" }) }
      setTabStyleCard([...tabId])
    },[])

    useEffect( () => {
      let balise = compteur + 1
      try{
        balise = document.querySelector("#card-" + compteur.toString())
        balise.addEventListener("animationend", (event) => {
          setFlagEndAnim(true)
        });
      }catch(error){
        //console.log("error")
      }
      if( (compteur < hotels.length) && flagEndAnim && (tabStyleCard.length > 0) ){
        let tabId = [...tabStyleCard]
        tabId[compteur] = {
          visibility : "visible",
          animation : "card-hotels",
          animationDuration : "0.3s"
        } 
        setCompteur(compteur + 1)
        setFlagEndAnim(false)
        setTabStyleCard([...tabId])
      }
    }, [tabStyleCard, flagEndAnim])


  return (
    <>
    {!user ? <ModalConnection />
    : 
    <Reservation />}
      <div className={nosHotelStyle}>
        <h1> Nos Hotels </h1>
        <div className="liste-hotel">
          {hotels.map((item, indice) => (
            <CardHotel hotel={item} key={item.id} styleCard={tabStyleCard[indice]}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default NosHotels;
