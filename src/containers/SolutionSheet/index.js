import React, { useState } from "react";
import "./style.scss";

import Grid from "../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

import Modal from "../../components/Solution";
import ConfirmModal from "../../components/ConfirmModal";

function SolutionSheet() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);

  const onGridChange = (event, item) => {
    switch (event) {
      case "onEdit":
        handleShow();
        break;
    }
  };

  const onAddConfirm = () => {
    handleClose();
    handleShowConfirm();
  };
  return (
    <>
      <Modal show={show} setShow={setShow} onSubmit={onAddConfirm} />
      <ConfirmModal
        show={showConfirm}
        title="Do you want to change cost item for all?"
        body={() => (
          <label>
            The cost item at you are changings linked to other solution
            components too. Do you want to change cost item for those components
            too?{" "}
          </label>
        )}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-5">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={handleCloseConfirm}
                >
                  NO NEED
                </button>
              </div>
              <div className="col-sm-5">
                <button type="button" className="btn btn-primary" onClick={handleCloseConfirm}>
                  YES, PLEASE
                </button>
              </div>
            </div>
          );
        }}
        setShow={setShowConfirm}
        onSubmit={onAddConfirm}
      />
      <div className="header">
        <h1>Solution Sheet</h1>
        {/* <button type="button" className="btn btn-primary">
          ADD SOLUTION <FaIcons icon="plus" />
        </button> */}
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default SolutionSheet;
