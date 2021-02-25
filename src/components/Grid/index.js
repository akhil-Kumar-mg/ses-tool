import React, { useState } from "react";
import "./style.scss";

import FaIcons from '../fa-icons';

function Grid({ data, schema }) {
  return (
    <div className="grid-container">
        <div className="row">
          <div className="col colsm"></div>
          {schema.columns.map((column) => {
            return <div className="col">{column.name}</div>;
          })}
          {
                  schema.delete &&  <div className="col colsm"></div>
              }
              {
                  schema.edit && <div className="col colsm"></div>
              }
        </div>

        {data.map((item, idx) => {
          return (
            <div className={`row ${idx%2===0 ? 'even' : 'odd'}`}>
              <div className="col colsm">{idx + 1}</div>
              {schema.columns.map((column) => {
                return <div className="col field">{item[column.field]}</div>;
              })}
             
              {
                  schema.delete &&  <div className="col colsm"><FaIcons icon="trash-alt" /></div>
              }
              {
                  schema.edit &&  <div className="col colsm"><FaIcons icon="pencil-alt" /></div>
              }
            </div>
          );
        })}

    </div>
  );
}

export default Grid;
