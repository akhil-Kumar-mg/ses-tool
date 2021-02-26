import React, { useState } from "react";

function Form() {

  const [items, setItems] = useState([]);
  const onAdd = () =>{
    const _items = [...items];
    _items.push(items.length + 1);
    setItems(_items);
  }
  const onDelete = () =>{
    const _items = [...items];
    _items.pop();
    setItems(_items);
  }
  return (

    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            placeholder="Category name"
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
