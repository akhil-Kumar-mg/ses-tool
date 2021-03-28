import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";


import Modal from "./Add";
import Card from "./card";

import {
  getCategories,
  saveCategory,
  deleteCategory,
  editCategory,
} from "./service";

function Catergories() {
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
    sub_categories: [],
    commercial_unit: "",
    units: []
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getCategories()
      .then((res) => {
        res.forEach(item=>{
          item.sub_categories.forEach(sub=>{
            sub.units = sub.commercial_unit.split(",")
          })
        })
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

  const onSave = () => {
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
    editCategory(formData)
      .then((res) => {
        notify(
          `${formData.name} category has been saved successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add save category ${formData.name}.`, "error")
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
