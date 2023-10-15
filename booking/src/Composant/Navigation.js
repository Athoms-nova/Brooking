import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HotelContext } from "../Context/HotelContext";
import { NavContext } from "../Context/NavContext";
import { UserContext } from "../Context/UserContext";
import "../Style/Navigation.scss";

const Navigation = () => {
  const { OnClickConnection, OnClickInscription, OnClickLogo, OnClickProfil, OnClickNosHotels, OnClickButtonDeconnexion } =
    useContext(NavContext);
  const { user} = useContext(UserContext);
  const { ModalReservationCacher } = useContext(HotelContext);
  

  const OnClickHome = () => {
    ModalReservationCacher();
    OnClickLogo();
  };

  const OnClickHotels= () => {
    ModalReservationCacher();
    OnClickNosHotels()
  };

  const OnClickDeconnexion = async () => {
    OnClickButtonDeconnexion()
  }

  return (
    <nav className="navigation">
        <button className="logo" onClick={OnClickHome}>
           <h1>Booking</h1>
        </button>
      {!user ? (
        <div className="authentification">
          <Button onClick={OnClickConnection}> Se Connecter </Button>
          <Button onClick={OnClickInscription}> Inscription </Button>
        </div>
      ) : (
        <div className="authentification">
          <button onClick={OnClickHotels} className="option">
            <h1> Nos Hotels </h1>
          </button>
          <Button onClick={OnClickProfil}>
            {" "}
            Mon Profil{" "}
          </Button>
          <Button
            className="button-deco"
            onClick={OnClickDeconnexion}
          >
            Deconnexion
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
