
import { Alert, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import adressIcone from "../Icone/marker.svg";
import villeIcone from "../Icone/adresse.png";
import "../Style/Reservation.scss";
import ReactDatePicker from "react-datepicker";
import { useContext } from "react";
import { HotelContext } from "../Context/HotelContext";

const InfoHotel = ({ hotel }) => {
  return (
    <Card>
      <Card.Header> {hotel.hotel} </Card.Header>
      <Card.Body>
        <div className="adress">
          <Card.Text>
            {" "}
            <img className="icone-card" src={villeIcone} alt="icone ville" />
            {hotel.ville}{" "}
          </Card.Text>
          <Card.Text>
            {" "}
            <img className="icone-card" src={adressIcone} alt="icone adress" />
            {hotel.adress}{" "}
          </Card.Text>
        </div>
        <h2 className="prix">
          {" "}
          {hotel.prix}€ <br />
          la Nuite
        </h2>
      </Card.Body>
    </Card>
  );
};

const FrameSaisieDate = ({ info, dateStart, dateEnd, OnChangeDate }) => {
  return (
    <div className="frame-date">
      <label> {info} </label>
      {info === "Arriver" ? (
        <ReactDatePicker
          selectsStart
          dateFormat="dd/MM/yyyy"
          selected={dateStart}
          startDate={dateStart}
          endDate={dateEnd}
          minDate={new Date()}
          onChange={(date) => OnChangeDate(date)}
        />
      ) : (
        <ReactDatePicker
          dateFormat="dd/MM/yyyy"
          selectsEnd
          selected={dateEnd}
          startDate={dateStart}
          endDate={dateEnd}
          minDate={new Date()}
          onChange={(date) => OnChangeDate(date)}
        />
      )}
    </div>
  );
};

const ReservationDate = ({ dateArriver, dateDepart, nbJour }) => {
  const { OnChangeDateDebut, OnChangeDateFin, invalideDate } = useContext(HotelContext);

  return (
    <form className="form-reservation">
      <FrameSaisieDate
        info="Arriver"
        dateStart={dateArriver}
        dateEnd={dateDepart}
        OnChangeDate={OnChangeDateDebut}
        excludeDates={invalideDate}
      />
      <FrameSaisieDate
        info="Départ"
        dateStart={dateArriver}
        dateEnd={dateDepart}
        OnChangeDate={OnChangeDateFin}
        excludeDates={invalideDate}
      />

      <div className="nb-jour">
        <label> Nb Jour </label>
        <p> {nbJour} </p>
      </div>
    </form>
  );
};

const Reservation = () => {
  const {
    reservationShow,
    ModalReservationCacher,
    hotelSelect,
    nbJour,
    dateDebut,
    dateFin,
    total,
    VerificationChambreDispo,
    validation,
  } = useContext(HotelContext);

  return (
    <Modal
      show={reservationShow}
      size="lg"
      className="reservation"
      onHide={ModalReservationCacher}
    >
      <Modal.Header closeButton>
        <Modal.Title>Ma Réservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          validation && <span className="valider-span"> <p> Reservation Fait </p>{" "} </span>
        }
        <div className="info-hotel">
          <img
            className="img-reservation"
            src={hotelSelect.image}
            alt="hotel"
          />
          <InfoHotel hotel={hotelSelect} />
        </div>
        <h2 className="text-reservation">
          {" "}
          Choisir les dates de votre voyage{" "}
        </h2>
        <ReservationDate
          dateArriver={dateDebut}
          dateDepart={dateFin}
          nbJour={nbJour}
        />
        {nbJour <= 0 && (
          <Alert className="alert-block">
            {" "}
            Choisir des dates Valides svp !!{" "}
          </Alert>
        )}
        { validation === false && 
          <Alert className="alert-block">
            {" "}
            Aucune Chambre dispo pour ses dates !!{" "}
          </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <h1> Total : {total} €</h1>
        <div className="group-button">
          <Button variant="secondary" onClick={ModalReservationCacher}>
            Close
          </Button>
          <Button variant="primary" onClick={VerificationChambreDispo} disabled={validation && true}>
            Réserver
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Reservation;
