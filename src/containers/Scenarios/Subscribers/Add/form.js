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
          <label>Type name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
        <label>Avg. viewing Hours per sub per month</label>
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
          <label>Avg. Impression per viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.manager}
            onChange={(e) => onFormChange("manager", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Subscriber start number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avg. viewing bitrate</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>VOD % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Linear % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Catch up % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>


      </form>
    </>
  );
}

export default Form;
