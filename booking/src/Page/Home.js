import { useContext } from "react";
import Connection from "../Composant/Connection";
import Inscription from "../Composant/Inscription";
import { NavContext } from "../Context/NavContext";
import { StyleContext } from "../Context/StyleContext";
import "../Style/Home.scss";

const Home = () => {
  const { navInfo, OnClickNosHotels } = useContext(NavContext);
  const {corpHomeClass, presentationHome} = useContext(StyleContext)
  
  return (
    <div className="home">
      <div className="home-bg"></div>
      <div className="home-info">
        <div className={corpHomeClass}>
          <div className={presentationHome}>
            <button className="offre" onClick={OnClickNosHotels}>
              {" "}
              Voir nos Offres{" "}
            </button>
            <h1 className="title">
              {" "}
              BOOKING <br /> COCO{" "}
            </h1>
          </div>
        </div>
        {navInfo === "connection" ? (
          <Connection />
        ) : navInfo === "inscription" ? (
          <Inscription />
        ) : (
          <div className="rien"></div>
        )}
      </div>
    </div>
  );
};

export default Home;
