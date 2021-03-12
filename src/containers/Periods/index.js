import React, { useState } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import FaIcons from "../../components/fa-icons";
import Modal from "./Add";
function Periods() {
  const initialState = {
    name: "",
    sub_categories: [],
  };
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("SETUP");
    setShow(true);
  };

  const onSetup = () => {};

  const onFormSubmit = () => {
    if (mode === "SETUP") onSave();
    else onEdit();
  };

  const onEdit = () => {};

  const onSave = () => {};
  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  return (
    <>
      <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="header">
        <h1>Periods</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          SET PERIODS <FaIcons icon="plus" />
        </button>
      </div>
    </>
  );
}

export default Periods;
