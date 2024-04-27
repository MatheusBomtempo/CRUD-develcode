import React from 'react';
import { Layout } from 'antd';
import Navbar from '../Navbar/Navbar';
import './Container.css';

const { Content } = Layout;

const Container = ({ children }) => {
    return (
        <Layout className="container-layout">
            <Navbar />
            <Content className="container-content">
                {children}
            </Content>
        </Layout>
    );
};

export default Container;
