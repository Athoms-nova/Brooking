import "../Style/FormConnect.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";
import { useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ModalContext } from "../Context/ModalContext";
import { StyleContext } from "../Context/StyleContext";
import { NavContext } from "../Context/NavContext";

const Connection = () => {
  const { ModalConnectionCacher } = useContext(ModalContext);
  const mail = useRef();
  const password = useRef();
  const { connectUser, currentUser, ReadUserBDD } = useContext(UserContext);
  const [errorType, setErrorType] = useState(false);
  const { setNavInfo } = useContext(NavContext);
  const {
    setFormeConnectClass,
    setPresentationHome,
    setCorpPageProfil,
    formeConnectClass,
    formeConnectClassParent,
  } = useContext(StyleContext);
  const navigation = useNavigate();

  const Animation = async () => {
    setFormeConnectClass("form-connection-top");
    await setPresentationHome("presentation-home-end");
    const effect = document.querySelector(".presentation-home-end");
    effect.addEventListener("animationend", (event) => {
      setCorpPageProfil("corp")
      setNavInfo("profil");
      navigation("/user/profil");
    });
  };

  useEffect(() => {
    if (currentUser !== false) { Animation() }
  }, [currentUser]);

  const OnSubmit = async (e) => {
    e.preventDefault();

    try {
      const co = await connectUser(mail.current.value, password.current.value);
      setErrorType(false);
      ModalConnectionCacher();
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        setErrorType(true);
      } else if(error.code === "auth/user-not-found"){
        setErrorType(true);
      }
      else navigation("/error404");
    }
  };

  return (
    <div className={formeConnectClassParent}>
      <Form className={formeConnectClass} onSubmit={OnSubmit}>
        <h1> Connection </h1>
        <FloatingLabel controlId="floatingInput" label="Email address">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            ref={mail}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
        </FloatingLabel>
        {errorType && <Alert> Password ou Email incorrect !! </Alert>}
        <Button type="submit"> Se Connecter </Button>
      </Form>
    </div>
  );
};

export default Connection;
