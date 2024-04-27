import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../../img/develcode_logo.png';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ padding: 0, width: '100%', marginBottom: 30, }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="2" >
          <img
            src={logo}
            alt="Logo"
            style={{ height: '42px', padding: 0, marginTop: 10, marginLeft:30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </Menu.Item>
        
      </Menu>
    </Header>
  );
};

export default Navbar;
