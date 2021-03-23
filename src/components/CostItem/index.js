import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import {
  getVendorDetails,
  saveCostItem,
  editCostItem,
  deleteCostItem,
} from "../../containers/Configuration/Vendors/service";
import Modal from "../Modal";
import FormModal from "./Add";
import Card from "./card";
import useNotify from "../../actions/Toast";

function ModalContainer({ showCostItems, setShowCostItems, vendor }) {
  const [show, setShow] = useState(false);
  const [costItems, setCostItems] = useState([]);
  const [mode, setMode] = useState("ADD");
  const { notify } = useNotify();

  useEffect(() => {
    fetchCostItems();
  }, []);

  const fetchCostItems = () => {
    getVendorDetails(vendor.id)
      .then((res) => {
        setCostItems(res.vendor_cost);
      })
      .catch((err) => {
        notify("Oops! Failed to fetch cost item list.", "error");
      });
  };

  const initialState = {
    id: vendor.id,
    vendor_cost: [
      {
        item: "",
        commercial_unit: "",
        currency: "$",
        setup_fee: "",
        recurring_fee: "",
        frequency: "",
        cost_addon: [
          {
            cost_model: "",
            unit_start: "",
            unit_end: "",
            currency: "$",
            price: "",
            frequency: "",
          },
        ],
      },
    ],
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const handleDeleteCostItem = (item) => {
    const r = window.confirm(`Do you wish to remove '${item.cost_addon[0].cost_model}' cost item?`);
    if (r === true) {
      deleteCostItem(item.cost_addon[0].id)
      .then((res) => {
        notify(
          `${formData.vendor_cost[0].item} cost item has been deleted successfully.`,
          "success"
        );
        onFormCancel();
        fetchCostItems();
      })
      .catch((err) => {
        notify(
          `Oops! Failed to delete cost item ${formData.vendor_cost[0].item}.`,
          "error"
        );
      });
    } else {
    }
    
  };

  const handleEditCostItem = (data) => {
    setMode("EDIT");
    setShow(true);
    const _formData = cloneDeep(formData);
    _formData.vendor_cost[0] = data;
    setFormData(_formData);
  };

  const handleAddCostItem = () => {
    setMode("ADD");
    setShow(true);
  };

  const handleClose = () => setShowCostItems(false);

  const onAddCostItem = () => {
    if (mode === "ADD") onCostItemSave();
    else onCostItemEdit();
  };

  const onCostItemSave = () => {
    saveCostItem(formData, vendor.id)
      .then((res) => {
        notify(
          `${formData.vendor_cost[0].item} cost item has been added successfully.`,
          "success"
        );
        onFormCancel();
        fetchCostItems();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add new cost item ${formData.vendor_cost[0].item}.`,
          "error"
        )
      );
  };

  const onCostItemEdit = () => {
    editCostItem(formData, vendor.id)
      .then((res) => {
        notify(
          `${formData.vendor_cost[0].item} cost item has been edited successfully.`,
          "success"
        );
        onFormCancel();
        fetchCostItems();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to edit cost item ${formData.vendor_cost[0].item}.`,
          "error"
        )
      );
  };

  return (
    <>
      <FormModal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onAddCostItem}
        mode={mode}
      />
      <Modal
        show={showCostItems}
        title="Cost items"
        autoClose={true}
        onClose={handleClose}
        body={() => {
          return costItems.map((item, idx) => (
            <Card
              item={item}
              key={idx}
              onDelete={handleDeleteCostItem}
              onEdit={handleEditCostItem}
            />
          ));
        }}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCostItem}
                >
                  ADD COST ITEM
                </button>
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

export default ModalContainer;
