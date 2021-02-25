
import React, { useState } from 'react'

import { Link } from "react-router-dom";
import logo from '../../assets/img/ses-logo.png';


function Sidebar({title, links = []}) {
const [active, SetActive] = useState(-1)

  return (
    <>
    <div className="left-container">
          <h1><Link to={`/App/${title}`} className="link">{title}</Link></h1>
          <div className="configuration-items">
            <ul className="item-list">
                {
                    links.map(item=>{
                        return <li className={`item item-animate ${active === item ? 'active': ''}`} onClick={()=>{SetActive(item)}}><Link to={`/App/${title}/${item.replace(" ","")}`} className="link">{item}</Link></li>
                    })
                }
            </ul>
          </div>
          <div className="logo">
              <img src={logo} alt="ses master tool" />
          </div>
        </div>
    </>
  );
}

export default Sidebar;
