import React,{useState} from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { Link } from "react-router-dom";
import FaIcons from '../../components/fa-icons';

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();
  const [active, SetActive] = useState('');
  return (
    <ProSidebar
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >

        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem className={active=== 'Configuration' ? 'active': ''} onClick={()=>{SetActive('Configuration')}} icon={<FaIcons icon="wrench" />}> 
          <Link to={`/App/Configuration`} className="link">{intl.formatMessage({ id: 'configuration' })} </Link>
          
          </MenuItem>
          <MenuItem className={active=== 'Projects' ? 'active': ''} onClick={()=>{SetActive('Projects')}} icon={<FaIcons icon="suitcase"  />}> 
          <Link to={`/App/Projects`} className="link">{intl.formatMessage({ id: 'projects' })} </Link>
          
          </MenuItem>
        </Menu>
        
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 20px',
          }}
        >
          <a
            href="/#/"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaIcons icon="user"  />

          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;