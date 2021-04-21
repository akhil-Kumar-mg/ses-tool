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
            placeholder=""
            value={formData.type}
            onChange={(e) => onFormChange("type", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avg. viewing Hours per sub per month</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.viewing_hours}
            onChange={(e) => onFormChange("viewing_hours", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avg. Impression per viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.impression_hours}
            onChange={(e) => onFormChange("impression_hours", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Subscriber start number</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.initial_subscriber_count}
            onChange={(e) => onFormChange("initial_subscriber_count", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avg. viewing bitrate</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.viewing_bitrate}
            onChange={(e) => onFormChange("viewing_bitrate", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>VOD % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.vod_hours}
            onChange={(e) => onFormChange("vod_hours", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Linear % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.linear_hours}
            onChange={(e) => onFormChange("linear_hours", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Catch up % of Viewing hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.catchup_hours}
            onChange={(e) => onFormChange("catchup_hours", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Max Concurrency</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.max_concurrency}
            onChange={(e) => onFormChange("max_concurrency", e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
