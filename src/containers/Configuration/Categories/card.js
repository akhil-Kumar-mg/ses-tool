import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

function Card({key}) {

  return (
    <>
      <div key={key} className="col-sm-12 sub-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5 className="col-md-6">Category name</h5>
                </div>
                <div className="tools">
                  <FaIcons icon="pencil-alt" />
                  <FaIcons icon="trash-alt" />
                </div>
              </div>
            </div>

            <p className="card-text">
              Sub Categories: SC_NAME1, SC_NAME2, SC_NAME3
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
