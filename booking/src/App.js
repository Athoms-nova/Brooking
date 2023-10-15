import "./App.scss";
import Navigation from "./Composant/Navigation";
import Home from "./Page/Home";
import { Route, Routes } from "react-router-dom";
import { NavContext, NavContextProvider } from "./Context/NavContext";
import { UserContext, UserContextProvider } from "./Context/UserContext";
import NosHotels from "./Page/NosHotels";
import Profil from "./Page/Profil";
import NotFound from "./Page/NotFound";
import { ModalContext, ModalContextProvider } from "./Context/ModalContext";
import VerificationUser from "./Page/VerificationUser";
import { HotelContext, HotelContextProvider } from "./Context/HotelContext";
import { StyleContext, StyleContextProvider } from "./Context/StyleContext";
import { RouteContext, RouteContextProvider } from "./Context/RouteContext";


function App() {
  return (
    <div className="App">
      <StyleContextProvider value={StyleContext}>
        <UserContextProvider value={UserContext}>
          <NavContextProvider value={NavContext}>
            <HotelContextProvider value={HotelContext}>
              <ModalContextProvider value={ModalContext}>
                <Navigation value={UserContext} />
                <RouteContextProvider value={RouteContext}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<VerificationUser />}>
                      <Route path="/user/profil" element={<Profil />} />
                    </Route>
                    <Route path="/home" element={<Home />} />
                    <Route path="/connection" element={<Home />} />
                    <Route path="/inscription" element={<Home />} />
                    <Route path="/nos-offres" element={<NosHotels />} />
                    <Route path="/error404" element={<NotFound/>} />
                    <Route path="*" element={<Home />}/>
                  </Routes>
                </RouteContextProvider>
              </ModalContextProvider>
            </HotelContextProvider>
          </NavContextProvider>
        </UserContextProvider>
      </StyleContextProvider>
    </div>
  );
}

export default App;
