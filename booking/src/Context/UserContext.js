import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { database } from "../firebase/firebase";
import { ref, set, onValue, update, push } from "firebase/database";
import { auth } from "../firebase/firebase";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [modalSupprimer, setModalSupprimer] = useState(false) 
  const [historiqueSelect, setHistoriqueSelect] = useState()
  const [flagAnnulation, setFlagAnnulation] = useState(false)
  const [etatButtonAnnuler, setEtatButtonAnnuler] = useState(true)
  const db = database;

  const OnClickCard = (hotel, refference) => {
    const copie = hotel
    copie["refference"] = refference
    setHistoriqueSelect(copie)
    setModalSupprimer(true)
    etatButtonAnnuler(true)
    flagAnnulation(false)
  }
  
  const CloseModal = () => {
    setModalSupprimer(false)
    setFlagAnnulation(false)
    setEtatButtonAnnuler(true)
  }

  const ReadUserBDD = (email) => {
    onValue(ref(db, "User"), (snapshot) => {
      const data = snapshot.val();
      setCurrentUser(data[email.split("@")[0]])
    });
  };

  const newUser = (email, password, pseudo) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setUser(true);
        const chemin = "User/" + email.split('@')[0];
        set(ref(db, chemin), {
          pseudo,
          email,
          historique: [false],
        });
        setCurrentUser({
          pseudo: pseudo,
          email: email,
          historique: [false],
        });
      }
    );
  };

  const connectUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      setUser(true);
      ReadUserBDD(email);
    });
  };

  const deconnexionUser = () => {
    return signOut(auth).then(() => {
      setUser(false);
      setCurrentUser(false);
    });
  };

  const AjouterDansHistorique = (
    hotel,
    dateDebut,
    dateFin,
    total,
    numChambre,
  ) => {
    set(push(ref(db, "User/" + currentUser.pseudo + "/historique")), {
      id: hotel.id,
      hotel: hotel.hotel,
      ville: hotel.ville,
      adress: hotel.adress,
      prix: hotel.prix,
      numChambre: numChambre,
      arriver: dateDebut,
      depart: dateFin,
      total: total
    });
  };

  const AnnulerReservation = () => {
    update(ref(db, "User/" + currentUser.pseudo + "/historique"), {
      [historiqueSelect.refference] : null
    });
    setFlagAnnulation(true)
    setEtatButtonAnnuler(false)
  } 

  useEffect(() => {
    const deco = onAuthStateChanged(auth, (users) => {
      if(users !== null){
        ReadUserBDD(users.email)
        setUser(true)
      }
    })
    return deco
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        newUser,
        connectUser,
        deconnexionUser,
        currentUser,
        AjouterDansHistorique,
        CloseModal,
        OnClickCard,
        modalSupprimer,
        historiqueSelect,
        AnnulerReservation,
        flagAnnulation,
        etatButtonAnnuler,
        ReadUserBDD
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
