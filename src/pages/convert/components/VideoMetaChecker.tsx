import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../store/useAppContext";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Container = styled.div`
  margin-top: 2rem;
  width: 40rem;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const MetaInfo = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const MetaItem = styled.div`
  display: flex;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const MetaLabel = styled.div`
  flex: 0 0 120px;
  font-weight: 600;
  color: #555;
`;

const MetaValue = styled.div`
  flex: 1;
  color: #333;
`;

const NoFilesMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #888;
  font-style: italic;
  background: #f9f9f9;
  border-radius: 8px;
`;

const WarningMessage = styled.div`
  margin-top: 10px;
  color: #e67e22;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #e74c3c;
  font-size: 0.9rem;
`;

const VideoMetaChecker: React.FC = () => {
  const { state } = useAppContext();
  const [videoMetaData, setVideoMetaData] = useState<{
    duration: number | null;
    frameRate: number | null;
    width: number | null;
    height: number | null;
    aspectRatio: string | null;
    frameCount: number | null;
    isLoading: boolean;
    error: string | null;
  }>({
    duration: null,
    frameRate: null,
    width: null,
    height: null,
    aspectRatio: null,
    frameCount: null,
    isLoading: false,
    error: null,
  });

  const files = state.file.videoFiles;
  const currentFile = files.length > 0 ? files[0] : null;

  // 비디오 메타데이터를 추출하는 함수
  useEffect(() => {
    if (!currentFile) {
      setVideoMetaData({
        duration: null,
        frameRate: null,
        width: null,
        height: null,
        aspectRatio: null,
        frameCount: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    setVideoMetaData((prev) => ({ ...prev, isLoading: true, error: null }));

    // 비디오 객체를 생성하여 메타데이터 추출
    const videoElement = document.createElement("video");
    const objectUrl = URL.createObjectURL(currentFile);

    videoElement.onloadedmetadata = () => {
      // 비디오 메타데이터 로드 완료시
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;

      // 가장 간단한 비율로 화면비 계산
      const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
      const divisor = gcd(width, height);
      const aspectRatio = `${width / divisor}:${height / divisor}`;

      // 비디오 duration 가져오기 (초 단위)
      videoElement.onloadeddata = () => {
        const duration = videoElement.duration;

        // VideoDecoder API가 지원되면 사용, 아니면 추정값 사용
        // 대부분의 브라우저에서는 정확한 frameRate를 얻기 어려움
        let frameRate = 30; // 기본 추정값
        let frameCount = Math.round(duration * frameRate);

        try {
          // 미디어 세그먼트 내의 메타데이터에서 정확한 프레임 레이트를 구할 수 있다면 좋지만,
          // 웹에서 쉽게 접근할 수 없으므로 표준 프레임 레이트를 기반으로 한 추정치 사용
          if (duration > 1) {
            if (duration < 5) {
              // 짧은 클립일 경우 표준 값 사용
              frameRate = 30;
            } else if (duration >= 60) {
              // 영화/긴 비디오일 가능성이 높음
              frameRate = 24;
            } else {
              // 중간 길이는 TV 콘텐츠일 가능성 (표준 30fps)
              frameRate = 30;
            }
          }
          frameCount = Math.round(duration * frameRate);
        } catch (err) {
          console.error("프레임 레이트 계산 중 오류 발생:", err);
        }

        setVideoMetaData({
          duration,
          frameRate,
          width,
          height,
          aspectRatio,
          frameCount,
          isLoading: false,
          error: null,
        });

        // 객체 URL 해제
        URL.revokeObjectURL(objectUrl);
      };
    };

    videoElement.onerror = () => {
      setVideoMetaData((prev) => ({
        ...prev,
        isLoading: false,
        error: "비디오 메타데이터를 로드하는 중 오류가 발생했습니다.",
      }));
      URL.revokeObjectURL(objectUrl);
    };

    videoElement.src = objectUrl;
  }, [currentFile]);

  // 화면비가 특이한 경우 경고 표시
  const isUnusualAspectRatio = () => {
    if (!videoMetaData.aspectRatio) return false;

    const commonRatios = [
      "16:9",
      "4:3",
      "21:9",
      "1:1",
      "2:1",
      "3:2",
      "5:4",
      "9:16",
      "3:4",
      "9:21",
      "1:2",
      "2:3",
      "4:5",
    ];
    return !commonRatios.includes(videoMetaData.aspectRatio);
  };

  // 프레임 수가 너무 많은 경우 경고 표시 (성능 영향 가능성)
  const hasTooManyFrames = () => {
    if (!videoMetaData.frameCount) return false;
    return videoMetaData.frameCount > 10000; // 약 5~7분 분량의 30fps 비디오
  };

  // 해상도가 너무 높은 경우 경고 표시
  const hasHighResolution = () => {
    if (!videoMetaData.width || !videoMetaData.height) return false;
    return videoMetaData.width * videoMetaData.height > 2073600; // Full HD (1920x1080) 이상
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs > 0 ? `${hrs}시간 ` : ""}${
      mins > 0 ? `${mins}분 ` : ""
    }${secs}초`;
  };

  if (!currentFile) {
    return (
      <Container>
        <Title>비디오 정보</Title>
        <NoFilesMessage>
          비디오 파일을 업로드하면 여기에 정보가 표시됩니다.
        </NoFilesMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>비디오 정보</Title>

      {videoMetaData.isLoading ? (
        <MetaInfo>비디오 메타데이터를 분석 중입니다...</MetaInfo>
      ) : videoMetaData.error ? (
        <ErrorMessage>{videoMetaData.error}</ErrorMessage>
      ) : (
        <MetaInfo>
          <MetaItem>
            <MetaLabel>파일명</MetaLabel>
            <MetaValue>{currentFile.name}</MetaValue>
          </MetaItem>

          <MetaItem>
            <MetaLabel>파일크기</MetaLabel>
            <MetaValue>
              {`${(currentFile.size / (1024 * 1024)).toFixed(2)} MB`}
            </MetaValue>
          </MetaItem>

          {videoMetaData.duration && (
            <MetaItem>
              <MetaLabel>재생시간</MetaLabel>
              <MetaValue>{formatDuration(videoMetaData.duration)}</MetaValue>
            </MetaItem>
          )}

          {videoMetaData.width && videoMetaData.height && (
            <MetaItem>
              <MetaLabel>해상도</MetaLabel>
              <MetaValue>
                {`${videoMetaData.width} x ${videoMetaData.height}`}
                {hasHighResolution() && (
                  <WarningMessage>
                    고해상도 비디오는 변환 및 렌더링에 더 많은 시간이 소요될 수
                    있습니다.
                  </WarningMessage>
                )}
              </MetaValue>
            </MetaItem>
          )}

          {videoMetaData.aspectRatio && (
            <MetaItem>
              <MetaLabel>화면비</MetaLabel>
              <MetaValue>
                {videoMetaData.aspectRatio}
                {isUnusualAspectRatio() && (
                  <WarningMessage>
                    일반적이지 않은 화면비입니다. 출력 장치에 따라 왜곡이 발생할
                    수 있습니다.
                  </WarningMessage>
                )}
              </MetaValue>
            </MetaItem>
          )}

          {videoMetaData.frameRate && (
            <MetaItem>
              <MetaLabel>프레임레이트</MetaLabel>
              <MetaValue>{`약 ${videoMetaData.frameRate} fps (추정값)`}</MetaValue>
            </MetaItem>
          )}

          {videoMetaData.frameCount && (
            <MetaItem>
              <MetaLabel>총 프레임 수</MetaLabel>
              <MetaValue>
                {`약 ${videoMetaData.frameCount.toLocaleString()} 프레임 (추정값)`}
                {hasTooManyFrames() && (
                  <WarningMessage>
                    프레임 수가 많아 변환 및 렌더링에 시간이 많이 소요될 수
                    있습니다.
                  </WarningMessage>
                )}
              </MetaValue>
            </MetaItem>
          )}
        </MetaInfo>
      )}
    </Container>
  );
};

export default VideoMetaChecker;
