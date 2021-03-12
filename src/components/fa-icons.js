import React from "react";


const FaIcons = ({icon,color}) => {
  
  return (
    <i className={`fas fa-${icon} ${color||'default'}-color`} />
  );
}

export default FaIcons;