import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import {
  getVendorDetails,
  saveCostItem,
  editCostItem,
  deleteCostItem,
  getCostItem,
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
        setCostItems(res.costitems);
      })
      .catch((err) => {
        notify("Oops! Failed to fetch cost item list.", "error");
      });
  };

  const initialState = {
    cost_addon: [
      {
        addon_pricing: [
          {
            unit_start: "1",
            unit_end: "0",
            price: "0",
          }
        ],
        cost_model: "volume",
      },
    ],
    item: "",
    commercial_unit: "",
    currency: "USD",
    setup_fee: "",
    recurring_fee: "",
    frequency: "",
    vendor: vendor.id,
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const handleDeleteCostItem = (item) => {
    const r = window.confirm(
      `Do you wish to remove '${item.item}' cost item?`
    );
    if (r === true) {
      deleteCostItem(item.id)
        .then((res) => {
          notify(
            `${formData.item} cost item has been deleted successfully.`,
            "success"
          );
          onFormCancel();
          fetchCostItems();
        })
        .catch((err) => {
          notify(
            `Oops! Failed to delete cost item ${formData.item}.`,
            "error"
          );
        });
    } else {
    }
  };

  const handleEditCostItem = (data) => {
    setMode("EDIT");
    setShow(true);
    getCostItem(data.id)
    .then((res) => {
      setFormData(cloneDeep(res))
    })
    .catch((err) => {
      notify("Oops! Failed to fetch cost item.", "error");
    });
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
    saveCostItem(formData)
      .then((res) => {
        notify(
          `cost item has been added successfully.`,
          "success"
        );
        onFormCancel();
        fetchCostItems();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add new cost item.`,
          "error"
        )
      );
  };

  const onCostItemEdit = () => {
    editCostItem(formData)
      .then((res) => {
        notify(
          `${formData.item} cost item has been edited successfully.`,
          "success"
        );
        onFormCancel();
        fetchCostItems();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to edit cost item ${formData.item}.`,
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
