import React, { useState } from "react";
import Modal from "../../Modal";
import Form from "./form";

function ModalContainer({
  mode,
  show,
  formData,
  onChange,
  onSubmit,
  onCancel,
  categories,
  subCategories,
}) {
  return (
    <>
      <Modal
        show={show}
        title="Pricing"
        body={() => (
          <Form
            formData={formData}
            onChange={onChange}
            categories={categories}
            subCategoryList={subCategories}
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

export default ModalContainer;
