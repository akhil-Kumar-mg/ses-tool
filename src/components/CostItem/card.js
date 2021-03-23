import React, { useState } from "react";
import FaIcons from "../fa-icons";

function Form({ item, key, onDelete, onEdit }) {
  return (
    <>
      <div key={key} className="col-sm-12 cost-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5>{item.item}</h5>
                  <span className="sub-title">
                    Unit: {item.commercial_unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="actions" style={{ float: "right" }}>
              <a
                href="javascript:void(0)"
                className="delete"
                onClick={() => {
                  onDelete(item);
                }}
              >
                Delete
              </a>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  onEdit(item);
                }}
              >
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
