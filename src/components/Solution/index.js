import React, { useState } from "react";
import Modal from "../Modal";
import Form from "./form";
import CostItemModal from "../CostItem/Edit";

function ModalContainer({
  mode,
  show,
  formData,
  onChange,
  onSubmit,
  categories,
  subCategories,
  vendors,
  costItems,
  onCancel,
}) {

  const [showCostItem, setShowCostItem] = useState(false);

  const onPreview = () => {
    setShowCostItem(true)
  }
  return (
    <>
      <CostItemModal
        show={showCostItem}
        formData={vendors[0]}
        // formData={formData}
        // onChange= {on}
      />
      <Modal
        show={show}
        title={mode === "ADD" ? "New solution item": "Edit solution item"}
        body={() => (
          <Form
            formData={formData}
            onChange={onChange}
            categories={categories}
            subCategories = {subCategories}
            vendors={vendors}
            costItems = {costItems}
            onPreview={onPreview}
          />
        )}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-6">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={onCancel}
                >
                  CANCEL
                </button>
              </div>
              <div className="col-sm-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  {mode}
                </button>
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

ModalContainer.defaultProps = {
  onSubmit: () => {},
};

export default ModalContainer;
