import React from "react";


const FaIcons = ({icon,color, onClick, style = {}}) => {
  
  return (
    <i className={`fas fa-${icon} ${color||'default'}-color`} style={style} onClick={onClick}/>
  );
}

FaIcons.defaultProps = {
  onClick: () => {},
};

export default FaIcons;