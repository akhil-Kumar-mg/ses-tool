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
import { getSolutions } from "./service";
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
      if(catId && vendorId) {
        allPromises.push(getSubCategories(catId))
        allPromises.push(getVendorDetails(vendorId))
      }
      Promise.all(allPromises)
        .then((res) => {
          setCategories(res[0]);
          setVendors(res[1]);
          setSubCategories(res[2].sub_categories)
          setCostItems(res[3].costitems)
          setLoadingChoices(false);
        })
        .catch((err) => {
          setLoadingChoices(false);
        });
      setShow(true);
    }
  }

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
    //       `${formData.name} category has been saved successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to add save category ${formData.name}.`, "error")
    //   );
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setMode("EDIT");        
        setFormData(cloneDeep(omit(item, ["category_name", "subcategory_name", "vendor_name"])));
        loadOptions(item.category, item.vendor);
        break;

      case "delete":
        onDelete(item);
        break;
    }
  };

  const onDelete = (data) => {
    const r = window.confirm(
      `Do you wish to remove '${data.type}' subscriber?`
    );
    if (r === true) {
      // deleteSubscribers(data.id)
      //   .then((res) => {
      //     notify(
      //       `'${data.type}' subscriber has been removed successfully.`,
      //       "success"
      //     );
      //     onLoad();
      //   })
      //   .catch((err) =>
      //     notify(`Oops! Failed to remove ${data.type} subscriber.`, "error")
      //   );
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
      <div className="header">
        <h1>Master Solution</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={solutions} schema={schema}  onChange={onGridChange}/>
      </div>
    </>
  );
}

export default MasterSolution;
