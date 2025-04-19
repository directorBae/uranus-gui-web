import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useAppContext } from "../../../store/useAppContext";

// 커스텀 props 타입 정의
interface DropzoneProps {
  hasFiles?: boolean;
}

interface UploadPromptProps {
  hasFiles?: boolean;
}

// 스타일 컴포넌트 정의
const DropzoneContainer = styled.div<DropzoneProps>`
  width: 100%;
  min-height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.hasFiles ? "flex-start" : "center")};
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover,
  &.active {
    border-color: #0080ff;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-top: 20px;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;

  .file-name {
    font-weight: 500;
    margin-bottom: 5px;
  }

  .file-size {
    font-size: 12px;
    color: #999;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3b30;
  font-size: 14px;
  margin-top: 10px;
`;

const UploadPrompt = styled.div<UploadPromptProps>`
  text-align: center;
  margin-bottom: ${(props) => (props.hasFiles ? "20px" : "0")};
`;

// 파일 크기 포맷팅 함수
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

interface UploadFilesProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
}

const UploadFiles: React.FC<UploadFilesProps> = ({
  onFilesChange,
  accept = "video/*",
  maxFiles = 1,
  maxSize = 1024 * 1024 * 1024, // 1GB
}) => {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState<string | null>(null);

  // 로컬 상태와 전역 상태를 동기화
  const files = state.file.videoFiles;

  // 파일 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  // 파일 추가 함수
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      // 파일 개수 제한 검사
      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      // 파일 유형 및 크기 검사
      if (fileRejections.length > 0) {
        const rejectionError = fileRejections[0].errors[0];
        if (rejectionError.code === "file-too-large") {
          setError(
            `파일 크기가 너무 큽니다. 최대 ${formatFileSize(
              maxSize
            )}까지 가능합니다.`
          );
        } else if (rejectionError.code === "file-invalid-type") {
          setError("비디오 파일만 업로드할 수 있습니다.");
        } else {
          setError("파일 업로드 중 오류가 발생했습니다.");
        }
        return;
      }

      // 중복 파일 필터링
      const newFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );

      if (newFiles.length > 0) {
        // 전역 상태에 파일 추가
        dispatch({
          type: "ADD_VIDEO_FILES",
          payload: { files: newFiles },
        });
        setError(null);
      }
    },
    [files, maxFiles, maxSize, dispatch]
  );

  // 파일 제거 함수
  const removeFile = (index: number) => {
    // 전역 상태에서 파일 제거
    dispatch({
      type: "REMOVE_VIDEO_FILE",
      payload: { index },
    });
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxSize,
  });

  return (
    <div>
      <DropzoneContainer
        {...getRootProps()}
        className={isDragActive ? "active" : ""}
        hasFiles={files.length > 0}
      >
        <input {...getInputProps()} />

        <UploadPrompt hasFiles={files.length > 0}>
          {isDragActive ? (
            <p>파일을 여기에 놓으세요...</p>
          ) : (
            <>
              <p>영상 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요</p>
              <p style={{ fontSize: "12px", marginTop: "10px" }}>
                (최대 {maxFiles}개 파일, 각 {formatFileSize(maxSize)}까지)
              </p>
            </>
          )}
        </UploadPrompt>

        {files.length > 0 && (
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileInfo>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </FileInfo>
                <RemoveButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  삭제
                </RemoveButton>
              </FileItem>
            ))}
          </FileList>
        )}
      </DropzoneContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {files.length > 0 && (
        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <RemoveButton
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "CLEAR_VIDEO_FILES" });
            }}
          >
            모든 파일 제거
          </RemoveButton>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
