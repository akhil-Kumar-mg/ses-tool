import React, { useState } from "react";

function SubForm({ subCategory, onSubmit, actionTitle }) {
  const initialState = {
    name: "",
    commercial_unit: "",
  };
  const [formData, setFormData] = useState(subCategory || initialState);

  const onFormChange = (key, value) => {
    const keys = key.split(".");
    if (keys.length === 1) formData[key] = value;
    else formData[keys[0]][keys[1]] = value;
    setFormData({ ...formData });
  };

  const onFormSubmit = () =>{
    onSubmit(formData)
    setFormData({...initialState})
  }

  return (
    <>
      <div className="form-group">
        <label>Sub-category name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Placeholder text"
          value={formData.name}
          onChange={(e) => onFormChange("name", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Applicable commercial units</label>
        <select
          className="form-control"
          value={formData.commercial_unit}
          onChange={(e) => onFormChange("commercial_unit", e.target.value)}
        >
          <option value="-1">Select</option>
          <option value="Channel">Channel</option>
        </select>
      </div>
      <div className="center">
        <a onClick={onFormSubmit}>
          {actionTitle}
        </a>
      </div>
    </>
  );
}

export default SubForm;
