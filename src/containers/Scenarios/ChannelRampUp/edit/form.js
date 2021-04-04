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
          <label>Channel Count</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.channel_count}
            onChange={(e) => onFormChange("channel_count", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
