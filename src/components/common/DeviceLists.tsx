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
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 10px 0;
`;

const DeviceItem = styled.div<{ selected: boolean }>`
  font-size: 0.9rem;
  padding: 0.7rem;
  background-color: ${(props) => (props.selected ? "#bbdefb" : "#e0e0e0")};
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  border: ${(props) => (props.selected ? "2px solid #1976d2" : "none")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: ${(props) => (props.selected ? "#bbdefb" : "#d5d5d5")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-top: 15px;
`;

const EmptyListMessage = styled.div`
  font-size: 0.9rem;
  color: #757575;
  text-align: center;
  padding: 20px;
  width: 100%;
`;

const StatusIndicator = styled.span<{ status: 'connected' | 'disconnected' | 'error' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-left: 8px;
  font-weight: bold;
  
  ${props => {
    switch (props.status) {
      case 'connected':
        return `
          background-color: #4caf50;
          color: white;
        `;
      case 'disconnected':
        return `
          background-color: #f44336;
          color: white;
        `;
      case 'error':
        return `
          background-color: #ff9800;
          color: white;
        `;
      default:
        return '';
    }
  }}
`;

interface DeviceStatus {
  connected: boolean;
  error?: boolean;
}

interface DeviceListProps {
  devices: string[];
  onDeviceClick: (device: string) => void;
  clickedDevice?: string;
  onScan?: () => void;
  onConnect?: () => void;
  isLoading?: boolean;
  deviceStatus?: Record<string, DeviceStatus>;
}

const DeviceLists = ({
  devices,
  onDeviceClick,
  clickedDevice,
  onScan,
  onConnect,
  isLoading = false,
  deviceStatus = {},
}: DeviceListProps) => {
  const getStatusIcon = (device: string) => {
    const status = deviceStatus[device];
    
    if (!status) {
      return <StatusIndicator status="disconnected">X</StatusIndicator>;
    }
    
    if (status.error) {
      return <StatusIndicator status="error">!</StatusIndicator>;
    }
    
    if (status.connected) {
      return <StatusIndicator status="connected">✓</StatusIndicator>;
    }
    
    return <StatusIndicator status="disconnected">X</StatusIndicator>;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        width: "100%",
      }}
    >
      <h3>사용 가능한 디바이스</h3>
      <DeviceListsContainer>
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <DeviceItem 
              key={index} 
              onClick={() => onDeviceClick(device)}
              selected={device === clickedDevice}
            >
              <span>{device}</span>
              {getStatusIcon(device)}
            </DeviceItem>
          ))
        ) : (
          <EmptyListMessage>
            {isLoading ? "디바이스 검색 중..." : "사용 가능한 디바이스가 없습니다"}
          </EmptyListMessage>
        )}
      </DeviceListsContainer>
      
      <ButtonContainer>
        <FlatButton onClick={onScan} disabled={isLoading}>
          {isLoading ? "검색 중..." : "검색"}
        </FlatButton>
        <FlatButton 
          onClick={onConnect} 
          disabled={isLoading || !clickedDevice}
        >
          기기 연결
        </FlatButton>
      </ButtonContainer>
    </div>
  );
};

export default DeviceLists;
