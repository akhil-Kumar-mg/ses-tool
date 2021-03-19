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
      <form className="ses-form">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Initial Library Size(Hours)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.customer}
                onChange={(e) => onFormChange("customer", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Maximum Library Size(Hours, 0=nolimit)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.customer}
                onChange={(e) => onFormChange("customer", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Montly Ingest Hours</label>
              <input type="text" placeholder="Content" className="form-control" />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Montly Purge Hours</label>
              <input type="text" placeholder="Content" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Avg. Asset Duration(Minutes)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.manager}
                onChange={(e) => onFormChange("manager", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Archive</label>
              <select className="form-control">
              <option>Content</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
