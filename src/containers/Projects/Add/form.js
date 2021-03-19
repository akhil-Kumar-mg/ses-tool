import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function Form({ formData, onChange }) {
  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            placeholder="Project name"
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Customer</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            className="form-control"
            value={formData.country}
            onChange={(e) => onFormChange("country", e.target.value)}
          >
            <option value="-1">Select</option>
            <option value="Channel">India</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sales manager</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.manager}
            onChange={(e) => onFormChange("manager", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
