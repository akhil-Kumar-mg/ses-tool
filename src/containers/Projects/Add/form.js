import React, { useState, useMemo } from "react";
import cloneDeep from "lodash/cloneDeep";
import countryList from 'react-select-country-list'


function Form({ formData, onChange }) {
  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  const countryOptions = useMemo(() => countryList().getData(), [])

  return (
    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            placeholder="Project name"
            value={formData.project_name}
            onChange={(e) => onFormChange("project_name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Customer</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.customer_name}
            onChange={(e) => onFormChange("customer_name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            className="form-control"
            value={formData.country_name}
            onChange={(e) => onFormChange("country_name", e.target.value)}
          >
            {countryOptions.map((item, index) => {
              return (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label>Sales manager</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.sales_manager}
            onChange={(e) => onFormChange("sales_manager", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
