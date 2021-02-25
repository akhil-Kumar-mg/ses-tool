
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function PNL() {


  return (
<>
      <div className="header">
        <h1>PNL</h1>
        <button type="button" className="btn btn-primary">
          ADD PNL <FaIcons icon="plus" />
        </button>
      </div>

      <hr />
    </>
  );
}

export default PNL;
