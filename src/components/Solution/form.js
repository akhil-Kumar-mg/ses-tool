import cloneDeep from "lodash/cloneDeep";
import React, { useState } from "react";
import { getSubCategories } from "../../containers/Configuration/Categories/service";
import { getVendorDetails } from "../../containers/Configuration/Vendors/service";

function Form({
  formData,
  onChange,
  categories,
  vendors,
  subCategoryList,
  costItemLIst,
  onPreview,
}) {
  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData);
    switch (key) {
      case "category":
        if (_formData[key] !== value) {
          _formData["subcategory"] = "";
        }
        break;
      case "vendor":
        if (_formData[key] !== value) {
          _formData["cost_item"] = "";
        }
        break;
    }
    _formData[key] = value;
    onChange({ ..._formData });
  };

  const [subCategories, setSubCategories] = useState(subCategoryList);
  const [costItems, setCostItems] = useState(costItemLIst);

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
          <label>Sub-category</label>
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
          <label>Feature</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.feature}
            onChange={(e) => onFormChange(e.target.value, "feature")}
          />
        </div>
        <div className="form-group">
          <label>Sub-feature</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.sub_feature}
            onChange={(e) => onFormChange(e.target.value, "sub_feature")}
          />
        </div>
        <div className="form-group">
          <label>Vendor</label>
          <select
            className="form-control"
            value={formData.vendor}
            onChange={(e) => {
              onFormChange(e.target.value, "vendor");
              getVendorDetails(e.target.value).then((res) => {
                setCostItems(res.costitems);
              });
            }}
          >
            <option value="" selected>
              select vendor
            </option>
            {vendors &&
              vendors.length &&
              vendors.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Cost Item</label>
          <select
            className="form-control"
            value={formData.cost_item}
            onChange={(e) => {
              onFormChange(e.target.value, "cost_item");
              // getSubCategories();
            }}
          >
            <option value="" selected>
              select cost item
            </option>
            {costItems &&
              costItems.length &&
              costItems.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.item}
                  </option>
                );
              })}
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
