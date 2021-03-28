import React, { useState } from "react";
import FaIcons from "../../../../components/fa-icons";

function SubForm({ formId, formData, onSubmit, actionTitle, onChange }) {

  const [showMultiOptions, setShowMultiOptions] = useState(false)

  const onFormChange = (key, value) => {
    if(key === "units"){
     const _units = [...formData[key]];
     _units[value.id].selected = !_units[value.id].selected;
     formData["commercial_unit"] = _units.filter(item=>item.selected).map(item=> item.name).join(",");
     value = _units;
                
    }
    formData[key] = value;
    onChange({ ...formData });
  };

  const onFormSubmit = () =>{
    onSubmit({...formData})
  }

  return (
    <div onClick={()=>{setShowMultiOptions(false)}}>
      <div className="form-group">
        <label>Sub-category name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Placeholder text"
          value={formData.name}
          onChange={(e) => onFormChange("name", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Applicable commercial units</label>
        <div className="ses-multi-select">
          <div className="form-control label" onClick={(e)=>{e.stopPropagation(); setShowMultiOptions(!showMultiOptions);}}>
            <label>{formData.commercial_unit} </label><FaIcons icon="sort-down" />
          </div>
          { showMultiOptions && <div className="form-control options">
            {
              formData.units && formData.units.map((item, idx) => {
                return <div key={idx} className="form-check">
                    <input type="checkbox" onClick={(e=> e.stopPropagation())} onChange={(e)=>{ e.stopPropagation(); onFormChange("units",item)}} className="form-check-input" checked={item.selected} id={`chk-unit-${item.name}-${formId}`} />
                    <label className="form-check-label"  onClick={(e=> e.stopPropagation())}  htmlFor={`chk-unit-${item.name}-${formId}`} >{item.name}</label>
                </div>
              })
            }
          </div>}
        </div>
      </div>
      <div className="center">
        <a onClick={onFormSubmit} href="javascript:void();">
          {actionTitle}
        </a>
      </div>
    </div>
  );
}

export default SubForm;
