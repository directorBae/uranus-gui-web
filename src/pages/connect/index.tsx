import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../../store/AppContext";
import DeviceLists from "../../components/common/DeviceLists";
import { mockGetPiList, mockConnectToPi } from "../../apis/mockUpApi";

const ConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ConnectHeader = styled.div`
  margin-bottom: 2rem;
`;

const ConnectBox = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StatusMessage = styled.div<{ isError?: boolean }>`
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => (props.isError ? "#ffebee" : "#e8f5e9")};
  color: ${(props) => (props.isError ? "#d32f2f" : "#2e7d32")};
  text-align: center;
  font-size: 0.9rem;
  display: ${(props) => (props.children ? "block" : "none")};
`;

interface DeviceStatus {
  connected: boolean;
  error?: boolean;
}

export default function Connect() {
  const { state, dispatch } = useContext(AppContext);
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceStatus, setDeviceStatus] = useState<Record<string, DeviceStatus>>({});

  // 기기 목록 가져오기
  const handleScanDevices = async () => {
    try {
      setIsLoading(true);
      setStatus("기기를 검색 중입니다...");
      setIsError(false);
      
      const response = await mockGetPiList();
      
      if (response && response.pi_list) {
        setDevices(response.pi_list);
        
        // 기존 상태를 유지하면서 새로운 기기 추가
        const newDeviceStatus = { ...deviceStatus };
        
        // 새로 스캔된 기기들에 대한 상태 초기화 (이미 있는 기기는 그대로 유지)
        response.pi_list.forEach(device => {
          if (!newDeviceStatus[device]) {
            newDeviceStatus[device] = { 
              connected: false
            };
          }
        });

        // 이미 연결된 기기 상태 확인
        if (state.drone.selectedDrone) {
          newDeviceStatus[state.drone.selectedDrone] = {
            connected: true
          };
        }
        
        setDeviceStatus(newDeviceStatus);
        setStatus(`${response.pi_list.length}개의 기기를 발견했습니다.`);
      } else {
        setDevices([]);
        setStatus("사용 가능한 기기가 없습니다.");
      }
    } catch (error) {
      console.error("기기 검색 중 오류 발생:", error);
      setIsError(true);
      setStatus("기기 검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 기기 선택
  const handleDeviceClick = (device: string) => {
    setSelectedDevice(device);
  };

  // 기기 연결
  const handleConnectDevice = async () => {
    if (!selectedDevice) {
      setIsError(true);
      setStatus("연결할 기기를 선택해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus(`${selectedDevice}에 연결 중입니다...`);
      setIsError(false);
      
      const response = await mockConnectToPi(selectedDevice);
      
      if (response && response.success) {
        // 연결 성공 상태 업데이트
        setDeviceStatus(prev => ({
          ...prev,
          [selectedDevice]: {
            connected: true,
            error: false
          }
        }));
        
        setStatus(response.message);
        
        // AppContext에 선택한 기기 IP 저장
        dispatch({
          type: "SELECT_DRONE",
          payload: {
            droneIp: selectedDevice
          }
        });
        
        // 만약 해당 기기가 목록에 없다면 추가
        if (!state.drone.droneList.includes(selectedDevice)) {
          dispatch({
            type: "ADD_DRONE",
            payload: {
              droneIp: selectedDevice
            }
          });
        }
      } else {
        // 연결 실패 상태 업데이트
        setDeviceStatus(prev => ({
          ...prev,
          [selectedDevice]: {
            connected: false,
            error: true
          }
        }));
        
        setIsError(true);
        setStatus("기기 연결에 실패했습니다.");
      }
    } catch (error) {
      console.error("기기 연결 중 오류 발생:", error);
      
      // 연결 오류 상태 업데이트
      setDeviceStatus(prev => ({
        ...prev,
        [selectedDevice]: {
          connected: false,
          error: true
        }
      }));
      
      setIsError(true);
      setStatus("기기 연결 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 기기 목록 가져오기 및 연결된 기기 상태 확인
  useEffect(() => {
    handleScanDevices();
    
    // AppContext에서 이미 선택된 드론이 있는지 확인
    if (state.drone.selectedDrone) {
      setDeviceStatus(prev => ({
        ...prev,
        "state.drone.selectedDrone": {
          connected: true
        }
      }));
    }
  }, []);

  return (
    <ConnectContainer>
      <ConnectHeader>
        <h1>디바이스 연결</h1>
        <p>네트워크에서 감지된 디바이스를 검색하고 연결하세요.</p>
      </ConnectHeader>
      
      <ConnectBox>
        <DeviceLists 
          devices={devices} 
          onDeviceClick={handleDeviceClick} 
          clickedDevice={selectedDevice || undefined}
          onScan={handleScanDevices}
          onConnect={handleConnectDevice}
          isLoading={isLoading}
          deviceStatus={deviceStatus}
        />
        
        <StatusMessage isError={isError}>
          {status}
        </StatusMessage>
      </ConnectBox>
    </ConnectContainer>
  );
}
