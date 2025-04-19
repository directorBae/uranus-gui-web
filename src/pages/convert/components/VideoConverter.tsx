import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../store/useAppContext";
import { mockConvertVideoToDronePath } from "../../../apis/mockUpApi";
import ListBox from "../../../components/common/ListBox";

// 스타일 컴포넌트 정의
const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ConvertButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#0080ff")};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#0059b3")};
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #0080ff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-right: 15px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #0080ff;
`;

const ResultItem = styled.div`
  display: flex;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultLabel = styled.div`
  font-weight: 600;
  width: 120px;
  color: #555;
`;

const ResultValue = styled.div`
  flex: 1;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff0f0;
  border-radius: 8px;
  border-left: 4px solid #ff3b30;
  color: #d63031;
`;

interface ConversionResult {
  ratio: string;
  dirname: string;
  filename_list: string[];
  fps: number;
  total_frame: number;
}

const VideoConverter: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasVideoFiles = state.file.videoFiles.length > 0;
  const { screenSettings } = state.drone;

  const handleConvert = async () => {
    if (!hasVideoFiles) return;

    const videoFile = state.file.videoFiles[0];
    setIsConverting(true);
    setError(null);

    try {
      // 드론 화면 설정에서 계산된 너비와 높이를 사용
      const width = Math.round(screenSettings.calculatedWidth);
      const height = Math.round(screenSettings.calculatedHeight);

      // mockUpApi의 변환 함수 호출
      const result = await mockConvertVideoToDronePath({
        fileURL: videoFile.name,
        mode: "video",
        ratio: `${width}:${height}`,
        drone_pixel: state.drone.pixelSize,
        multiplier: state.drone.screenSettings.multiplier || 1,
      });

      setConversionResult(result.meta);
      dispatch({
        type: "SET_CONVERTED_FILES",
        payload: { fileList: result.meta.filename_list },
      });
    } catch (err) {
      console.error("변환 중 오류 발생:", err);
      setError("파일 변환 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Container>
      <Title>비디오 변환</Title>
      <Card>
        <p>
          업로드한 비디오 파일을 드론 표시용 데이터로 변환합니다. 변환 시 지정된
          너비와 높이 설정이 적용됩니다.
        </p>

        {!hasVideoFiles && (
          <p style={{ color: "#ff6b6b", marginTop: "10px" }}>
            변환할 비디오 파일을 먼저 업로드해 주세요.
          </p>
        )}

        {isConverting ? (
          <LoadingIndicator>
            <div className="spinner"></div>
            <p>변환 중입니다... 잠시만 기다려 주세요.</p>
          </LoadingIndicator>
        ) : (
          <ButtonContainer>
            <ConvertButton disabled={!hasVideoFiles} onClick={handleConvert}>
              {hasVideoFiles ? "변환 시작" : "파일을 업로드하세요"}
            </ConvertButton>
          </ButtonContainer>
        )}

        {error && (
          <ErrorMessage>
            <p>{error}</p>
          </ErrorMessage>
        )}

        {conversionResult && (
          <ResultContainer>
            <h3>변환 결과</h3>
            <ResultItem>
              <ResultLabel>화면비:</ResultLabel>
              <ResultValue>{conversionResult.ratio}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>출력 폴더:</ResultLabel>
              <ResultValue>{conversionResult.dirname}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>파일 수:</ResultLabel>
              <ResultValue>{conversionResult.total_frame} 프레임</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>FPS:</ResultLabel>
              <ResultValue>{conversionResult.fps}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>생성 파일:</ResultLabel>
              <ListBox
                title="생성된 파일 목록"
                items={state.convertedFiles.fileList}
                onItemClick={() => {}}
              />
            </ResultItem>
          </ResultContainer>
        )}
      </Card>
    </Container>
  );
};

export default VideoConverter;
