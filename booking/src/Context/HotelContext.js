import { ref, set, onValue, update } from "firebase/database";
import { useState } from "react";
import { createContext } from "react";
import { hotels } from "../Data/Data";
import { database } from "../firebase/firebase";
import { CompteurNbJour, CreactionListeDate } from "../Fonction.js";
import { addDays } from "date-fns";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const HotelContext = createContext();

export const HotelContextProvider = ({ children }) => {
  const { AjouterDansHistorique } = useContext(UserContext);

  const [reservationShow, setReservationShow] = useState(false);
  const [validation, setValidation] = useState(undefined);

  const [hotelSelect, setHotelSelect] = useState(hotels[0]);
  const [chambresDate, setChambresDate] = useState();
  const [nbJour, setNbJour] = useState(
    CompteurNbJour(new Date(), addDays(new Date(), 1))
  );
  const [total, setTotal] = useState(0);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(addDays(new Date(), 1));
  const [listeDateSelect, setListeDateSelect] = useState();
  const [invalideDate, setInvalideDate] = useState([])

  const db = database;

  const InitDatePicker = () => {
    setDateDebut(new Date());
    setDateFin(addDays(new Date(), 1));
    setNbJour(CompteurNbJour(new Date(), addDays(new Date(), 1)));
  };

  const OnChangePrix = (totalJour) => {
    if (totalJour <= 0) {
      setTotal("--");
    } else {
      setTotal(totalJour * hotelSelect.prix);
    }
  };

  const OnChangeDateDebut = (date) => {
    setDateDebut(date);
    setNbJour(CompteurNbJour(date, dateFin));
    OnChangePrix(CompteurNbJour(date, dateFin));
    setListeDateSelect(CreactionListeDate(date, dateFin));
  };

  const OnChangeDateFin = (date) => {
    setDateFin(date);
    setNbJour(CompteurNbJour(dateDebut, date));
    OnChangePrix(CompteurNbJour(dateDebut, date));
    setListeDateSelect(CreactionListeDate(dateDebut, date));
  };

  const OnChangeSelectHotel = (hotel) => {
    ReadHotelBDD(hotel);
    setTotal(hotel.prix);
    setListeDateSelect(CreactionListeDate(new Date(), addDays(new Date(), 1)));
    ModalReservationVisible();
  };

  const ModalReservationVisible = () => {
    setReservationShow(true);
  };

  const ModalReservationCacher = () => {
    setReservationShow(false);
    setValidation(undefined);
    InitDatePicker()
  };

  const ReadHotelBDD = (hotel) => {
    let tableau = {}
    onValue(ref(db, "Hotel/" + hotel.id), async (snapshot) => {
      const data = snapshot.val();
      tableau = data
      data["id"] = hotel.id;
      setHotelSelect(data);
      setChambresDate(data.chambre);
      InitDatePicker();
      setReservationShow(true);
    });
    try{
      const listeDataInvalide = []
      Object.keys(tableau["chambre"]).map( chambre => {
        Object.keys(tableau["chambre"][chambre]).map( date => date !== "default" && listeDataInvalide.push(new Date(date)))
      })
    setInvalideDate(listeDateSelect)
    }catch(error){
      //console.log(error)
    }
  };

  const VerificationChambreDispo = async () => {
    let chambreLibre = 0;
    await onValue(
      ref(db, "Hotel/" + hotelSelect.id + "/chambre"),
      (snapshot) => {
        const data = snapshot.val();
        chambreLibre = SelectChambreDispo(data);
      }
    );
    UpdateChambreBDD(chambreLibre);
  };

  const SelectChambreDispo = (listeChambre) => {
    const chambreTab = Object.keys(listeChambre);
    let flagLibre = true;
    for (let indice = 0; (indice < chambreTab.length) & flagLibre; indice++) {
      for (let date = 0; (date < listeDateSelect.length) & flagLibre; date++) {
        if (
          Object.keys(listeChambre[chambreTab[indice]]).indexOf(
            listeDateSelect[date]
          ) > -1
        ) {
          flagLibre = false;
        }
      }
      if (flagLibre) {
        return indice + 1;
      } else {
        flagLibre = true;
      }
    }
    return false;
  };

  const UpdateChambreBDD = async (numChambre) => {
    if (numChambre > 0) {
      for (let indice = 0; indice < listeDateSelect.length; indice++) {
        update(ref(db, "Hotel/" + hotelSelect.id + "/chambre/" + numChambre), {
          [listeDateSelect[indice]]: true,
        });
      }
      try {
        AjouterDansHistorique(
          hotelSelect,
          dateDebut.toDateString(),
          dateFin.toDateString(),
          total,
          numChambre
        );
        setValidation(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setValidation(false);
    }
  };

  const AnnulationChambreBDD = (infoHotel) => {
    console.log(infoHotel)
    const listeDate = CreactionListeDate(new Date(infoHotel.arriver), new Date(infoHotel.depart))
    console.log(listeDate)
    for(let indice=0; indice < listeDate.length; indice++){
      update(ref(db, "Hotel/" + infoHotel.id + "/chambre/" + infoHotel.numChambre), {
        [listeDate[indice]]: null,
      });
    }
  }

  const ResetBDDHotel = (hotel) => {
    set(ref(db, "Hotel/" + hotel.id), {
      hotel: hotel.hotel,
      ville: hotel.ville,
      adress: hotel.adress,
      prix: hotel.prix,
      image: hotel.image,
      nbChambre: hotel.nbChambre,
      chambre: hotel.chambre,
    });
  };

  const InitialisationBDDHotel = () => {
    hotels.map((item) => {
      ResetBDDHotel(item);
    });
  };


  return (
    <HotelContext.Provider
      value={{
        reservationShow,
        dateDebut,
        dateFin,
        nbJour,
        total,
        validation,
        ModalReservationVisible,
        ModalReservationCacher,
        InitialisationBDDHotel,
        OnChangeSelectHotel,
        OnChangeDateDebut,
        OnChangeDateFin,
        hotelSelect,
        InitDatePicker,
        VerificationChambreDispo,
        invalideDate,
        AnnulationChambreBDD
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
