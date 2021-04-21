import React, { useState } from "react";
import Modal from "../../Modal";
import Form from "../form";

function ModalContainer({ mode, show, formData, onChange, onCancel, onSubmit }) {
  return (
    <>
      <Modal
        show={show}
        title={mode == "ADD"? "New cost item": "Edit cost item"}
        body={() => <Form formData={formData} onChange={onChange} disabled={false} />}
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
                <button type="button" className="btn btn-primary"  onClick={onSubmit}>
                  SAVE
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
