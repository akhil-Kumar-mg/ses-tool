
import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import logo from '../../assets/img/ses-logo.png';


function Sidebar({title,sublink, links = []}) {
const [active, SetActive] = useState(-1)

useEffect(()=>{
  if(links && links.length>0){
    SetActive(links[0])
  }
}, [])

  return (
    <>
    <div className="left-container">
          <h1><Link to={`/App/${title}`} className="link">{title}</Link></h1>
          <div className="configuration-items">
            <ul className="item-list">
                {
                    links.map(item=>{
                        return <li key={item} className={`item item-animate ${active === item ? 'active': ''}`} onClick={()=>{SetActive(item)}}><Link to={`/App/${title}${sublink||''}/${item.replace(/ /g,"")}`} className="link">{item}</Link></li>
                    })
                }
            </ul>
          </div>
          <div className="logo">
              <img src={logo} alt="ses ovp master tool" />
          </div>
        </div>
    </>
  );
}

export default Sidebar;
