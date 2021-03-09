import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

function Card({category, onDelete}) {

  return (
    <>
      <div className="col-sm-12 sub-item">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <div className="sub-header">
                <div className="titles">
                  <h5 className="col-md-6">{category.name}</h5>
                </div>
                <div className="tools">
                  <div>
                    <FaIcons icon="pencil-alt" />
                  </div>
                  <div onClick={()=>{onDelete(category)}} >
                    <FaIcons icon="trash-alt" />
                  </div>
                 
                </div>
              </div>
            </div>

            <p className="card-text">
              Sub Categories: {category.sub_categories.map(item=> item.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
