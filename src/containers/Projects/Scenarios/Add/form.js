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
            placeholder="Forecast name"
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expected start date</label>
          <input
            type="date"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.expected_start_date}
            onChange={(e) => onFormChange("expected_start_date", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Number of months</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.number_of_months}
            onChange={(e) => onFormChange("number_of_months", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
