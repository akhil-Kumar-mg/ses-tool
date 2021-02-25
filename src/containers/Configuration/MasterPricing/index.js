
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function MasterPricing() {


  return (
<>
      <div className="header">
        <h1>Master Pricing</h1>
        <button type="button" className="btn btn-primary">
          ADD PRICING <FaIcons icon="plus" />
        </button>
      </div>

    </>
  );
}

export default MasterPricing;
