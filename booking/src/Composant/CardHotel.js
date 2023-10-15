import "../Style/CardHotel.scss";
import adressIcone from "../Icone/marker.svg";
import villeIcone from "../Icone/adresse.png";
import { useContext } from "react";
import { ModalContext } from "../Context/ModalContext";
import { HotelContext } from "../Context/HotelContext";
import { UserContext } from "../Context/UserContext";
import { StyleContext } from "../Context/StyleContext";

const CardHotel = ({ hotel, styleCard }) => {
  const {cardHotelCorp} = useContext(StyleContext)
  const { OnChangeSelectHotel } = useContext(HotelContext);
  const { ModalConnectionVisible, ModalConnectionCacher } =
    useContext(ModalContext);
  const { setFormeConnectClass, setFormeConnectClassParent } =
    useContext(StyleContext);
  const { user } = useContext(UserContext);


  const OnClickCard = () => {
    if (!user) {
      ModalConnectionVisible();
      setFormeConnectClassParent("connection-modal");
      setFormeConnectClass("form-connection-sans-animation");
    } else {
      ModalConnectionCacher();
    }
    OnChangeSelectHotel(hotel);
  };

  return (
    <div
      className="card-hotel"
      onClick={OnClickCard}
      id={"card-" + hotel.id.toString()}
      style={styleCard}
    >
      <div className={cardHotelCorp}>
        <div
          className="image-card"
          style={{
            backgroundImage: "url(" + hotel.image + ")",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="info-card">
          <div className="adress">
            <h1 className="title"> {hotel.hotel} </h1>
            <h2>
              <img className="icone-card" src={villeIcone} alt="icone ville" />
              {hotel.ville}
            </h2>
            <h2>
              <img
                className="icone-card"
                src={adressIcone}
                alt="icone adress"
              />
              {hotel.adress}
            </h2>
          </div>
          <h1 className="prix"> {hotel.prix} € </h1>
        </div>
      </div>
    </div>
  );
};

export default CardHotel;
