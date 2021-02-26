import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";

import Modal from "./modal";
import Card from "./card";

function Vendors() {
  const items = [...Array(15).keys()];
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} setShow={setShow}/>
      <div className="header">
        <h1>Vendors</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD VENDOR <FaIcons icon="plus" />
        </button>
      </div>

      

      <div className="sub-container">
        <div className="row">
            {items.map(item=> <Card key={item} />)}
        </div>
      </div>
    </>
  );
}

export default Vendors;
