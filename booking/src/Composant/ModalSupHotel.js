import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import "../Style/ModalSupHotel.scss";
import { hotels } from "../Data/Data";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import adressIcone from "../Icone/marker.svg";
import villeIcone from "../Icone/adresse.png";
import calendarIcone from "../Icone/calendar-icon.svg";
import { HotelContext } from "../Context/HotelContext";

const InfoHotel = ({ info }) => {
  const hotel = hotels.filter((item) => info.id == item.id)[0];
  return (
    <Card>
      <Card.Header> {info.hotel} </Card.Header>
      <Card.Body>
        <div className="card-left">
          <img className="img-historique" src={hotel.image} alt={info.hotel} />
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
            <Card.Text>Chambre {info.numChambre}</Card.Text>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <h2 className="prix"> {info.prix}€ la Nuite</h2>
        <h2> Total : {info.total} Euro </h2>
      </Card.Footer>
    </Card>
  );
};

const ModalSupHotel = () => {
  const {
    historiqueSelect,
    CloseModal,
    modalSupprimer,
    AnnulerReservation,
    flagAnnulation,
    etatButtonAnnuler
  } = useContext(UserContext);

  const {AnnulationChambreBDD} = useContext(HotelContext)

  const OnClickSupprimer = () => {
    AnnulerReservation()
    AnnulationChambreBDD(historiqueSelect)
  }
  return (
    <Modal
      className="modal-sup-hotel"
      show={modalSupprimer}
      size="lg"
      onHide={CloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title> Suprimer la Réservation </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { flagAnnulation && <span className="annulation-span"> <p> Annulation Fait </p> </span> }
        <InfoHotel info={historiqueSelect} />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={CloseModal}> Retour </Button>
        <Button onClick={OnClickSupprimer} disabled={!etatButtonAnnuler}> Supprimer </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSupHotel;
