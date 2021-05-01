import React, { useState, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Context as AppContext } from "../../../../context/AppContext";

function Form({ formData, onChange }) {

  const appContext = useContext(AppContext);
  const { increment_type } = appContext.state;

  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>Channel Count</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.channel_count}
            onChange={(e) => onFormChange("channel_count", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Increment type</label>
          <select
            className="form-control"
            value={formData.type}
            onChange={(e) => onFormChange(e.target.value, "type")}
          >
            <option>Select</option>
            {increment_type &&
              increment_type.length &&
              increment_type.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
      </form>
    </>
  );
}

export default Form;
