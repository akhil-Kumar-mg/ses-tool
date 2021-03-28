import React, { useState, useEffect } from "react";
import Grid from "../../../components/Grid";
import PricingModal from "../../../components/Pricing/Add";
import schema from "./metadata/schema.json";
import { getPricings } from "./service";
import "./style.scss";
import useNotify from "../../../actions/Toast";


function MasterPricing() {
  const { notify } = useNotify();
  const [showPricing, setShowPricing] = useState(false);
  const handlePricing = () => setShowPricing(true);
  const [pricings, setPricings] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getPricings()
      .then((res) => {
        setPricings(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch pricing list.", "error")
      );
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "onAddPrice":
        handlePricing();
        break;
    }
  };
  return (
    <>
      <PricingModal show={showPricing} setShow={setShowPricing} />
      <div className="header">
        <h1>Master Pricing</h1>
        {/* <button type="button" className="btn btn-primary">
          ADD PRICING <FaIcons icon="plus" />
        </button> */}
      </div>
      <div className="sub-container">
        <Grid data={pricings} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default MasterPricing;
