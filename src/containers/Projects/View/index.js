import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

function Projects() {
  const history  = useHistory();  
  const onGridChange = (event, item) => {
    switch (event) {
      case "onSetup":
        break;
    }
  };

  return (
    <>
      <div className="project-view-container">
        <div className="header">
          <h1>Projects</h1>
          <h3>
            <FaIcons icon="arrow-left" onClick={()=>{history.goBack()}}/> P/L - Project Name
          </h3>
          <div>
            <div className="form-group">
              <label>P/L Scenarios</label>
              <select className="form-control">
                <option value="-1">Best Case</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sub-container">
          <Grid data={data} schema={schema} onChange={onGridChange} />
        </div>
      </div>
    </>
  );
}

export default Projects;
