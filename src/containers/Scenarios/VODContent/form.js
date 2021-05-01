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
                value={formData.min_library_size}
                onChange={(e) =>
                  onFormChange("min_library_size", e.target.value)
                }
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
                value={formData.max_library_size}
                onChange={(e) =>
                  onFormChange("max_library_size", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Montly Ingest Hours</label>
              <input
                type="text"
                placeholder="Content"
                className="form-control"
                value={formData.month_ingest_hours}
                onChange={(e) =>
                  onFormChange("month_ingest_hours", e.target.value)
                }
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Montly Purge Hours</label>
              <input
                type="text"
                placeholder="Content"
                className="form-control"
                value={formData.month_purge_hours}
                onChange={(e) =>
                  onFormChange("month_purge_hours", e.target.value)
                }
              />
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
                value={formData.avg_asset_duration}
                onChange={(e) =>
                  onFormChange("avg_asset_duration", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Archive</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.archive}
                onChange={(e) => onFormChange("archive", e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
