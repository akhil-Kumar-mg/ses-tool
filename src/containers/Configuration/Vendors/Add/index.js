import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import Form from "./form";


function ModalContainer({ mode, show, formData, onChange, onSubmit, onCancel }) {

  return (
    <>
      <Modal
        show={show}
        body={() => <Form formData={formData} onChange={onChange} mode={mode}/>}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-6">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={onCancel}
                >
                  CANCEL
                </button>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                  {mode}
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
