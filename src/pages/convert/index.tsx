import React from "react";
import UploadFiles from "./components/UploadFiles";

export default function Convert() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "1400px",
        flexDirection: "column",
        boxSizing: "border-box",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "2rem 4rem",
      }}
    >
      <h1>파일 변환</h1>
      <UploadFiles />
    </div>
  );
}
