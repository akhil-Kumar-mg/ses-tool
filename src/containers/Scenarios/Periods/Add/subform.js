import React, { useState } from "react";

function SubForm({ formData, onChange }) {
  const onFormChange = (key, value) => {
    const keys = key.split(".");
    if (keys.length === 1) formData[key] = value;
    else formData[keys[0]][keys[1]] = value;
    onChange({ ...formData });
  };

  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label>Period name</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData.period_name}
              onChange={(e) => onFormChange("period_name", e.target.value)}
            />
          </div>
          {/* {actionTitle && (
            <div className="col" style={{ textAlign: "right" }}>
              <a onClick={onFormSubmit} href="javascript:void();">
                {actionTitle}
              </a>
            </div>
          )} */}
        </div>

        <div className="row">
          <div className="col">
            <label>Start month</label>
          </div>
          <div className="col">
            <label>End month</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={formData.start_month}
              onChange={(e) => onFormChange("start_month", e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData.end_month}
              onChange={(e) => onFormChange("end_month", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="hr-dashed"></div>
    </>
  );
}

export default SubForm;
