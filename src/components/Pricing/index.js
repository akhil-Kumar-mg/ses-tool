import React, { useState } from "react";
import Modal from "../Modal";
import Card from "./card";

import FormModal from './Add';

function ModalContainer({ show, setShow }) {
    //Form Modal
    const [showAdd, setShowAdd] = useState(false);
    const handleShowAdd = () => setShowAdd(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <FormModal show={showAdd} setShow={setShowAdd}/>
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
                <button type="button" className="btn btn-primary" onClick={handleShowAdd}>
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
