import React, { useState } from "react";
import Modal from "../Modal";
import Form from "./form";

function ModalContainer({ show, setShow, onSubmit }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        title="New solution item"
        body={() => <Form />}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-6">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={handleClose}
                >
                  CANCEL
                </button>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                  ADD
                </button>
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

ModalContainer.defaultProps = {
  onSubmit: () => {},
};


export default ModalContainer;
