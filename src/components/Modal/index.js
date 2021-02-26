import React from "react";
import { Modal } from "react-bootstrap";

import "./style.scss";

function ModalContainer({ title, body, actions, show }) {
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        className="right in"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body()}</Modal.Body>
        <Modal.Footer>{actions()}</Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalContainer;
