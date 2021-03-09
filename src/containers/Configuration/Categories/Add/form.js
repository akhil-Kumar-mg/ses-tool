import React, { useState } from "react";

function Form() {

  const subcategory = {
    name: "",
    commercial_unit: ""
  }
  const category = {
    name: "",
    sub_categories: []
  }
  const [formData, setFormData] = useState({
    name: "",
    sub_categories: [{
      name: "",
      commercial_unit: ""
    }]
  });

  const [items, setItems] = useState([]);
  const onAdd = () =>{
    console.log(formData)
    const _items = [...items];
    _items.push(items.length + 1);
    setItems(_items);
  }
  const onDelete = () =>{
    const _items = [...items];
    _items.pop();
    setItems(_items);
  }

  const onNameChange = (value) => {
    formData.name = value;
    setFormData({ ...formData });
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
              onNameChange(e.target.value)
            }
          />
        </div>

        {items.map((item) => {
          return (
            <>
              <div className="form-group">
                <label>Sub-category name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Placeholder text"
                />
              </div>

              <div className="form-group">
                <label>Applicable commercial units</label>
                <select className="form-control">
                  <option>Placeholder text</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="center">
                <a href="javascript:void(0)" className="delete" onClick={onDelete}>Delete</a>
              </div>
              <div className="hr-dashed"></div>
            </>
          );
        })}

        <div className="form-group">
          <label>Sub-category name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Placeholder text"
          />
        </div>

        <div className="form-group">
          <label>Applicable commercial units</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="center">
          <a href="javascript:void(0)" onClick={onAdd}>Add another</a>
        </div>
      </form>
    </>
  );
}

export default Form;
