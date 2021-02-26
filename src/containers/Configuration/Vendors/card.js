import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

function Card({ key, onItemClick }) {
  return (
    <>
      <div key={key} className="col-sm-12 sub-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5>Vendor name</h5>
                  <span className="sub-title">Vendor ID</span>
                </div>
                <div className="tools">
                  <FaIcons icon="pencil-alt" />
                  <FaIcons icon="trash-alt" />
                </div>
              </div>
            </div>

            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer posuere erat a ante.
            </p>
            <div style={{ float: "right" }}>
              <a href="javascript:;;" onClick={onItemClick}>
                DEFINE COST ITEM <FaIcons icon="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
