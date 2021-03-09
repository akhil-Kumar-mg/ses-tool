import React, { useState, useEffect } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Modal from "./Add";
import Card from "./card";

import {getCategories} from './service';

function Catergories() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCategories().then(res=>{

      setCategories(res)}
      ).catch(err=>console.log(err))
  },[])

  return (
    <>
      <Modal show={show} setShow={setShow}/>
      <div className="header">
        <h1>Catergories</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container categories">
        <div className="row">
          {categories.map((item, idx) => (
            <Card key={idx} category={item}/>
          ))}
        </div>
      </div>
    </>
  );
}



export default Catergories;
