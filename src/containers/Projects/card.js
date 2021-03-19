import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

function Card({ onSetup, onView }) {
  return (
    <>
      <div className="col-sm-12 sub-item">
        <div className="card">
        
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <h5>Project name</h5>
                <span>Region: Mexico</span>
              </div>
            </div>
            <br />
            <br />
            <p className="card-text">Created by Sales Manager Name</p>
          </div>
          <div className="card-footer">
            <div className="btn-setup" onClick={onSetup}>
              SETUP
            </div>
          
            <div className="btn-view" onClick={onView}>
              VIEW P/L
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
