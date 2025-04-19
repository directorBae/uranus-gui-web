import React from "react";
import styled from "styled-components";
import FlatButton from "./FlatButton";

const DeviceListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;
`;

const DeviceItem = styled.div`
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

interface DeviceListProps {
  devices: string[];
  onDeviceClick: (device: string) => void;
  clickedDevice?: string;
}

const DeviceLists = ({
  devices,
  onDeviceClick,
  clickedDevice,
}: DeviceListProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        width: "100%",
        height: "100%",
      }}
    >
      <DeviceListsContainer>
        {devices.map((device, index) => (
          <DeviceItem key={index} onClick={() => onDeviceClick(device)} />
        ))}
      </DeviceListsContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          boxSizing: "border-box",
          padding: "1rem",
          width: "100%",
          height: "100%",
        }}
      >
        <FlatButton onClick={() => {}}>검색</FlatButton>
        <FlatButton onClick={() => {}}>기기 연결</FlatButton>
      </div>
    </div>
  );
};

export default DeviceLists;
