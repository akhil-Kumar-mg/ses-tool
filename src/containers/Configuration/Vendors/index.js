import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

import FormModal from "./Add";
import CostItemModal from "./CostItem";
import Card from "./card";

function Vendors() {
  const items = [...Array(15).keys()];

  //Form Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Cost Item Modal
  const [showCostItem, setShowCostItem] = useState(false);
  const handleCostItemShow = () => setShowCostItem(true);
  
  return (
    <>
      <FormModal show={show} setShow={setShow}/>
      <CostItemModal show={showCostItem} setShow={setShowCostItem}/>
      <div className="header">
        <h1>Vendors</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD VENDOR <FaIcons icon="plus" />
        </button>
      </div>

      

      <div className="sub-container">
        <div className="row">
            {items.map(item=> <Card key={item} onItemClick={handleCostItemShow}/>)}
        </div>
      </div>
    </>
  );
}

export default Vendors;
