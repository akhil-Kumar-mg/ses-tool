import React, { useState } from "react";
import "./style.scss";

function Form() {

  return (
    <>
      <form>
    <div className="form-group">
      <input type="text" className="form-control bg-white" placeholder="Category name" />
    </div>
    <div className="form-group">
      <label for="exampleFormControlSelect1">Sub-category name</label>
      <input type="text" className="form-control" placeholder="Placeholder text" />
    </div>
    
    <div className="form-group">
      <label for="exampleFormControlTextarea1">Applicable commercial units</label>
      <select className="form-control" >
        <option>Placeholder text</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div className="center">
      <a href="javascript:;;">Add another</a>
    </div>
  </form>
    </>
  );
}

export default Form;
