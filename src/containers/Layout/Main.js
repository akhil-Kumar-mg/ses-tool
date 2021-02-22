import React from "react";
import { useIntl } from "react-intl";
import Switch from "react-switch";
// import { FaHeart, FaBars } from 'react-icons/fa';
import FaIcons from "../../components/fa-icons";

import logo from '../../assets/img/ses-logo.png';

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaIcons icon="user" />
      </div>

      <div className="main-container">
        <div className="left-container">
          <h1>Configuration</h1>
          <div className="configuration-items">
            <ul className="item-list">
              <li className="item item-animate">Category</li>
              <li className="item item-animate active">Vendors</li>
              <li className="item item-animate">Master Solution</li>
              <li className="item item-animate">Master Pricing</li>
            </ul>
          </div>
          <div className="logo">
              <img src={logo} alt="ses master tool" />
          </div>
        </div>
        <div className="right-container">
          <div className="header">
          <h1>Vendors</h1>
          <button type="button" className="btn btn-primary">
              ADD VENDOR <FaIcons icon="plus" />
          </button>
          </div>
          
          <hr />
        </div>
      </div>

      <footer>
        <small>© 2021 SES Master Tool</small>
        <br />
      </footer>
    </main>
  );
};

export default Main;
