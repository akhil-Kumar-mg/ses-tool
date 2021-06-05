import { omit } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import Modal from "../../../components/Solution";
import { getCategories, getSubCategories } from "../Categories/service";
import { getVendorDetails, getVendors } from "../Vendors/service";
import schema from "./metadata/schema.json";
import {
  deleteSolution,
  editSolution,
  getSolutions,
  saveSolution,
} from "./service";
import "./style.scss";

function MasterSolution() {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [solutions, setSolutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [costItems, setCostItems] = useState([]);
  const [loadingChoices, setLoadingChoices] = useState(false);

  const initialState = {
    category: "",
    subcategory: "",
    vendor: "",
    cost_item: "",
    feature: "",
    sub_feature: "",
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("ADD");
    loadOptions();
  };

  useEffect(() => {
    onLoad();
  }, []);

  const loadOptions = (catId, vendorId) => {
    if (!loadingChoices) {
      setLoadingChoices(true);
      let allPromises = [];
      allPromises.push(getCategories());
      allPromises.push(getVendors());
      if (catId && vendorId) {
        allPromises.push(getSubCategories(catId));
        allPromises.push(getVendorDetails(vendorId));
      }
      Promise.all(allPromises)
        .then((res) => {
          setCategories(res[0]);
          setVendors(res[1]);
          if (res.length > 2) {
            setSubCategories(res[2].sub_categories);
            setCostItems(res[3].costitems);
          }
          setLoadingChoices(false);
          setShow(true);
        })
        .catch((err) => {
          setLoadingChoices(false);
        });
    }
  };

  const onLoad = () => {
    getSolutions()
      .then((res) => {
        setSolutions(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch master solution.", "error")
      );
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onSave = () => {
    saveSolution(formData)
      .then((res) => {
        notify(
          `${formData.name} solution has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) => notify(`Oops! Failed to add new solution.`, "error"));
  };

  const onEdit = (cloneData) => {
    let _formData;
    if (cloneData) {
      _formData = cloneData;
    } else {
      _formData = cloneDeep(omit(formData));
    }
    editSolution(_formData)
      .then((res) => {
        notify(`solution has been edited successfully.`, "success");
        onFormCancel();
        onLoad();
      })
      .catch((err) => notify(`Oops! Failed to edit solution.`, "error"));
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setMode("EDIT");
        setFormData(
          cloneDeep(
            omit(item, ["category_name", "subcategory_name", "vendor_name"])
          )
        );
        loadOptions(item.category, item.vendor);
        break;

      case "delete":
        if (item.is_active) {
          onDelete(item);
        } else {
          let _cloneItem = cloneDeep(
            omit(item, ["category_name", "subcategory_name", "vendor_name"])
          );
          _cloneItem.is_active = true;
          onEdit(_cloneItem);
        }
        break;
    }
  };

  const onDelete = (data) => {
    deleteSolution(data.id)
      .then((res) => {
        notify(`The solution has been removed successfully.`, "success");
        onLoad();
      })
      .catch((err) => notify(`Oops! Failed to remove the solution.`, "error"));
  };

  return (
    <>
      <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        categories={categories}
        subCategories={subCategories}
        vendors={vendors}
        costItems={costItems}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="header">
        <h1>Master Solution</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container master-solution-sheet-view">
        <Grid
          data={solutions}
          schema={schema}
          onChange={onGridChange}
          rowKey={"is_active"}
        />
      </div>
    </>
  );
}

export default MasterSolution;
