import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function Form({ formData, onChange }) {
  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    _formData.vendor_cost[0][key] = value;
    onChange({ ..._formData });
  };

  const onSubFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    _formData.vendor_cost[0].cost_addon[0][key] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>Name of cost item</label>
          <input
            type="text"
            className="form-control"
            placeholder="Vendor name"
            value={formData.vendor_cost[0].item}
            onChange={(e) => onFormChange(e.target.value, "item")}
          />
        </div>
        <div className="form-group">
          <label>Commercial units</label>
          <select
            className="form-control"
            value={formData.vendor_cost[0].commercial_unit}
            onChange={(e) => onFormChange(e.target.value, "commercial_unit")}
          >
            <option>Placeholder text</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Setup fee</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                USD
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
              value={formData.vendor_cost[0].setup_fee}
              onChange={(e) => onFormChange(e.target.value, "setup_fee")}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Recurring fee</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                USD
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
              value={formData.vendor_cost[0].recurring_fee}
              onChange={(e) => onFormChange(e.target.value, "recurring_fee")}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pay frequency</label>
          <select
            className="form-control"
            onChange={(e) => onFormChange(e.target.value, "frequency")}
          >
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div className="form-group">
          <label>Add on</label>
          <div className="panel-group">
            <div className="form-group">
              <label>Cost Model</label>
              <select
                className="form-control"
                onChange={(e) => onSubFormChange(e.target.value, "cost_model")}
              >
                <option>Placeholder text</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="form-group">
              <label>Define pricing</label>
              <div className="row">
                <div className="col">
                  <label>Unit 1 to</label>
                </div>
                <div className="col">
                  <label>Price per unit</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1000"
                    value={formData.vendor_cost[0].cost_addon[0].unit_start}
                    onChange={(e) =>
                      onSubFormChange(e.target.value, "unit_start")
                    }
                  />
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        USD
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={formData.vendor_cost[0].cost_addon[0].price}
                      onChange={(e) => onSubFormChange(e.target.value, "price")}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Unit 1001 to</label>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2000"
                    value={formData.vendor_cost[0].cost_addon[0].unit_end}
                    onChange={(e) =>
                      onSubFormChange(e.target.value, "unit_end")
                    }
                  />
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        USD
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={formData.vendor_cost[0].cost_addon[0].price}
                      onChange={(e) => onSubFormChange(e.target.value, "price")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Pay frequency</label>
              <select
                className="form-control"
                onChange={(e) => onSubFormChange(e.target.value, "frequency")}
              >
                <option>Placeholder text</option>
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
