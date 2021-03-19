import React, { useState } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import FaIcons from "../../../components/fa-icons";


import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

function Periods() {
  const initialState = {
    name: "",
    sub_categories: [],
  };


  const [formData, setFormData] = useState(cloneDeep(initialState));


  const onSetup = () => {};

  const onFormSubmit = () => {

  };

  const onEdit = () => {};

  const onSave = () => {};
  const onFormCancel = () => {

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
      
      <div className="header">
        <h1>Subscriber Ramp up</h1>
        <button type="button" className="btn btn-primary" >
          SAVE
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Periods;
