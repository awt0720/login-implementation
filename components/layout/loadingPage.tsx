import React from "react";

import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;

const LoadingPage = () => {
  return (
    <div className="spin-wrapper">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingPage;
