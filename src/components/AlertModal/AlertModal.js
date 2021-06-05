import React, { useContext } from "react";
import { Context as AppContext } from "../../context/AppContext";
import "./AlertModal.scss";

const AlertModal = ({ show, onhide }) => {
  const appContext = useContext(AppContext);
  const { hideCustomModal } = appContext;
  const { state, message, showModal } = appContext.state;

  return (
  <>
  <div className="alert-modal">
      <div
        className="row"
        style={{ display: showModal && state === "success" ? "block" : "none" }}
      >
        <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
          <div className="icon">
            <i className="fa fa-thumbs-up"></i>
          </div>

          <h1>Success!</h1>
          <p>
            {message}
          </p>
          <button
            type="button"
            className="redo btn"
            onClick={() => {
              hideCustomModal();
            }}
          >
            <i className="fa fa-check"></i>
          </button>
          {/* <span className="change">-- Click to see opposite state --</span> */}
        </div>
      </div>

      <div
        className="row"
        style={{ display: showModal && state === "error" ? "block" : "none" }}
      >
        <div className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate">
          <div className="icon">
            <i className="fa fa-thumbs-down"></i>
          </div>

          <h1>Oh no!</h1>
          <p>
            Oops! Something went wrong,
            <br /> you should try again.
          </p>
          <button
            type="button"
            className="redo btn"
            onClick={() => {
              hideCustomModal();
            }}
          >
            <i className="fa fa-times"></i>
          </button>
          {/* <span className="change">-- Click to see opposite state --</span> */}
        </div>
        </div>

        <div
        className="row"
        style={{ display: showModal && state === "warning" ? "block" : "none" }}
      >
        <div className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate">
          <div className="icon">
            <i className="fa fa-thumbs-down"></i>
          </div>

          <h1>Oops!</h1>
          <p>
            {message}
          </p>
          <button
            type="button"
            className="redo btn"
            onClick={() => {
              hideCustomModal();
            }}
          >
            Try again
          </button>
          {/* <span className="change">-- Click to see opposite state --</span> */}
        </div>
      </div>

    </div>
  
    {showModal && <div className="modal-backdrop alert-backdrop fade show"></div>}
  </>
  );
};

export default AlertModal;
