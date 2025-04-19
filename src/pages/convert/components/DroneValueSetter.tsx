import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../store/useAppContext";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SettingsContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  font-weight: 600;
  margin-right: 12px;
  flex: 0 0 100px;
`;

const AspectRatio = styled.span`
  margin-right: 10px;
  font-weight: 500;
`;

const MultiplierContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Multiply = styled.span`
  margin: 0 10px;
`;

const Input = styled.input`
  width: 80px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;

  &:focus {
    border-color: #0080ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.2);
  }

  /* 화살표 버튼 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox에서 화살표 제거 */
  -moz-appearance: textfield;
`;

const Result = styled.div`
  font-weight: 500;
  margin-left: 20px;
  color: #333;
  background-color: #f0f0f0;
  padding: 8px 15px;
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
`;

const DroneValueSetter: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [multiplier, setMultiplier] = useState<string>("1");

  // 비디오 파일에서 화면비 가져오기
  useEffect(() => {
    // 비디오 파일이 있으면 VideoMetaChecker에서 계산된 화면비를 가져옴
    const videoFile = state.file.videoFiles[0];
    if (videoFile) {
      // Video 요소를 생성하여 비디오 메타데이터 추출
      const video = document.createElement("video");
      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        const width = video.videoWidth;
        const height = video.videoHeight;

        // 가장 간단한 비율로 화면비 계산
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
        const divisor = gcd(width, height);

        const aspectRatioWidth = width / divisor;
        const aspectRatioHeight = height / divisor;

        // 화면비를 상태에 설정
        dispatch({
          type: "SET_ASPECT_RATIO",
          payload: {
            width: aspectRatioWidth,
            height: aspectRatioHeight,
          },
        });

        // URL 객체 해제
        URL.revokeObjectURL(video.src);
      };

      video.onerror = () => {
        // 비디오 로드 실패 시 기본값 설정
        dispatch({
          type: "SET_ASPECT_RATIO",
          payload: {
            width: 0,
            height: 0,
          },
        });
        URL.revokeObjectURL(video.src);
      };
    }
  }, [state.file.videoFiles, dispatch]);

  // 곱셈 계수 변경 핸들러
  const handleMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력 가능하도록 함
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMultiplier(value);

      // 전역 상태 업데이트
      if (value !== "") {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          dispatch({
            type: "SET_MULTIPLIER",
            payload: { value: numValue },
          });
        }
      } else {
        dispatch({
          type: "SET_MULTIPLIER",
          payload: { value: 0 },
        });
      }
    }
  };

  const handleDroneTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    dispatch({
      type: "SET_DRONE_TYPE",
      payload: {
        droneType: selectedType,
        pixelSize:
          selectedType === "UR-16"
            ? 4
            : selectedType === "UR-25"
            ? 5
            : selectedType === "UR-36"
            ? 6
            : selectedType === "UR-A"
            ? 1
            : 0,
      }, // 픽셀 크기 설정
    });
  };

  const { width, height } = state.drone.screenSettings.aspectRatio;
  const { calculatedWidth, calculatedHeight } = state.drone.screenSettings;

  return (
    <Container>
      <Title>드론 화면 설정</Title>
      <SettingsContainer>
        <InputRow>
          <Label>너비:</Label>
          <AspectRatio>{width}</AspectRatio>
          <MultiplierContainer>
            <Multiply>×</Multiply>
            <Input
              type="number"
              value={multiplier}
              onChange={handleMultiplierChange}
              placeholder="1"
              min="0"
              step="any"
            />
          </MultiplierContainer>
          <Result>{Math.round(calculatedWidth)}</Result>
        </InputRow>
        <InputRow>
          <Label>높이:</Label>
          <AspectRatio>{height}</AspectRatio>
          <MultiplierContainer>
            <Multiply>×</Multiply>
            <Input
              type="number"
              value={multiplier}
              onChange={handleMultiplierChange}
              placeholder="1"
              min="0"
              step="any"
            />
          </MultiplierContainer>
          <Result>{Math.round(calculatedHeight)}</Result>
        </InputRow>
        <InputRow>
          <Label>드론 종류:</Label>
          <select
            style={{
              width: "8rem",
            }}
            onChange={handleDroneTypeChange}
          >
            <option value="UR-16">UR-16</option>
            <option value="UR-25">UR-25</option>
            <option value="UR-36" disabled>
              UR-36
            </option>
            <option value="UR-A" disabled>
              UR-A
            </option>
          </select>
        </InputRow>
      </SettingsContainer>
    </Container>
  );
};

export default DroneValueSetter;
