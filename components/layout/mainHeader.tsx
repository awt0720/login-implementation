import React from "react";
import {Header} from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";

const MainHeader = () => {
  const login = false;
  return (
    <Header>
      <div className="left">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">메뉴 1</Menu.Item>
          <Menu.Item key="2">메뉴 2</Menu.Item>
          <Menu.Item key="3">메뉴 3</Menu.Item>
        </Menu>
      </div>
      <div className="right">
        {login ? (
          <div className="logout-btn">로그아웃</div>
        ) : (
          <div className="login-btn">로그인</div>
        )}
      </div>
    </Header>
  );
};

export default MainHeader;
