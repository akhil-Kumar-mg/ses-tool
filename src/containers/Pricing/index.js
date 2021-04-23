import React, { useState, useEffect } from "react";
import Grid from "../../components/Grid";
import PricingModal from "../../components/MasterPricing/Add";
import schema from "./metadata/schema.json";
import { definePricing, getPricings, addPricing } from "./service";
import "./style.scss";
import useNotify from "../../actions/Toast";
import cloneDeep from "lodash/cloneDeep";
import { omit } from "lodash";
import FaIcons from "../../components/fa-icons";
import {
  getCategories,
  getSubCategories,
} from "../Configuration/Categories/service";

function Pricing(props) {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [pricings, setPricings] = useState([]);
  const [mode, setMode] = useState("EDIT");
  const [loadingChoices, setLoadingChoices] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const initialState = {
    category: "",
    subcategory: "",
    project_pricing_addon: [
      {
        cost_model: "volume",
        project_pricing_list: [
          {
            unit_start: 1,
            unit_end: undefined,
            price: undefined,
          },
        ],
      },
    ],
    commercial_unit: "",
    currency: "USD",
    setup_fee: "",
    recurring_fee: "",
    pay_frequency: "",
    status: "",
    project: props.match.params.projectId,
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getPricings(props.match.params.projectId)
      .then((res) => {
        setPricings(res);
      })
      .catch((err) => notify("Oops! Failed to fetch pricing list.", "error"));
  };

  const handleShow = () => {
    setMode("ADD");
    let _cloneItem = cloneDeep(initialState);
    _cloneItem.currency = "USD";
    _cloneItem.project = props.match.params.projectId;
    setFormData(_cloneItem);
    setShow(true);
    loadOptions();
  };

  const loadOptions = (catId) => {
    if (!loadingChoices) {
      setLoadingChoices(true);
      let allPromises = [];
      allPromises.push(getCategories());
      if (catId) {
        allPromises.push(getSubCategories(catId));
      }
      Promise.all(allPromises)
        .then((res) => {
          setCategories(res[0]);
          if (res.length > 1) {
            setSubCategories(res[1].sub_categories);
          }
          setLoadingChoices(false);
          setShow(true);
        })
        .catch((err) => {
          setLoadingChoices(false);
        });
    }
  };

  // const onGridChange = (event, item) => {
  //   switch (event) {
  //     case "onAddPrice":
  //       setMode("ADD");
  //       let _cloneItem = cloneDeep(item);
  //       _cloneItem.currency = "USD";
  //       _cloneItem.project = props.match.params.projectId;
  //       if (item.project_pricing_addon.length == 0) {
  //         let temp = {
  //           cost_model: "volume",
  //           project_pricing_list: [
  //             {
  //               unit_start: 1,
  //               unit_end: undefined,
  //               price: undefined,
  //             },
  //           ],
  //         };
  //         _cloneItem.project_pricing_addon.push(temp);
  //       }
  //       setFormData(_cloneItem);
  //       handleShow();
  //       break;
  //   }
  // };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setMode("EDIT");
        setFormData(
          cloneDeep(
            omit(item, ["category_name", "subcategory_name", "vendor_name"])
          )
        );
        loadOptions(item.category);
        break;

      // case "delete":
      //   onDelete(item);
      //   break;
    }
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onSave = () => {
    addPricing(cloneDeep(omit(formData, ["status"])))
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
    definePricing(cloneDeep(omit(formData, ["status"])))
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
        categories={categories}
        subCategories={subCategories}
        mode={mode}
      />
      <div className="header">
        <h1>Master Pricing</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD PRICING <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={pricings} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Pricing;
