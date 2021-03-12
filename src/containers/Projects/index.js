import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

import Child from "./layout";
import Card from "./card";

function Projects() {
  const history = useHistory();
  const items = [...Array(15).keys()];
  const onSetup = () =>{
    history.push("/App/Projects/Setup/Scenarios");
  }
  return (
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
        <button type="button" className="btn btn-primary">
          ADD PROJECT <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        {items.map(item=>    <Card onSetup={onSetup}/>)}
     
      </div>
    </div>
  );
}

export default Projects;
