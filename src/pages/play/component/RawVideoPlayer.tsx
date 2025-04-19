import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../../store/useAppContext";
import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 8px;
  background-color: #000;
`;

const VideoControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #357ac3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-top: 1rem;
`;

interface RawVideoPlayerProps {
  videoIndex?: number; // 재생할 비디오 인덱스 (없으면 첫 번째 비디오)
  autoPlay?: boolean; // 자동 재생 여부
}

const RawVideoPlayer = ({
  videoIndex = 0,
  autoPlay = false,
}: RawVideoPlayerProps) => {
  const { state } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentVideoName, setCurrentVideoName] = useState<string>("");

  // 선택된 비디오 파일 가져오기
  const selectedVideoFile = state.file.videoFiles[videoIndex] || null;

  useEffect(() => {
    // 비디오 파일이 있을 경우에만 URL 생성
    if (selectedVideoFile) {
      const url = URL.createObjectURL(selectedVideoFile);
      setVideoUrl(url);
      setCurrentVideoName(selectedVideoFile.name);

      // 컴포넌트 언마운트 시 URL 해제
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setVideoUrl(null);
      setCurrentVideoName("");
    }
  }, [selectedVideoFile]);

  // 비디오 메타데이터 로드 시 실행
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // 비디오 시간 업데이트
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 처음부터 다시 재생
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // 시간 포맷 함수
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <VideoContainer>
      {videoUrl ? (
        <>
          <StyledVideo
            ref={videoRef}
            src={videoUrl}
            autoPlay={autoPlay}
            controls
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <VideoControls>
            <ControlButton onClick={togglePlay}>
              {isPlaying ? "일시정지" : "재생"}
            </ControlButton>
            <ControlButton onClick={restartVideo}>처음부터</ControlButton>
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </VideoControls>
          <VideoInfo>
            <h3>재생 중인 원본 영상</h3>
            <p>파일명: {currentVideoName}</p>
            <p>
              파일 크기: {(selectedVideoFile?.size / (1024 * 1024)).toFixed(2)}{" "}
              MB
            </p>
            {selectedVideoFile?.type && (
              <p>파일 타입: {selectedVideoFile.type}</p>
            )}
          </VideoInfo>
        </>
      ) : (
        <div>
          <p>재생할 원본 영상이 없습니다. 영상 파일을 업로드해주세요.</p>
        </div>
      )}
    </VideoContainer>
  );
};

export default RawVideoPlayer;
