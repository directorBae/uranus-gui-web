import apiClient from "../apiClient";

export interface ConvertTextRequestType {
  text: string;
  mode: string;
  ratio: string;
  drone_pixel: number;
  multiplier: number;
}

export interface ConvertTextResponseType {
  meta: {
    ratio: string;
    dirname: string;
    filename_list: string[];
    fps: number;
    total_frame: number;
  };
}

export interface ConvertVideoRequestType {
  fileURL: string;
  mode: string;
  ratio: string;
  drone_pixel: number;
  multiplier: number;
}

export interface ConvertVideoResponseType {
  meta: {
    ratio: string;
    dirname: string;
    filename_list: string[];
    fps: number;
    total_frame: number;
  };
}

/**
 * 텍스트를 드론 경로로 변환하는 API 호출 함수
 * @param requestData 변환 요청 데이터
 * @returns 변환 결과 응답 데이터
 */
export const convertTextToDronePath = async (
  requestData: ConvertTextRequestType
): Promise<ConvertTextResponseType> => {
  try {
    const response = await apiClient.post<ConvertTextResponseType>(
      "/convert/text",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("드론 경로 변환 API 호출 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 비디오를 드론 경로로 변환하는 API 호출 함수
 * @param requestData 변환 요청 데이터
 * @returns 변환 결과 응답 데이터
 */
export const convertVideoToDronePath = async (
  requestData: ConvertVideoRequestType
): Promise<ConvertVideoResponseType> => {
  try {
    const response = await apiClient.post<ConvertVideoResponseType>(
      "/convert/video",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("드론 경로 변환 API 호출 중 오류 발생:", error);
    throw error;
  }
};
