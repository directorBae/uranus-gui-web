import React from "react";
import UploadFiles from "./components/UploadFiles";
import VideoMetaChecker from "./components/VideoMetaChecker";
import DroneValueSetter from "./components/DroneValueSetter";
import VideoConverter from "./components/VideoConverter";
import { ColumnBox, RowBox } from "../../components/ui/FlexBox";

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
      <ColumnBox>
        <RowBox>
          <UploadFiles />
          <VideoMetaChecker />
        </RowBox>
        <DroneValueSetter />
        <VideoConverter />
      </ColumnBox>
    </div>
  );
}
