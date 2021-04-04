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
          <label>Increment type</label>
          <select
            className="form-control"
            value={formData.increment_type}
            onChange={(e) => onFormChange("increment_type", e.target.value)}
          >
            <option></option>
            <option>Percent</option>
          </select>
        </div>
        <div className="form-group">
          <label>Increment amount</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.increment_value}
            onChange={(e) => onFormChange("increment_value", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Max Subscribers</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.max_subscriber}
            onChange={(e) => onFormChange("max_subscriber", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Churn</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.churn}
            onChange={(e) => onFormChange("churn", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
