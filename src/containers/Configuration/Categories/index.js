import React, { useState } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Modal from "../../../components/Modal";
import Card from "./card";
import Form from "./form";
function Catergories() {
  const items = [...Array(15).keys()];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        title=""
        body={() => <Form />}
        actions={() => {
          return (
            <div className="row">
              <div className="col-sm-6">
                <button
                  type="button"
                  className="btn btn-secondary cancel"
                  onClick={handleClose}
                >
                  CANCEL
                </button>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-primary">
                  ADD
                </button>
              </div>
            </div>
          );
        }}
      />
      <div className="header">
        <h1>Catergories</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD CATEGORY <FaIcons icon="plus" />
        </button>
      </div>

      <div className="sub-container categories">
        <div className="row">
          {items.map((item) => (
            <Card key={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catergories;
