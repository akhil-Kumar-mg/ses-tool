import React, { useState, useEffect, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";
import { Context as AppContext } from "../../../context/AppContext";
import Modal from "./Add";
import Card from "./card";


import {
  getCategories,
  saveCategory,
  deleteCategory,
  editCategory,
} from "./service";

const randomstring = require("randomstring");

function Catergories() {
  const appContext = useContext(AppContext);
  const { commercial_unit } = appContext.state;
  const { notify } = useNotify();
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  const initialState = {
    name: "",
    sub_categories: [{
      uuid: randomstring.generate(), 
      name: "",
      commercial_unit: "",
      units: commercial_unit ? commercial_unit.map((item, idx)=>  {return {id: idx, name: item, selected: false}}): []
    }]
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getCategories()
      .then((res) => {
        res.forEach((item) => {
          item.sub_categories.forEach((sub) => {
            sub.units = commercial_unit ? commercial_unit.map((item, idx)=>  {return {id: idx, name: item, selected: sub.commercial_unit.split(",").includes(item)}}): [];

          });
        });
        setCategories(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch categories list.", "error")
      );
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const isFormValid = () => {
    let isValid = true;
    if(!formData.name){
      isValid = false;
      return isValid;
    }
    formData.sub_categories.forEach(item=>{
      if(!item.name || !item.commercial_unit){
        isValid = false;

      }
    })

    return isValid;
  }

  const onSave = () => {
    if(!isFormValid()){
      notify(`Required fields are mandatory`, "error")
      return;
    }
    saveCategory(formData)
      .then((res) => {
        notify(
          `${formData.name} category has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new category ${formData.name}.`, "error")
      );
  };

  const onEdit = () => {
    if(!isFormValid()){
      notify(`Required fields are mandatory`, "error")
      return;
    }
    editCategory(formData)
      .then((res) => {
        notify(
          `${formData.name} category has been edited successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to edit category ${formData.name}.`, "error")
      );
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onDelete = (data) => {
    const r = window.confirm(`Do you wish to remove '${data.name}' category?`);
    if (r === true) {
      deleteCategory(data.id)
        .then((res) => {
          notify(
            `'${data.name}' category has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.name} category.`, "error")
        );
    } else {
    }
  };

  const onView = (data) => {
    setMode("EDIT");
    setShow(true);
    setFormData(cloneDeep(data));
  };

  return (
    <>
      <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="header">
        <h1>Categories</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container categories">
        <div className="row">
          {categories.map((item, idx) => (
            <Card
              key={idx}
              category={item}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catergories;
