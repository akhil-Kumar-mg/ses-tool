import cloneDeep from "lodash/cloneDeep";
import React from "react";

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
              <label>SG&A Allocation Percent</label>
              <input
                className="form-control"
                placeholder="Content"
                value={formData.sga_percent}
                onChange={(e) => onFormChange("sga_percent", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Special Item SG&A Allocation Cap</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.sga_cap}
                onChange={(e) => onFormChange("sga_cap", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Tax %</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.tax_percent}
                onChange={(e) => onFormChange("tax_percent", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label>CAPEX Depreciation duration months</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.capex_depreciation_duration}
                onChange={(e) =>
                  onFormChange("capex_depreciation_duration", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
