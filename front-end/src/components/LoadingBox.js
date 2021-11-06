import React from "react";

export default function LoadingBox({ variant }) {
  return (
    <div className="row center" style={{ height: "100%" }}>
      <div className={`loader loader-${variant}`}></div>
    </div>
  );
}
