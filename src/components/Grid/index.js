import React, { useState } from "react";
import "./style.scss";

import FaIcons from "../fa-icons";
const defaultColWidth = "50px";

function Grid({ data, schema }) {
  const renderActions = (action) => {
    switch (action.type) {
      case "link":
        return (
          <div
            key={action.name}
            className="col colsm"
            style={{ width: `${action.width || defaultColWidth}` }}
          >
            <a href="javascript:;;">{action.name}</a>
          </div>
        );
      case "icon":
        return (
          <div
            key={action.name}
            className="col colsm"
            style={{ width: `${action.width || defaultColWidth}` }}
          >
            <FaIcons icon={action.name} />
          </div>
        );
    }
  };
  return (
    <div
      className="grid-container"
      style={{ width: `${schema.width || "auto"}` }}
    >
      <div className="row grid-header">
        <div className="col colsm" style={{ width: defaultColWidth }}></div>
        {schema.columns.map((column) => {
          return <div className="col">{column.name}</div>;
        })}
        {schema.actions.map((action, idx) => {
          return (
            <div
              key={idx}
              className="col colsm"
              style={{ width: `${action.width || defaultColWidth}` }}
            ></div>
          );
        })}
      </div>

      {data.map((item, idx) => {
        return (
          <div className={`row ${idx % 2 === 0 ? "even" : "odd"}`}>
            <div className="col colsm" style={{ width: defaultColWidth }}>
              {idx + 1}
            </div>
            {schema.columns.map((column) => {
              return <div className="col field">{item[column.field]}</div>;
            })}
            {schema.actions.map((action) => renderActions(action))}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
