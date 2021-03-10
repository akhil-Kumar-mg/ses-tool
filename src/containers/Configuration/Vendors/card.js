import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

function Card({ vendor, onDelete, onView, onItemClick }) {
  return (
    <>
      <div className="col-sm-12 sub-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5>{vendor.name}</h5>
                  <span className="sub-title">{vendor.id}</span>
                </div>
                <div className="tools">
                  <div
                    onClick={() => {
                      onView(vendor);
                    }}
                  >
                    <FaIcons icon="pencil-alt" />
                  </div>
                  <div
                    onClick={() => {
                      onDelete(vendor);
                    }}
                  >
                    <FaIcons icon="trash-alt" />
                  </div>
                </div>
              </div>
            </div>

            <p className="card-text">{vendor.description}</p>
            <div style={{ float: "right" }}>
              <a href="javascript:void(0)" onClick={onItemClick}>
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
