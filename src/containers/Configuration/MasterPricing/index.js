import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

import PricingModal from '../../../components/Pricing/Add';

function MasterPricing() {
      //Cost Item Modal
      const [showPricing, setShowPricing] = useState(false);
      const handlePricing = () => setShowPricing(true);

  const onGridChange = (event, item)=>{
    switch(event){
      case 'onAddPrice':
        handlePricing()
        break;
    }

  }
  return (
    <>
    <PricingModal show={showPricing} setShow={setShowPricing}/>
      <div className="header">
        <h1>Master Pricing</h1>
        {/* <button type="button" className="btn btn-primary">
          ADD PRICING <FaIcons icon="plus" />
        </button> */}
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange}/>
      </div>
    </>
  );
}

export default MasterPricing;
