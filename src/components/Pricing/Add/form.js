import cloneDeep from "lodash/cloneDeep";
import React, { useContext, useState } from "react";
import { getSubCategories } from "../../../containers/Configuration/Categories/service";
import { Context as AppContext } from "../../../context/AppContext";
import CostAddonForm from "./CostAddonForm";

function Form({ formData, onChange, subCategoryList, categories }) {
  const appContext = useContext(AppContext);
  const { pricing_model, pay_frequency, commercial_unit } = appContext.state;
  const [subCategories, setSubCategories] = useState(subCategoryList);

  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    switch (key) {
      case "cost_model":
        _formData.pricing_addons[0][key] = value;
        if (value.toLowerCase() === "unit_price") {
          _formData.pricing_addons[0].pricing_list = [
            {
              unit_start: 0,
              unit_end: 0,
              price: undefined,
            },
          ];
        } else if (
          value.toLowerCase() === "volume" ||
          value.toLowerCase() === "tier"
        ) {
          _formData.pricing_addons[0].pricing_list = [
            {
              unit_start: 1,
              unit_end: 0,
              price: 0,
            },
          ];
        }
        break;
      case "category":
        if (_formData[key] !== value) {
          _formData["subcategory"] = "";
        }
        _formData[key] = value;
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
          <label>Category</label>
          <select
            className="form-control"
            value={formData.category}
            onChange={(e) => {
              onFormChange(e.target.value, "category");
              getSubCategories(e.target.value).then((res) => {
                setSubCategories(res.sub_categories);
              });
            }}
          >
            <option value="" selected>
              select category
            </option>
            {categories &&
              categories.length &&
              categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Price Item</label>
          <select
            className="form-control"
            value={formData.subcategory}
            onChange={(e) => {
              onFormChange(e.target.value, "subcategory");
            }}
          >
            <option value="" selected>
              select sub category
            </option>
            {subCategories &&
              subCategories.length &&
              subCategories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
              value={formData.recurring_fee}
              onChange={(e) => onFormChange(e.target.value, "recurring_fee")}
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
          <label>Commercial units</label>
          <select
            className="form-control"
            value={formData.commercial_unit}
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
          <label>Add on</label>
          <div className="panel-group">
            <div className="form-group">
              <label>Cost Model</label>
              <select
                className="form-control"
                value={
                  formData.pricing_addons.length > 0
                    ? formData.pricing_addons[0].cost_model
                    : ""
                }
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
            {/* <label>Define pricing</label> */}
            <CostAddonForm
              formData={formData}
              onChange={onChange}
              actionTitle="Delete"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
