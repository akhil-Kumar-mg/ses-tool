import React, { useState } from "react";
import Modal from "../../Modal";
import Form from "../form";

function ModalContainer({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        title="Cost items"
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
                  CLOSE
                </button>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-primary">
                  EDIT
                </button>
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

export default ModalContainer;
