import React, { useState } from "react";

function Form() {
  return (
    <>
      <form>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Category</label>
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
          <label for="exampleFormControlTextarea1">Sub-category</label>
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
          <label for="exampleFormControlSelect1">Feature</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlSelect1">Sub-feature</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Vendor</label>
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
          <label for="exampleFormControlTextarea1">Cost Item</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <a href="javascript:;" className="preview">
            Preview
          </a>
        </div>
      </form>
    </>
  );
}

export default Form;
