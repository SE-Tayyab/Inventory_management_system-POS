import React from "react";
import { Spin } from "antd";

const Spinner = () => (
  <div
    style={{
      position: "absolute",
      height: "full",
      width: "full",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    }}
  >
    <Spin />
  </div>
);

export default Spinner;
