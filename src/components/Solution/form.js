import React, { useState } from "react";
import CostItemModal from "../CostItem/Edit";
import cloneDeep from "lodash/cloneDeep";
import { getSubCategories } from "../../containers/Configuration/Categories/service";

function Form({
  formData,
  onChange,
  categories,
  vendors,
  subCategories,
  costItems,
  onPreview,
}) {
  // const [subCategories, setSubCategories] = useState([]);

  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
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
              // getSubCategories();
            }}
          >
            <option>select category</option>
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
          <label>Sub-category</label>
          <select
            className="form-control"
            value={formData.subcategory}
            onChange={(e) => {
              onFormChange(e.target.value, "category");
              // getSubCategories();
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
          <label>Feature</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
          />
        </div>
        <div className="form-group">
          <label>Sub-feature</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
          />
        </div>
        <div className="form-group">
          <label>Vendor</label>
          <select className="form-control">
            <option>Vendor</option>
            {vendors &&
              vendors.length &&
              vendors.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Cost Item</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <a href="javascript:;" className="preview" onClick={onPreview}>
            Preview
          </a>
        </div>
      </form>
    </>
  );
}

export default Form;
