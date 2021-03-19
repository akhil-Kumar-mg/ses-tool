import React from "react";
import { Modal } from "react-bootstrap";

import "./style.scss";

function ConfirmModalContainer({ title, body, actions, show, autoClose, onClose }) {
  const onDefaultClose = () => {};
  return (
    <>
      <Modal
        show={show}
        backdrop={autoClose || 'static'}
        onHide={onClose || onDefaultClose}
        keyboard={false}
        className="in ses-confirm-modal"
      >
        {/* <Modal.Header>
        {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header> */}
        {title && <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>}
        
        <Modal.Body className={`${title ? '': 'adjustTop'}`}>{body()}</Modal.Body>
        <Modal.Footer>{actions()}</Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModalContainer;
