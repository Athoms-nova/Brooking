import "../Style/FormConnect.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { StyleContext } from "../Context/StyleContext";

const Inscription = () => {
  const mail = useRef();
  const pseudo = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [errorType, setErrorType] = useState(false)
  const navigation = useNavigate()
  const {formeConnectClass} = useContext(StyleContext)

  const {newUser} = useContext(UserContext)

  const ValidationForm = () => {
    if(password.current.value !== confirmPassword.current.value){
      return false
    }
    else{ return true }
  }

  const OnSubmit = async(e) => {
      e.preventDefault()
      if(ValidationForm()){
        try {
          const inscri = await newUser(mail.current.value, password.current.value, pseudo.current.value)
          setErrorType(false)
          navigation('/user/profil')
        } catch (error) {
          if(error.code === "auth/email-already-in-use"){ setErrorType("email") }
          else(navigation("/error404"))
        }
      }
      else{
        setErrorType("password")
      }
  }

  return (
    <div className="connection">
      <Form className={formeConnectClass} onSubmit={OnSubmit}>
        <h1> Inscription </h1>
        <FloatingLabel controlId="floatingInput" label="Email">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            ref={mail}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Pseudo">
          <Form.Control type="text" placeholder="zozo" ref={pseudo}required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" ref={password} required />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Confirmer le Password"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            ref={confirmPassword}
            required
          />
        </FloatingLabel>
        {errorType === "password" && <Alert> Confirmer le Password </Alert>}
        {errorType === "email" && <Alert> Email deja utiliser </Alert>}
        <Button type="submit"> Valider </Button>
      </Form>
    </div>
  );
};

export default Inscription;
