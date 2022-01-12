import React from "react";
import {Header} from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";
import {useRouter} from "next/router";

const MainHeader = () => {
  const router = useRouter();
  const login = false;

  const onClickMenu = (e) => {
    if (e.key === "1") router.push("/");
  };
  return (
    <Header>
      <div className="left">
        <Menu theme="dark" mode="horizontal" onClick={onClickMenu}>
          <Menu.Item key="1">홈</Menu.Item>
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
