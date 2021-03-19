import React, { useState } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import FaIcons from "../../../components/fa-icons";
import Form from "./form";



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

  const onChange = (event, item) => {
    
  };
  return (
    <>
      
      <div className="header">
        <h1>Tech Parameters</h1>
        <button type="button" className="btn btn-primary">
          SAVE
        </button>
      </div>
      <div className="sub-container">
          <Form formData={formData} onChange={onChange}/>
      </div>
    </>
  );
}

export default Periods;
