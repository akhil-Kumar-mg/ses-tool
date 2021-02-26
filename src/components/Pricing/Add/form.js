import React, { useState } from "react";

function Form() {
  return (
    <>
      <form>
        <div className="form-group">
          <label>Setup fee</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                USD
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Recurring fee</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                USD
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pay frequency</label>
          <select className="form-control">
            <option>Placeholder text</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div className="form-group">
          <label>Add on</label>
          <div className="panel-group">
            <div className="form-group">
              <label>Cost Model</label>
              <select className="form-control">
                <option>Placeholder text</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="form-group">
              <label>Define pricing</label>
              <div className="row">
                <div className="col">
                  <label>Unit 1 to</label>
                </div>
                <div className="col">
                  <label>Price per unit</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1000"
                  />
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        USD
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Unit 1001 to</label>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2000"
                  />
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        USD
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Unit 2001 to</label>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="type here"
                  />
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        USD
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Pay frequency</label>
              <select className="form-control">
                <option>Placeholder text</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
