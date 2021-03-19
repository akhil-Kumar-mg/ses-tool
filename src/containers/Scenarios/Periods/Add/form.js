import React, { useState } from "react";
import SubForm from './subform';
import cloneDeep from 'lodash/cloneDeep';
const randomstring = require("randomstring");

function Form({formData, onChange}) {

  const initialState = {
    start: "",
    end: "",
  };
  const [subFormData, setSubFormData] = useState({...initialState});

  const onAdd = (data) =>{
    data.id = randomstring.generate();
    const _formData = cloneDeep(formData)
    _formData.periods.push(data)
    onChange({ ..._formData });
    setSubFormData({...initialState})
  }
  const onDelete = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.periods = _formData.periods.filter(item=> item.id !== data.id);
    onChange({ ..._formData });
  }

  const onFormChange = (value) => {
    const _formData = cloneDeep(formData)
    _formData.name = value;
    onChange({ ..._formData });
  };

  const onSubFormChange = (data) =>{
    setSubFormData(data)
  }

  const onSubFormEdit = (data) =>{
    const _formData = cloneDeep(formData)
    _formData.periods.forEach(item=> {
      if(item.id === data.id){
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

        {formData.periods.map((item) => {
          return <SubForm key={item.id} formData={item} onChange={onSubFormEdit} onSubmit={onDelete} actionTitle="Delete"/>
        })}

    
      <div className="center">
        <a onClick={onFormSubmit} href="javascript:void();">
        Add Period
        </a>
      </div>
      </form>
    </>
  );
}

export default Form;
