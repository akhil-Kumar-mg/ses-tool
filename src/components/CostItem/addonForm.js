import { cloneDeep } from "lodash";
import React from "react";

function AddonForm({ formData, onChange, disabled }) {
  const initialState = {
    unit_start: undefined,
    unit_end: undefined,
    price: undefined,
  };

  const onSubFormChange = (key, value, idx) => {
    const _formData = cloneDeep(formData);
    _formData.cost_addons[0].addon_pricing[idx][key] = value;
    onChange({ ..._formData });
  };

  const onPriceAdd = () => {
    // data.id = randomstring.generate();
    const _formData = cloneDeep(formData);
    let pricingList = _formData.cost_addons[0].addon_pricing;
    let nextUnitStart = 1;
    if (pricingList.length) {
      nextUnitStart =
        parseInt(pricingList[pricingList.length - 1].unit_end) + 1;
    }
    pricingList.push({
      ...initialState,
      unit_start: nextUnitStart.toString(),
    });
    onChange({ ..._formData });
  };

  const onPriceDelete = () => {
    const _formData = cloneDeep(formData);
    _formData.cost_addons[0].addon_pricing.pop();
    onChange({ ..._formData });
  };

  switch (formData.cost_addons.length > 0 && formData.cost_addons[0].cost_model.toLowerCase()) {
    case "volume":
    case "tier":
      return (
        <VariablePriceComp
          formData={formData}
          onSubFormChange={onSubFormChange}
          onPriceAdd={onPriceAdd}
          onPriceDelete={onPriceDelete}
          disabled={disabled}
        />
      );
    case "unit_price":
    default:
      return (
        <UnitPriceComp
          formData={formData}
          onSubFormChange={onSubFormChange}
          disabled={disabled}
        />
      );
  }
}

function VariablePriceComp({
  formData,
  onSubFormChange,
  onPriceAdd,
  onPriceDelete,
  disabled,
}) {
  return (
    <form>
      {formData.cost_addons[0].addon_pricing.map((item, idx) => {
        return (
          <>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label>
                    Unit {item.unit_start} to {item.unit_end}
                  </label>
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
                    placeholder=""
                    value={item.unit_end}
                    disabled={disabled}
                    onChange={(e) =>
                      onSubFormChange("unit_end", e.target.value, idx)
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
                      value={item.price}
                      disabled={disabled}
                      onChange={(e) =>
                        onSubFormChange("price", e.target.value, idx)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="row">
        <div className="col" style={{ textAlign: "left" }}>
          <a onClick={onPriceAdd} href="javascript:void();">
            Add
          </a>
        </div>
        {formData.cost_addons[0].addon_pricing.length && (
          <div className="col" style={{ textAlign: "right" }}>
            <a onClick={onPriceDelete} href="javascript:void();">
              Delete
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

function UnitPriceComp({ onSubFormChange, formData }) {
  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label>Price per unit</label>
          </div>
        </div>
        <div className="row">
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
                value={
                  formData.cost_addons[0].addon_pricing.length &&
                  formData.cost_addons[0].addon_pricing[0].price
                }
                onChange={(e) => onSubFormChange("price", e.target.value, 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddonForm;
