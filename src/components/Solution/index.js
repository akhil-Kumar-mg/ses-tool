import React, { useState } from "react";
import Modal from "../Modal";
import Form from "./form";
import PreviewCostItem from "../CostItem/Preview";
import { cloneDeep } from "lodash";
import { getCostItem } from "../../containers/Configuration/Vendors/service";
import useNotify from "../../actions/Toast";

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
  const [costItem, setCostItem] = useState(null);
  const { notify } = useNotify();

  const onPreviewCancel = () => {
    setShowCostItem(false)
  }

  const onPreview = () => {
    getCostItem(formData.cost_item)
      .then((res) => {
        setCostItem(cloneDeep(res));
        setShowCostItem(true);
      })
      .catch((err) => {
        notify("Oops! Failed to fetch cost item.", "error");
      });
  };
  return (
    <>
      <PreviewCostItem show={showCostItem} formData={costItem} onCancel={onPreviewCancel}/>
      <Modal
        show={show}
        title={mode === "ADD" ? "New solution item" : "Edit solution item"}
        body={() => (
          <Form
            formData={formData}
            onChange={onChange}
            categories={categories}
            subCategoryList={subCategories}
            vendors={vendors}
            costItemLIst={costItems}
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
                  SAVE
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
