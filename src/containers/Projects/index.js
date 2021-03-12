import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

import cloneDeep from "lodash/cloneDeep";
import Card from "./card";
import Modal from "./Add";

function Projects() {
  const history = useHistory();
  const items = [...Array(15).keys()];


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

  const onSetup = () =>{
    history.push("/App/Projects/Setup/Scenarios");
  }

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
    <> <Modal
    show={show}
    onCancel={onFormCancel}
    formData={formData}
    onChange={setFormData}
    onSubmit={onFormSubmit}
    mode={mode}
  />
    <div className="project-container">
      <div className="header">
        <h1>Projects</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for projects"
            // value={formData.name}
            // onChange={(e) =>
            //   onFormChange(e.target.value)
            // }
          />
        </div>
        <button type="button" className="btn btn-primary"  onClick={handleShow}>
          ADD PROJECT <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        {items.map(item=>    <Card onSetup={onSetup}/>)}
     
      </div>
    </div></>
  );
}

export default Projects;
