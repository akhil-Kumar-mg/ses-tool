import React, { useState } from "react";
import FaIcons from "../fa-icons";

function Form({key}) {
  return (
    <>
      <div key={key} className="col-sm-12 cost-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5>Subscription Pricing</h5>
                  <span className="sub-title">Unit: Subscriber</span>
                </div>
              </div>
            </div>

            <div className="actions" style={{ float: "right" }}>
              <a href="javascript:void(0)" className="delete">
                Delete
              </a>
              <a href="javascript:void(0)">
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
