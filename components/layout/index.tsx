import React from "react";
import {Layout} from "antd";
import MainHeader from "@/components/layout/mainHeader";

const {Content, Footer} = Layout;

const SiteLayout = ({children}: any) => {
  return (
    <Layout className="layout">
      <MainHeader />
      <Content style={{padding: "0 50px"}}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{textAlign: "center"}}>©2022 Created by WonTae</Footer>
    </Layout>
  );
};

export default SiteLayout;
