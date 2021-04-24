import { cloneDeep } from "lodash";
import React, { useContext } from "react";
import { Context as AppContext } from "../../context/AppContext";
import AddonForm from "./addonForm";

function Form({ formData, disabled, onChange }) {
  const appContext = useContext(AppContext);
  const { pricing_model, pay_frequency, commercial_unit } = appContext.state;

  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    switch (key) {
      case "cost_model":
        _formData.cost_addons[0][key] = value;
        if (value.toLowerCase() === "unit_price") {
          _formData.cost_addons[0].addon_pricing = [
            {
              unit_start: 0,
              unit_end: 0,
              price: undefined,
            },
          ];
        } else if (value.toLowerCase() === "volume" || value.toLowerCase() === "tier") {
          _formData.cost_addons[0].addon_pricing = [
            {
              unit_start: 1,
              unit_end: 0,
              price: 0,
            },
          ];
        }
        break;
      default:
        _formData[key] = value;
    }

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
            placeholder="Cost Item name"
            value={formData.item}
            onChange={(e) => onFormChange(e.target.value, "item")}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label>Commercial units</label>
          <select
            className="form-control"
            value={formData.commercial_unit}
            disabled={disabled}
            onChange={(e) => onFormChange(e.target.value, "commercial_unit")}
          >
            <option>Select</option>
            {commercial_unit &&
              commercial_unit.length &&
              commercial_unit.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
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
              value={formData.setup_fee}
              disabled={disabled}
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
              value={formData.recurring_fee}
              onChange={(e) => onFormChange(e.target.value, "recurring_fee")}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pay frequency</label>
          <select
            className="form-control"
            value={formData.frequency}
            disabled={disabled}
            onChange={(e) => onFormChange(e.target.value, "frequency")}
          >
            <option>Select</option>
            {pay_frequency &&
              pay_frequency.length &&
              pay_frequency.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label>Add on</label>
          <div className="panel-group">
            <div className="form-group">
              <label>Cost Model</label>
              <select
                className="form-control"
                value={
                  formData.cost_addons.length > 0
                    ? formData.cost_addons[0].cost_model
                    : ""
                }
                disabled={disabled}
                onChange={(e) => onFormChange(e.target.value, "cost_model")}
              >
                <option>Select</option>
                {pricing_model &&
                  pricing_model.length &&
                  pricing_model.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <AddonForm
              formData={formData}
              onChange={onChange}
              actionTitle="Delete"
              disabled={disabled}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
