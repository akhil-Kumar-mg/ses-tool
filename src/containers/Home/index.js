import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import "./style.scss";

function Home() {
  const history = useHistory();

  useEffect(()=>{
    setTimeout(()=>{
      document.getElementById("splash-overlay").style.display ="none";
    }, 3000)
  },[])
  return (
    <>
      <div className="welcome">
        <span id="splash-overlay" className="splash"></span>
        <span id="welcome" className="z-depth-4"></span>

        <div className="valign-wrapper">
          <span className="container grey-text text-lighten-1 ">
            <p className="flow-text">Welcome to</p>
            <h1 className="title grey-text text-lighten-3">
              SES OVP Master tool
            </h1>
{/* 
            <blockquote className="flow-text">
              A project management portal
            </blockquote> */}

            <div className="center-align">
              <button type="button" className="btn btn-danger" onClick={()=>{history.push(`/App/Configuration`);}}> Configuration</button>
              <button type="button" className="btn btn-success" onClick={()=>{history.push(`/App/Projects`);}}> Projects</button>
            </div>
          </span>
        </div>

       

        
      </div>
    </>
  );
}

export default Home;
