import React, { useState } from "react";
import SubForm from './subform';
import cloneDeep from 'lodash/cloneDeep';
const randomstring = require("randomstring");

function Form({formData, onChange}) {



  const onAdd = (data) =>{
    data.uuid = randomstring.generate();
    const _formData = cloneDeep(formData)
    _formData.sub_categories.push(data)
    onChange({ ..._formData });
  }
  const onDelete = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.sub_categories = _formData.sub_categories.filter(item=> item.uuid !== data.uuid);
    onChange({ ..._formData });
  }

  const onFormChange = (value) => {
    const _formData = cloneDeep(formData)
    _formData.name = value;
    onChange({ ..._formData });
  };

  return (

    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            placeholder="Category name"
            value={formData.name}
            onChange={(e) =>
              onFormChange(e.target.value)
            }
          />
        </div>

        {formData.sub_categories.map((item) => {
          return <SubForm key={item.uuid} subCategory={item} onSubmit={onDelete} actionTitle="Delete"/>
        })}

      <SubForm onSubmit={onAdd} actionTitle="Add another"/>
      </form>
    </>
  );
}

export default Form;
