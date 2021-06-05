import { omit } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import { getCategories } from "../../Configuration/Categories/service";
import { getPeriods } from "../Periods/service";
import Modal from "./Add";
import schema from "./metadata/schema.json";
import {
  saveCommercialAddon,
  editCommercialAddon,
  deleteCommercialAddon,
  getCommercialAddons,
} from "./service";
import "./style.scss";

function CommercialAddons(props) {
  const { notify } = useNotify();

  const initialState = {
    category: "",
    cost_name: "",
    capex_items: [],
    opex_items: [],
    project: props.match.params.projectId,
    forecast: props.match.params.forecastId,
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [commercialAddOns, setCommercialAddons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(cloneDeep(initialState));
  const [loadingChoices, setLoadingChoices] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getCommercialAddons(
      props.match.params.forecastId,
      props.match.params.projectId
    )
      .then((res) => {
        setCommercialAddons(res);
      })
      .catch((err) => notify("Oops! Failed to fetch subscribers", "error"));
  };

  const loadOptions = (loadOnlyCat) => {
    if (!loadingChoices) {
      setLoadingChoices(true);
      let allPromises = [];
      allPromises.push(getCategories());
      if (!loadOnlyCat) {
        allPromises.push(
          getPeriods(
            props.match.params.forecastId,
            props.match.params.projectId
          )
        );
      }
      Promise.all(allPromises)
        .then((res) => {
          setCategories(res[0]);
          if (res.length > 1) {
            setCapexAndOpexItems(res[1]);
          }
          setLoadingChoices(false);
          setShow(true);
        })
        .catch((err) => {
          setLoadingChoices(false);
        });
    }
  };

  const setCapexAndOpexItems = (items) => {
    let _formData = cloneDeep(formData);
    let capex_items = items.map((item) => {
      return {
        period_name: item.period_name,
        value: "",
        period: item.id,
      };
    });
    let opex_items = items.map((item) => {
      return {
        period_name: item.period_name,
        value: "",
        period: item.id,
      };
    });
    _formData.capex_items = capex_items;
    _formData.opex_items = opex_items;
    setFormData(_formData);
  };

  const handleShow = () => {
    setMode("ADD");
    loadOptions(false);
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {
    let _formData = cloneDeep(formData);
    _formData.capex_items = _formData.capex_items.map((capex_item) => {
      return {
        value: capex_item.value,
        period: capex_item.period,
      };
    });
    _formData.opex_items = _formData.opex_items.map((opex_items) => {
      return {
        value: opex_items.value,
        period: opex_items.period,
      };
    });
    editCommercialAddon(_formData)
      .then((res) => {
        notify(`commercial add on has been edited successfully.`, "success");
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to edit commercial add ons`, "error")
      );
  };

  const onSave = () => {
    let _formData = cloneDeep(formData);
    _formData.capex_items = _formData.capex_items.map((capex_item) => {
      return {
        value: capex_item.value,
        period: capex_item.period,
      };
    });
    _formData.opex_items = _formData.opex_items.map((opex_items) => {
      return {
        value: opex_items.value,
        period: opex_items.period,
      };
    });
    saveCommercialAddon(_formData)
      .then((res) => {
        notify(`commercial add on has been added successfully.`, "success");
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new commercial add on`, "error")
      );
  };

  const onDelete = (data) => {
    const r = window.confirm(`Do you wish to remove this commerical add on?`);
    if (r === true) {
      deleteCommercialAddon(data.id)
        .then((res) => {
          notify(`commerical add on has been removed successfully.`, "success");
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove commercial add on`, "error")
        );
    } else {
    }
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setShow(true);
        setMode("EDIT");
        setFormData(cloneDeep(item));
        loadOptions(true);
        break;

      case "delete":
        onDelete(item);
        break;
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
        mode={mode}
        categories={categories}
      />
      <div className="header">
        <h1>
          <Link
            to={`/App/Projects/${props.match.params.projectId}/Setup/Scenarios`}
            className="nav-back"
          >
            <FaIcons icon="arrow-left" />
          </Link>
          Commercial Add Ons
        </h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD COMMERCIAL ADD ON <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={commercialAddOns} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default CommercialAddons;
