import React, { useState } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import FaIcons from "../../../components/fa-icons";
import Modal from "./Add";

import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

function Periods() {
  const initialState = {
    name: "",
    sub_categories: [],
  };
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  const onSetup = () => {};

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {};

  const onSave = () => {};
  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "onSetup":
       

        break;
    }
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
        <h1>Subscribers</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          SET SUBSCRIBER TYPE <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Periods;
