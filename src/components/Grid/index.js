import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

import FaIcons from "../fa-icons";
const defaultColWidth = "50px";

function Grid({ data, schema, onChange, rowKey }) {

  const renderActions = (action, item) => {
    switch (action.type) {
      case "link":
        return (
          <div
            key={action.name}
            className="col colsm"
            style={{ width: `${action.width || defaultColWidth}` }}
          >
            <a
              href="javascript:void(0)"
              onClick={() => {
                onChange(action.event, item);
              }}
            >
              {item.status !== "created" ? action.edit : action.add}
            </a>
          </div>
        );
      case "icon":
        return (
          <div
            key={action.name}
            className="col colsm"
            style={{ width: `${action.width || defaultColWidth}` }}
            onClick={() => {
              onChange(action.event, item);
            }}
          >
            {action.label && <span>{action.label}</span>}{" "}
            <FaIcons icon={action.name} color={action.color} />
          </div>
        );
    }
  };

  const renderItem = (column, item) => {
    switch (column.type) {
      case "text":
        return (
            <input
              className="form-control"
              style={{ width: "100px" }}
              type="text"
              value={item[column.field]}
              disabled={true}
            />
        );
      case "dropdown":
        return (
            <select className="form-control" disabled={true}>
              <option>Percent</option>
            </select>
        );
      case "boolean":
        return (
            item[column.field] ? "Y" : "F"
        );
      default:
        return (
            item[column.field]
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
          return (
            <div key={column.name} className="col">
              {column.name}
            </div>
          );
        })}
        {schema.actions && schema.actions.length
          ? schema.actions.map((action, idx) => {
              return (
                <div
                  key={idx}
                  className="col colsm"
                  style={{ width: `${action.width || defaultColWidth}` }}
                ></div>
              );
            })
          : null}
      </div>

      {data.map((item, idx) => {
        const colProps = {};
        if(rowKey)
          colProps[`data-${rowKey}`] = item[rowKey];
        return (
          <div key={idx} className={`row ${idx % 2 === 0 ? "even" : "odd"}`}  {...colProps}>
            <div className="col colsm" style={{ width: defaultColWidth }}>
              {idx + 1}
            </div>
            {schema.columns.map((column) => {
                


              return  <div key={column.field} className="col field">
                {renderItem(column, item)}
              </div>
              }
            )}
            {schema.actions.map((action) => renderActions(action, item))}
          </div>
        );
      })}
    </div>
  );
}

Grid.propTypes = {
  onChange: PropTypes.func,
};

Grid.defaultProps = {
  onChange: () => {},
};

export default Grid;
