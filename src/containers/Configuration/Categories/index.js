
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function Catergories() {


  return (
<>
      <div className="header">
        <h1>Catergories</h1>
        <button type="button" className="btn btn-primary">
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <hr />
    </>
  );
}

export default Catergories;
