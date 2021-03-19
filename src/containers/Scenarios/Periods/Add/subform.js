import React, { useState } from "react";

function SubForm({ formData, onSubmit, actionTitle, onChange }) {
  const onFormChange = (key, value) => {
    const keys = key.split(".");
    if (keys.length === 1) formData[key] = value;
    else formData[keys[0]][keys[1]] = value;
    onChange({ ...formData });
  };

  const onFormSubmit = () => {
    onSubmit({ ...formData });
  };

  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label>Period 1</label>
          </div>
          {actionTitle && <div className="col" style={{textAlign: 'right'}} >
            <a onClick={onFormSubmit} href="javascript:void();">
              {actionTitle}
            </a>
          </div>}
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
            <input type="text" className="form-control" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>
      </div>
      <div className="hr-dashed">

      </div>
    </>
  );
}

export default SubForm;
