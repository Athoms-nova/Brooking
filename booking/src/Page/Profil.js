import { Accordion } from "react-bootstrap";
import userIcone from "../Icone/user.svg";
import CardHistorique from "../Composant/CardHistorique";
import "../Style/Profil.scss";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import ModalSupHotel from "../Composant/ModalSupHotel";
import { StyleContext } from "../Context/StyleContext";

const InfoProfil = ({ currentUser }) => {
  return (
    <Accordion className="profil-info">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Mes Informations Personnel</Accordion.Header>
        <Accordion.Body>
          <div className="bull-info-profil">
            <h1 className="label"> Pseudo </h1>
            <p className="label-value"> {currentUser.pseudo} </p>
          </div>
          <div className="bull-info-profil">
            <h1 className="label"> Email </h1>
            <p className="label-value"> {currentUser.email} </p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const HistoriqueProfil = ({ historique }) => {
  let historiqueFormater = historique;
  delete historiqueFormater[0];
  return (
    <Accordion className="profil-historique">
      <Accordion.Item eventKey="0">
        <Accordion.Header> Mon Historique </Accordion.Header>
        <Accordion.Body>
          {Object.keys(historiqueFormater).map((reservation) => (
            //console.log(historiqueFormater[reservation])
            <CardHistorique
              historique={historiqueFormater[reservation]}
              refference={reservation}
              key={reservation}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const Profil = () => {
  const { currentUser } = useContext(UserContext);
  const {corpPageProfil} = useContext(StyleContext)
  return (
    <div className="profil">
      <ModalSupHotel />
      <div className={corpPageProfil}>
        <h1 className="title"> Profil </h1>
        <div className="profil-body">
          <div className="image-profil">
            <img className="icone-profil" src={userIcone} alt="user" />
          </div>
          <h1> Hello {currentUser.pseudo} </h1>
          <InfoProfil currentUser={currentUser} />
          <HistoriqueProfil historique={currentUser.historique} />
        </div>
        <div className="end"></div>
      </div>
    </div>
  );
};

export default Profil;
