import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function Form({ formData, onChange }) {
  const onFormChange = (value, id) => {
    const _formData = cloneDeep(formData);
    _formData[id] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            placeholder="Vendor name"
            value={formData.name}
            onChange={(e) => onFormChange(e.target.value, "name")}
          />
        </div>
        <div className="form-group">
          <label>Vendor ID (auto generated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.id}
            onChange={(e) => onFormChange(e.target.value, "id")}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="7"
            placeholder="Placeholder text"
            value={formData.description}
            onChange={(e) => onFormChange(e.target.value, "description")}
          ></textarea>
        </div>
      </form>
    </>
  );
}

export default Form;
