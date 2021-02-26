import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import Card from "./card";

function ModalContainer({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        title="Cost items"
        autoClose={true}
        onClose={handleClose}
        body={() => <Card />}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-12">
                <button type="button" className="btn btn-primary">
                  ADD COST ITEM
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
