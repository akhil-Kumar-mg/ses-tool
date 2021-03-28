import React, { useContext } from "react";
import { Context as AppContext } from "../../../../context/AppContext";

function SubForm({ formData, onSubmit, actionTitle, onChange }) {

  const appContext = useContext(AppContext);
  const { units } = appContext.state;
  // const units = [
  //   ["channel1", "Channel 1"],
  //   ["channel2", "Channel 2"],
  //   ["channel3", "Channel 3"],
  // ]
  const onFormChange = (key, value) => {
    if(key === "units"){
     
      value = [...value.options]
                    .filter(option => option.selected)
                    .map(option => option.value);
                    formData['commercial_unit'] = value.join(",")             
    }
    formData[key] = value;
    onChange({ ...formData });
  };

  const onFormSubmit = () =>{
    onSubmit({...formData})
  }

  return (
    <>
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
        <select
          multiple
          className="form-select form-control"
           value={formData.units}
          onChange={(e) => onFormChange("units", e.target)}
        >
          <option value="-1">Select</option>
          {units && units.length && 
            units.map(item=>{
                return  <option key={item[0]} value={item[0]}>{item[1]}</option>
            })
          }
         
        </select>
      </div>
      <div className="center">
        <a onClick={onFormSubmit} href="javascript:void();">
          {actionTitle}
        </a>
      </div>
    </>
  );
}

export default SubForm;
