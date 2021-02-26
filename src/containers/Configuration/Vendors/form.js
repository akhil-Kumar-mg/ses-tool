import React, { useState } from "react";
import "./style.scss";

function Form() {

  return (
    <>
      <form>
    <div className="form-group">
      <input type="text" className="form-control bg-white" placeholder="Vendor name" />
    </div>
    <div className="form-group">
      <label>Vendor ID (auto generated)</label>
      <input type="text" className="form-control" placeholder="Placeholder text" />
    </div>

    <div className="form-group">
      <label>Description</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" placeholder="Placeholder text"></textarea>
    </div>
    
  </form>
    </>
  );
}

export default Form;
