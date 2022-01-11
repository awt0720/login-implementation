import React from "react";
import {Layout, Menu, Breadcrumb} from "antd";

const {Header, Content, Footer} = Layout;

const SiteLayout = ({children}: any) => {
  const login = false;
  return (
    <Layout className="layout">
      <Header>
        <div className="left">
          <nav>
            <ol>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ol>
          </nav>
        </div>
        <div className="right">
          {login ? (
            <div className="logout-btn">로그아웃</div>
          ) : (
            <div className="login-btn">로그인</div>
          )}
        </div>
      </Header>
      <Content style={{padding: "0 50px"}}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{textAlign: "center"}}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default SiteLayout;
