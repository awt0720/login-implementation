import React from "react";

import {Skeleton} from "antd";

const LoadingSkeleton = () => {
  return (
    <div className="spin-wrapper">
      <Skeleton active paragraph={{rows: 24}} />;
    </div>
  );
};

export default LoadingSkeleton;
