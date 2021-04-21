import React, { useState } from "react";
import Modal from "../../Modal";
import Form from "../form";

function ModalContainer({ show, formData, onCancel }) {
  return (
    <>
      <Modal
        show={show}
        title="Preview cost item"
        body={() => <Form formData={formData} disabled={true} />}
        actions={() => {
          return (
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={onCancel}
                >
                  Go Back
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
