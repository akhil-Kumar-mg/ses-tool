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
          <label>Catch up hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Source mpbs</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.manager}
            onChange={(e) => onFormChange("manager", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Codec</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
            value={formData.customer}
            onChange={(e) => onFormChange("customer", e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Audio type</label>
            </div>
            <div className="col">
              <label>Source type</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <select className="form-control">
                
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Subtitle type</label>
            </div>
            <div className="col">
              <label>Channel quality</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <select className="form-control">
                
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>EPG source</label>
            </div>
            <div className="col">
              <label>Ad cue tones</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <select className="form-control">
                
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label># Audio tracks</label>
            </div>
            <div className="col">
              <label># Subtitles</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <select className="form-control">
                
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
