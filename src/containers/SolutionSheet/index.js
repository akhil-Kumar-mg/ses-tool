import { omit } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import useNotify from "../../actions/Toast";
import Grid from "../../components/Grid";
import Modal from "../../components/Solution";
import {
  getCategories,
  getSubCategories
} from "../Configuration/Categories/service";
import { getVendorDetails, getVendors } from "../Configuration/Vendors/service";
import schema from "./metadata/schema.json";
import {
  deleteSolution,
  editSolution,
  getSolutions,
  saveSolution
} from "./service";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

function SolutionSheet(props) {
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
    project: props.match.params.projectId,
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("ADD");
    loadOptions();
    setLoadingChoices(false)
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
    getSolutions(props.match.params.projectId)
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

  const onEdit = () => {
    let _formData = cloneDeep(omit(formData, ["id"]));
    editSolution(_formData, formData.id)
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
        onDelete(item);
        break;
    }
  };

  const onDelete = (data) => {
    const r = window.confirm(`Do you wish to remove this solution?`);
    if (r === true) {
      deleteSolution(data.id)
        .then((res) => {
          notify(`The solution has been removed successfully.`, "success");
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove the solution.`, "error")
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
        categories={categories}
        subCategories={subCategories}
        vendors={vendors}
        costItems={costItems}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      {/* <ConfirmModal
        show={showConfirm}
        title="Do you want to change cost item for all?"
        body={() => (
          <label>
            The cost item at you are changings linked to other solution
            components too. Do you want to change cost item for those components
            too?{" "}
          </label>
        )}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-5">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={handleCloseConfirm}
                >
                  NO NEED
                </button>
              </div>
              <div className="col-sm-5">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseConfirm}
                >
                  YES, PLEASE
                </button>
              </div>
            </div>
          );
        }}
        setShow={setShowConfirm}
        onSubmit={onAddConfirm}
      /> */}
      <div className="header">
        <h1>Project Solution</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container projects-solution-sheet-view">
        <Grid data={solutions} schema={schema} onChange={onGridChange} rowKey={"is_active"} />
      </div>
    </>
  );
}

export default SolutionSheet;
