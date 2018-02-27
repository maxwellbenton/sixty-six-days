import React from "react";

const LoadingComponent = props => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        background: "#333",
        color: "white"
      }}
    >
      ...Loading
    </div>
  );
};

export default LoadingComponent;
