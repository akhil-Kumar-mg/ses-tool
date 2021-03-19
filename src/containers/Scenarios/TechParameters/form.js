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
              <label>ABR Video Profiles(Mbps comma separated)</label>
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
              <label>ABR # of Audio Tracks</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.customer}
                onChange={(e) => onFormChange("customer", e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>ABR Total Bitrate</label>
              <input type="text" placeholder="Content" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
         

          <div className="col-sm-6">
            <div className="form-group">
              <label>VOD Storage GB/h</label>
              <input type="text" placeholder="Content" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-VOD</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.manager}
                onChange={(e) => onFormChange("manager", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-Linear</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={formData.manager}
                onChange={(e) => onFormChange("manager", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-Catchup</label>
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

       
      </form>
    </>
  );
}

export default Form;
