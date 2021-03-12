import React, { useState } from "react";
import CostItemModal from '../CostItem/Edit';

function Form() {
    //Cost Item Modal
    const [showCostItem, setShowCostItem] = useState(false);
    const handleCostItemShow = () => setShowCostItem(true);
  return (
    <>
    <CostItemModal show={showCostItem} setShow={setShowCostItem}/>
      <form>
        <div className="form-group">
          <label>Category</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sub-category</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
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
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
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
          <a href="javascript:;" className="preview" onClick={handleCostItemShow}>
            Preview
          </a>
        </div>
      </form>
    </>
  );
}

export default Form;
