import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

function Vendors() {
  const items = [...Array(15).keys()];
  const card = (key) =>{
    return <div key={key} className="col-sm-12 sub-item">
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <div className="sub-header">
            <div className="titles">
              <h5>Vendor name</h5>
              <span className="sub-title">Vendor ID</span>
            </div>
            <div className="tools">
              <i className="fa fa-pencil-alt" />
              <i className="fa fa-trash-alt" />
            </div>
          </div>
        </div>

        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer posuere erat a ante. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Integer posuere erat a ante.
        </p>
        <div style={{ float: "right" }}>
          <a href="#">
            DEFINE COST ITEM <FaIcons icon="arrow-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
  }
  return (
    <>
      <div className="header">
        <h1>Vendors</h1>
        <button type="button" className="btn btn-primary">
          ADD VENDOR <FaIcons icon="plus" />
        </button>
      </div>

      

      <div className="sub-container">
        <div className="row">
            {items.map(item=> card(item))}
        </div>
      </div>
    </>
  );
}

export default Vendors;
