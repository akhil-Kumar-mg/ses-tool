import React, { useState, useEffect } from "react";
import cloneDeep from 'lodash/cloneDeep';
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";

import Modal from "./Add";
import Card from "./card";

import { get, save } from "./service";

function Catergories() {
  const { notify } = useNotify();
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const initialState = {
    name: "",
    sub_categories: []
  }
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad=()=>{
    get()
    .then((res) => {
      setCategories(res);
    })
    .catch((err) => notify("Oops! Failed to fetch categories list.", "error"));
  }

  const onFormSubmit = () =>{
    save(formData).then(res=> {
      notify(`${formData.name} category has been saved successfully.`, "success");
      onFormCancel();
      onLoad();
    }).catch(err=>notify("Oops! Failed to fetch categories list.", "error"))
  }
  
  const onFormCancel = () =>{
    setShow(false);
    setFormData(cloneDeep(initialState))
  }

  return (
    <>
      <Modal show={show} onCancel={onFormCancel} formData={formData} onChange={setFormData} onSubmit={onFormSubmit}/>
      <div className="header">
        <h1>Catergories</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container categories">
        <div className="row">
          {categories.map((item, idx) => (
            <Card key={idx} category={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catergories;
