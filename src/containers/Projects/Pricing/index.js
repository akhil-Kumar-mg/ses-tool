
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

function Pricing() {

  const onGridChange = (event, item)=>{
    switch(event){
      case 'onSetup':
        // handlePricing()
        break;
    }
  }
  return (
    <>
      <div className="header">
        <h1>Pricing</h1>
        <button type="button" className="btn btn-primary">
          ADD PRICING <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange}/>
      </div>
    </>
  );
}

export default Pricing;
