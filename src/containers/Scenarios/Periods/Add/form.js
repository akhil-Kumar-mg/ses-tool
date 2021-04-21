import React, { useState } from "react";
import SubForm from "./subform";
import cloneDeep from "lodash/cloneDeep";
const randomstring = require("randomstring");

function Form({ formData, onChange, mode }) {
  const initialState = {
    start_month: "",
    end_month: "",
  };
  const [subFormData, setSubFormData] = useState({ ...initialState });

  const onAdd = (data) => {
    const _formData = cloneDeep(formData);
    _formData.periods.push(data);
    onChange({ ..._formData });
    setSubFormData({ ...initialState });
  };
  const onDelete = () => {
    const _formData = cloneDeep(formData);
    _formData.periods.pop();
    onChange({ ..._formData });
  };

  const onFormChange = (value) => {
    const _formData = cloneDeep(formData);
    _formData.name = value;
    onChange({ ..._formData });
  };

  const onSubFormChange = (data) => {
    setSubFormData(data);
  };

  const onSubFormEdit = (data) => {
    const _formData = cloneDeep(formData);
    _formData.periods.forEach((item) => {
      if (item.id === data.id) {
        item = { ...data };
      }
    });
    onChange({ ..._formData });
  };

  const onFormSubmit = () => {
    onAdd({ ...subFormData });
  };

  return (
    <>
      <form>
        {formData.periods.map((item) => {
          return (
            <SubForm
              key={item.id}
              formData={item}
              onChange={onSubFormEdit}
              onSubmit={onDelete}
              actionTitle="Delete"
            />
          );
        })}

        {mode == "ADD" && (
          <div className="row">
            <div className="col" style={{ textAlign: "left" }}>
              <a onClick={onFormSubmit} href="javascript:void();">
                Add Period
              </a>
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <a onClick={onDelete} href="javascript:void();">
                Delete
              </a>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default Form;
