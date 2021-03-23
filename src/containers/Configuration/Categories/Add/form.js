import React, { useState } from "react";
import SubForm from './subform';
import cloneDeep from 'lodash/cloneDeep';
const randomstring = require("randomstring");

function Form({formData, onChange}) {

  const initialState = {
    name: "",
    commercial_unit: "",
  };
  const [subFormData, setSubFormData] = useState({...initialState});

  const onAdd = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.sub_categories.push(data)
    onChange({ ..._formData });
    setSubFormData({...initialState})
  }
  const onDelete = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.sub_categories = _formData.sub_categories.filter(item=> item.id !== data.id);
    onChange({ ..._formData });
  }

  const onFormChange = (value, key) => {
    const _formData = cloneDeep(formData)
    _formData[key] = value;
    onChange({ ..._formData });
  };

  const onSubFormChange = (data) =>{
    setSubFormData(data)
  }

  const onSubFormEdit = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.sub_categories.forEach(item=> {
      if(item.id === data.id){
        item = {...data}
      }
    });
    onChange({ ..._formData });
  }

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
              onFormChange(e.target.value, "name")
            }
          />
        </div>

        {formData.sub_categories.map((item) => {
          return <SubForm key={item.id} formData={item} onChange={onSubFormEdit} onSubmit={onDelete} actionTitle="Delete"/>
        })}

      <SubForm formData={subFormData} onSubmit={onAdd} onChange={onSubFormChange} actionTitle="Add another"/>
      </form>
    </>
  );
}

export default Form;
