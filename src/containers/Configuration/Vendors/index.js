import React, { useState, useEffect } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import cloneDeep from "lodash/cloneDeep";

import Modal from "./Add";
import CostItemModal from "../../../components/CostItem";
import Card from "./card";
import useNotify from "../../../actions/Toast";

import { getVendors, saveVendor, editVendor, deleteVendor } from "./service";

function Vendors() {
  const { notify } = useNotify();
  const [vendors, setVendors] = useState([]);
  const [show, setShow] = useState(false);
  const [showCostItem, setShowCostItem] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [vendor, setSelectedVendor] = useState(null);

  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getVendors()
      .then((res) => {
        setVendors(res);
      })
      .catch((err) => notify("Oops! Failed to fetch vendor list.", "error"));
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onSave = () => {
    saveVendor(formData)
      .then((res) => {
        notify(
          `${formData.name} vendor has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new vendor ${formData.name}.`, "error")
      );
  };

  const onEdit = () => {
    editVendor(formData)
      .then((res) => {
        notify(
          `${formData.name} vendor has been saved successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add save vendor ${formData.name}.`, "error")
      );
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onView = (data) => {
    setMode("EDIT");
    setShow(true);
    setFormData(cloneDeep(data));
  };

  const onDelete = (data) => {
    const r = window.confirm(`Do you wish to remove '${data.name}' vendor?`);
    if (r === true) {
      deleteVendor(data.id)
        .then((res) => {
          notify(
            `'${data.name}' vendor has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.name} vendor.`, "error")
        );
    } else {
    }
  };

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  //Cost Item Modal
  const handleCostItemShow = () => setShowCostItem(true);

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
      {showCostItem ? (
        <CostItemModal
          showCostItems={showCostItem}
          setShowCostItems={setShowCostItem}
          vendor={vendor}
        />
      ) : (
        <></>
      )}

      <div className="header">
        <h1>Vendors</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD VENDOR <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container">
        <div className="row">
          {vendors.map((item, idx) => (
            <Card
              key={idx}
              vendor={item}
              onDelete={onDelete}
              onView={onView}
              onItemClick={() => {
                setSelectedVendor(item);
                handleCostItemShow();
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Vendors;
