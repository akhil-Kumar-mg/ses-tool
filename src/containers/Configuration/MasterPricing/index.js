import React, { useState, useEffect } from "react";
import Grid from "../../../components/Grid";
import PricingModal from "../../../components/Pricing/Add";
import schema from "./metadata/schema.json";
import { definePricing, getPricings } from "./service";
import "./style.scss";
import useNotify from "../../../actions/Toast";
import cloneDeep from "lodash/cloneDeep";
import { omit } from "lodash";

function MasterPricing() {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [pricings, setPricings] = useState([]);
  const [mode, setMode] = useState("EDIT");

  const initialState = {
    category: "",
    subcategory: "",
    pricing_addon: [
      {
        cost_model: "volume",
        pricing_list: [],
      },
    ],
    commercial_unit: "",
    currency: "USD",
    setup_fee: "",
    recurring_fee: "",
    pay_frequency: "",
    status: "",
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
        let _cloneItem = cloneDeep(item);
        _cloneItem.currency = "USD"
        if (item.pricing_addon.length == 0) {
          let temp = {
            cost_model: "volume",
            pricing_list: [
              {
                unit_start: 1,
                unit_end: undefined,
                price: undefined,
              },
            ],
          };
          _cloneItem.pricing_addon.push(temp);
        }
        setFormData(_cloneItem);
        handleShow();
        break;
    }
  };

  const onFormSubmit = () => {
    onEdit();
  };

  const onEdit = () => {
    definePricing(cloneDeep(omit(formData, ["category", "subcategory", "status"])))
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
