import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../../store/AppContext";
import { useNavigate } from "react-router-dom";
import FlatButton from "../../components/common/FlatButton";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const UploadHeader = styled.div`
  margin-bottom: 2rem;
`;

const UploadBox = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ConnectedDevice = styled.div`
  background-color: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid #1976d2;
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeviceName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;

const DeviceStatus = styled.div`
  color: #4caf50;
  display: flex;
  align-items: center;
  
  &::before {
    content: '●';
    margin-right: 5px;
  }
`;

const NoDeviceMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  color: #757575;
`;

const UploadButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function Upload() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [connectedDevice, setConnectedDevice] = useState<string[] | null>(null);

  // 연결된 디바이스 확인
  useEffect(() => {
    if (state.drone.droneList) {
      setConnectedDevice(state.drone.droneList);
    } else {
      setConnectedDevice(null);
    }
  }, [state.drone.droneList]);

  // 연결 페이지로 이동
  const goToConnectPage = () => {
    navigate('/connect');
  };

  return (
    <UploadContainer>
      <UploadHeader>
        <h1>파일 업로드</h1>
        <p>연결된 디바이스에 파일을 업로드하세요.</p>
      </UploadHeader>

      <UploadBox>
        <h2>연결된 디바이스</h2>
        
        {connectedDevice ? (
          connectedDevice.map((device, index) => (

          <ConnectedDevice>
            <DeviceInfo>
              <DeviceName>{device}</DeviceName>
              <DeviceStatus>연결됨</DeviceStatus>
            </DeviceInfo>
            <FlatButton>선택</FlatButton>
          </ConnectedDevice>
          ))
        ) : (
          <NoDeviceMessage>
            <p>연결된 디바이스가 없습니다.</p>
            <p>파일 업로드를 위해 먼저 디바이스를 연결해주세요.</p>
            <FlatButton onClick={goToConnectPage}>기기 연결하러 가기</FlatButton>
          </NoDeviceMessage>
        )}

        {connectedDevice && (
          <>
            <h2>파일 업로드</h2>
            <p>업로드할 파일을 선택하세요.</p>
            <UploadButtons>
              <FlatButton>파일 선택</FlatButton>
              <FlatButton variant="secondary">취소</FlatButton>
            </UploadButtons>
          </>
        )}
      </UploadBox>
    </UploadContainer>
  );
}
