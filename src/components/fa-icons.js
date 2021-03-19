import React from "react";


const FaIcons = ({icon,color, onClick}) => {
  
  return (
    <i className={`fas fa-${icon} ${color||'default'}-color`} onClick={onClick}/>
  );
}

FaIcons.defaultProps = {
  onClick: () => {},
};

export default FaIcons;