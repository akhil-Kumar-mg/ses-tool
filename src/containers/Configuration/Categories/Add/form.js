import React, { useState, useContext } from "react";
import SubForm from './subform';
import cloneDeep from 'lodash/cloneDeep';
import { Context as AppContext } from "../../../../context/AppContext";
const randomstring = require("randomstring");

function Form({formData, onChange}) {
  const appContext = useContext(AppContext);
  const { commercial_unit } = appContext.state;
// const commercial_unit = ["Channel1", "Channel2","Channel3"]

  const initialState = {
    name: "",
    commercial_unit: "",
    units: commercial_unit ? commercial_unit.map((item, idx)=>  {return {id: idx, name: item, selected: false}}): []
  };
  const [subFormData, setSubFormData] = useState({...initialState});

  const onAdd = (data) =>{
    data.uuid = randomstring.generate();
    const _formData = cloneDeep(formData)
    _formData.sub_categories.push(data)
    onChange({ ..._formData });
    setSubFormData({...initialState})
  }
  const onDelete = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.sub_categories = _formData.sub_categories.filter(item=> item.id !== data.id || item.uuid !== data.uuid);
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
      if(data.id && item.id === data.id){
        item = {...data}
      } else if(!data.id && data.uuid && item.uuid === data.uuid){
        item = {...data}
      }
    });
    onChange({ ..._formData });
  }

  const onFormSubmit = () =>{
    onAdd({...subFormData})
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

        {formData.sub_categories.map((item, idx) => {
          return <SubForm key={idx} formData={item} formId={idx} onChange={onSubFormEdit} onSubmit={onDelete} actionTitle="Delete"/>
        })}

      {/* <SubForm formId={-1} formData={subFormData} onSubmit={onAdd} onChange={onSubFormChange} actionTitle="Add another"/> */}
      <div className="center">
        <a onClick={onFormSubmit} href="javascript:void();">
        Add another
        </a>
      </div>
      </form>
    </>
  );
}

export default Form;
