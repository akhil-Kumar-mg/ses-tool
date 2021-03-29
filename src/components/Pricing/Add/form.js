import cloneDeep from "lodash/cloneDeep";
import React, { useContext } from "react";
import { Context as AppContext } from "../../../context/AppContext";

function Form({ formData, onChange }) {
  const appContext = useContext(AppContext);
  const { pricing_model, pay_frequency } = appContext.state;

  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    switch (key) {
      case "cost_model":
        _formData.pricing_addon[0][key] = value;
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
              placeholder=""
              value={formData.setup_fee}
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
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pay frequency</label>
          <select
            className="form-control"
            value={formData.pay_frequency}
            onChange={(e) => onFormChange(e.target.value, "pay_frequency")}
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
                value={formData.pricing_addon[0].cost_model}
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
