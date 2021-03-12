import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useHistory} from "react-router-dom";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";



import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";



import Modal from "./Add";

function Scenarios() {
  const history = useHistory();
  const initialState = {
    name: "",
    sub_categories: [],
  };
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");
  const handleShow = () => {
    setMode("SETUP");
    setShow(true);
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onGridChange = (event, item) => {
    switch (event) {
      case "onSetup":
        history.push('/App/Projects/Scenarios/Periods')

        break;
    }
  };

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
        <h1>Scenarios</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD FORECAST <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}


export default Scenarios;
