import React, { useState, useEffect } from "react";
import Grid from "../../../components/Grid";
import PricingModal from "../../../components/Pricing/Add";
import schema from "./metadata/schema.json";
import { getPricings } from "./service";
import "./style.scss";
import useNotify from "../../../actions/Toast";
import cloneDeep from "lodash/cloneDeep";

function MasterPricing() {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [pricings, setPricings] = useState([]);
  const [mode, setMode] = useState("ADD");

  const initialState = {
    category: "",
    subcategory: "",
    pricing_addon: [],
    commercial_unit: "",
    currency:"",
    setup_fee: "",
    recurring_fee: "",
    pay_frequency: ""
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getPricings()
      .then((res) => {
        setPricings(res);
      })
      .catch((err) => notify("Oops! Failed to fetch pricing list.", "error"));
  };

  const handleShow = () => {
    setShow(true);
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "onAddPrice":
        setMode("ADD");
        setFormData(cloneDeep(item));
        handleShow();
        break;
    }
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onSave = () => {
    // saveCategory(formData)
    //   .then((res) => {
    //     notify(
    //       `${formData.name} category has been added successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to add new category ${formData.name}.`, "error")
    //   );
  };

  const onEdit = () => {
    // editCategory(formData)
    //   .then((res) => {
    //     notify(
    //       `${formData.name} category has been edited successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to edit category ${formData.name}.`, "error")
    //   );
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  return (
    <>
      <PricingModal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="header">
        <h1>Master Pricing</h1>
      </div>
      <div className="sub-container">
        <Grid data={pricings} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default MasterPricing;
