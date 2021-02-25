
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function Vendors() {


  return (
    <>
      <div className="header">
        <h1>Vendors</h1>
        <button type="button" className="btn btn-primary">
          ADD VENDOR <FaIcons icon="plus" />
        </button>
      </div>

      <hr />
    </>
  );
}

export default Vendors;
