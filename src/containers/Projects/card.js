import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

function Card({ onSetup, onView, project, onChange }) {
  return (
    <>
      <div className="col-sm-12 sub-item">
        <div className="card">
          {/* <div class="card-header"></div> */}
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <h4
                  style={{
                    textTransform: "capitalize",
                    direction: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {project.project_name}
                  <div>
                    <FaIcons
                      icon="edit"
                      onClick={() => {
                        onChange(project, "EDIT");
                      }}
                      style={{ marginLeft: "20px", fontSize: "75%" }}
                    />
                    <FaIcons
                      icon="trash-alt"
                      onClick={() => {
                        onChange(project, "DELETE");
                      }}
                      style={{ marginLeft: "20px", fontSize: "75%" }}
                    />
                  </div>
                </h4>
                {/* <span>Region: {project.country_name}</span> */}
              </div>
            </div>
            <br />
            <br />
            <p className="card-text">Created by {project.sales_manager}</p>
          </div>
          <div className="card-footer">
            <div className="btn-setup" onClick={() => onSetup(project)}>
              SETUP
            </div>

            <div className="btn-view" onClick={() => onView(project)}>
              VIEW P/L
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
