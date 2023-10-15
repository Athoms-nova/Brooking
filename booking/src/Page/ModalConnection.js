import { Modal } from "react-bootstrap"
import Connection from "../Composant/Connection";
import { useContext } from "react";
import { ModalContext } from "../Context/ModalContext";
import '../Style/ModalConnection.scss'

const ModalConnection = () => {
  const {modalConnection, ModalConnectionCacher} = useContext(ModalContext)
  return (
    <Modal show={modalConnection} size="lg" className="modal-connection" onHide={ModalConnectionCacher}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Connection />
      </Modal.Body>
    </Modal>
  );
}


export default ModalConnection