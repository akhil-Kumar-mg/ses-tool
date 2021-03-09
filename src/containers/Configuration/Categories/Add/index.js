import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import Form from "./form";

function ModalContainer({ show, setShow, formData, onChange, onSubmit }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        body={() => <Form formData={formData} onChange={onChange}/>}
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

export default ModalContainer;
