import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function Form({ formData, onChange, categories, periods }) {
  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
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
          {periods.map((item) => {
            return (
              <div className="row mt-3">
                <div className="col">
                  <div className="col">
                    <label>{item.period_name}</label>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      // value={item.price}
                      // onChange={(e) =>
                      //   onSubFormChange("price", e.target.value, idx)
                      // }
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
