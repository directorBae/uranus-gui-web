import React, { useState, useContext } from "react";
import styled from "styled-components";
import ListBox from "../../components/common/ListBox";
import { AppContext } from "../../store/AppContext";
import { RowBox } from "../../components/ui/FlexBox";
import RawVideoPlayer from "./component/RawVideoPlayer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  padding: 2rem 4rem;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
  flex: 1;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? "#4a90e2" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background-color: ${(props) => (props.active ? "#4a90e2" : "#e0e0e0")};
  }
`;

export default function Play() {
  const { state } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"converted" | "original">(
    "converted"
  );
  // 선택된 원본 비디오 인덱스
  const [selectedOriginalVideoIndex, setSelectedOriginalVideoIndex] =
    useState<number>(0);

  const playableFiles = state.convertedFiles.fileList;
  const originalVideoFiles = state.file.videoFiles.map((file) => file.name);

  const handleConvertedFileClick = (file: string) => {
    setSelectedFile(file);
    setActiveTab("converted");
    console.log(`선택된 변환 파일: ${file}`);
  };

  const handleOriginalFileClick = (fileName: string) => {
    // 파일 이름으로 인덱스 찾기
    const index = state.file.videoFiles.findIndex(
      (file) => file.name === fileName
    );
    if (index !== -1) {
      setSelectedOriginalVideoIndex(index);
      setActiveTab("original");
      console.log(`선택된 원본 파일 인덱스: ${index}`);
    }
  };

  return (
    <Container>
      <h1>재생</h1>
      <RowBox>
        <div>
          <TabContainer>
            <Tab
              active={activeTab === "converted"}
              onClick={() => setActiveTab("converted")}
            >
              변환된 파일
            </Tab>
            <Tab
              active={activeTab === "original"}
              onClick={() => setActiveTab("original")}
            >
              원본 파일
            </Tab>
          </TabContainer>

          {activeTab === "converted" ? (
            <ListBox
              title="변환된 파일 목록"
              items={playableFiles}
              onItemClick={handleConvertedFileClick}
              clickedItem={selectedFile || undefined}
            />
          ) : (
            <ListBox
              title="원본 파일 목록"
              items={originalVideoFiles}
              onItemClick={handleOriginalFileClick}
              clickedItem={
                originalVideoFiles[selectedOriginalVideoIndex] || undefined
              }
            />
          )}
        </div>

        <PlayerContainer>
          {activeTab === "original" ? (
            <RawVideoPlayer videoIndex={selectedOriginalVideoIndex} />
          ) : selectedFile ? (
            <>
              <h2>{selectedFile} 재생 중</h2>
              <div
                style={{
                  width: "100%",
                  height: "360px",
                  backgroundColor: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                {/* 여기에 변환된 비디오 파일을 위한 플레이어 구현 */}
                변환된 파일 {selectedFile} 재생 화면
              </div>
            </>
          ) : (
            <p>왼쪽 목록에서 재생할 파일을 선택하세요</p>
          )}
        </PlayerContainer>
      </RowBox>
    </Container>
  );
}
