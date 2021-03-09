import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";

import Modal from "./Add";
import Card from "./card";

import { getCategories, saveCategory, deleteCategory } from "./service";

function Catergories() {
  const { notify } = useNotify();
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const initialState = {
    name: "",
    sub_categories: [],
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch categories list.", "error")
      );
  };

  const onFormSubmit = () => {
    saveCategory(formData)
      .then((res) => {
        notify(
          `${formData.name} category has been saved successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify("Oops! Failed to fetch categories list.", "error")
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
          )
          onLoad();
        }
        )
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.name} category.`, "error")
        );
    } else {
    }
  };

  return (
    <>
      <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
      />
      <div className="header">
        <h1>Catergories</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container categories">
        <div className="row">
          {categories.map((item, idx) => (
            <Card key={idx} category={item} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catergories;
