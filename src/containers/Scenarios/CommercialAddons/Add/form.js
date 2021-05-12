import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Divider } from "@material-ui/core";

function Form({ formData, onChange, categories }) {
  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  const onListFormChange = (key, value, idx) => {
    const _formData = cloneDeep(formData);
    if (key === "capex_items") {
      _formData.capex_items[idx]["value"] = value;
    } else {
      _formData.opex_items[idx]["value"] = value;
    }
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={formData.category}
            onChange={(e) => {
              onFormChange("category", e.target.value);
            }}
          >
            <option value="" selected>
              select category
            </option>
            {categories &&
              categories.length &&
              categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label>Cost name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.viewing_hours}
            onChange={(e) => onFormChange("cost_name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Capex Items</label>
          {formData.capex_items.map((item, idx) => {
            return (
              <div className="row mt-3" key={idx}>
                <div
                  className="col"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    color: "ButtonHighlight",
                  }}
                >
                  <label>{item.period_name}</label>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      key={idx}
                      type="number"
                      className="form-control"
                      placeholder=""
                      value={item.value}
                      onChange={(e) =>
                        onListFormChange("capex_items", e.target.value, idx)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-group">
          <label>Opex Items</label>
          {formData.opex_items.map((item, idx) => {
            return (
              <div className="row mt-3" key={idx}>
                <div
                  className="col"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    color: "ButtonHighlight",
                  }}
                >
                  <label>{item.period_name}</label>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      key={idx}
                      type="number"
                      className="form-control"
                      placeholder=""
                      value={item.value}
                      onChange={(e) =>
                        onListFormChange("opex_items", e.target.value, idx)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}

export default Form;
