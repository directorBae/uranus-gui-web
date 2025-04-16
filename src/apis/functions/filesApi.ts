import apiClient from "../apiClient";

// API 응답 타입 정의
export interface FileListResponseType {
  "files list": string[];
}

export interface FileUploadResponseType {
  message: string;
  file_type: string;
  file_size: string;
}

export interface FileDeleteResponseType {
  message: string;
}

/**
 * 파일 업로드 API 호출 함수
 * @param file 업로드할 파일 데이터
 * @returns 업로드 결과 정보
 */
export const uploadFile = async (
  file: File
): Promise<FileUploadResponseType> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<FileUploadResponseType>(
      "/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("파일 업로드 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 파일 삭제 API 호출 함수
 * @param filename 삭제할 파일 이름
 * @returns 삭제 결과
 */
export const deleteFile = async (
  filename: string
): Promise<FileDeleteResponseType> => {
  try {
    const response = await apiClient.post<FileDeleteResponseType>(
      "/files/delete",
      { filename }
    );
    return response.data;
  } catch (error) {
    console.error("파일 삭제 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 파일 목록 조회 API 호출 함수
 * @returns 파일 목록 배열
 */
export const getFilesList = async (): Promise<FileListResponseType> => {
  try {
    const response = await apiClient.get<FileListResponseType>("/files/list");
    return response.data;
  } catch (error) {
    console.error("파일 목록 조회 중 오류 발생:", error);
    throw error;
  }
};
