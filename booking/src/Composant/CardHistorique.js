import "../Style/CardHistorique.scss";
import { Card } from "react-bootstrap";
import adressIcone from "../Icone/marker.svg";
import villeIcone from "../Icone/adresse.png";
import calendarIcone from "../Icone/calendar-icon.svg";
import { hotels } from "../Data/Data";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const InfoHotel = ({ info }) => {
  const hotel = hotels.filter( item => info.id === item.id)[0]

  return (
    <Card >
      <Card.Header> {info.hotel} </Card.Header>
      <Card.Body>
        <div className="card-left">
          <img
            className="img-historique"
            src={hotel.image}
            alt={info.hotel}
          />
        </div>
        <div className="card-right">
          <div className="adress">
            <Card.Text>
              {" "}
              <img className="icone-card" src={villeIcone} alt="icone ville" />
              {info.ville}{" "}
            </Card.Text>
            <Card.Text>
              {" "}
              <img
                className="icone-card"
                src={adressIcone}
                alt="icone adress"
              />
              {info.adress}{" "}
            </Card.Text>
            <Card.Text>
              {" "}
              <img
                className="icone-card"
                src={calendarIcone}
                alt="icone adress"
              />
              Arriver : {info.arriver}{" "}
            </Card.Text>
            <Card.Text>
              {" "}
              <img
                className="icone-card"
                src={calendarIcone}
                alt="icone adress"
              />
              Départ : {info.depart}{" "}
            </Card.Text>
            <Card.Text>
              Chambre {info.numChambre}
            </Card.Text>
          </div>
          <h2 className="prix">
            {" "}
            {info.prix}€ <br />
            la Nuite
          </h2>
        </div>
      </Card.Body>
      <Card.Footer>
        <h2> Total : {info.total} Euro </h2>
      </Card.Footer>
    </Card>
  );
};




const CardHistorique = ({ historique, refference }) => {
  const {OnClickCard} = useContext(UserContext)
  return (
    <div className="card-historique" onClick={(e) => OnClickCard(historique, refference)}>
      <InfoHotel info={historique} />
    </div>
  );
};


export default CardHistorique;
