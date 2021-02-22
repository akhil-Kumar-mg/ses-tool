import React from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';


import FaIcons from '../../components/fa-icons';

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();
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
          <MenuItem
          className="active"
            icon={<FaIcons icon="wrench" />}
            suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}
          >
            {intl.formatMessage({ id: 'configuration' })}
          </MenuItem>
          <MenuItem icon={<FaIcons icon="suitcase"  />}> {intl.formatMessage({ id: 'settings' })}</MenuItem>
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