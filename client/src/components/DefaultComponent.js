import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import '../style/DefaultLayout.css'


import {
  ShoppingCartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  CopyOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    label,
    link,
  };
}

const items = [
  getItem('Home', '/', <HomeOutlined />, undefined, '/'),
  getItem('Inventory', '/inventory', <UnorderedListOutlined />, [
    getItem('Items', '/items', undefined, undefined, '/items'),
    getItem('AddItems', '/items2', undefined, undefined, '/items'),
    getItem('DeleteItems', '/items3', undefined, undefined, '/items'),
  ], ''),
  getItem('Bills', '/bills', <CopyOutlined />, undefined, '/bills'),
  getItem('Customers', '/customers', <UserOutlined />, undefined, '/customers'),
  getItem('Logout', '/logout', <LogoutOutlined />),
];

const renderMenuItem = (item) => {
  if (item.children) {
    return (
      <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
        {item.children.map((childItem) => renderMenuItem(childItem))}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    );
  }
};

const App = ({ children }) => {
  const { cartItems} = useSelector(state => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
          {items.map((item) => renderMenuItem(item))}   
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}

        >
        <div className='header-content'>
        <div
            className='header-cart-icon'
            onClick={() => navigate('/salesorders')}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              cursor: hover ? 'pointer' : 'default',
              color: hover ? '#007bff' : ''
            }}
          >
            <div className='icon'>
              <ShoppingCartOutlined />
            </div>
            <p style={{ color: hover ? '#007bff' : '' }}>{cartItems.length}</p>
          </div>
        </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
