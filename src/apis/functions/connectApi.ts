import apiClient from "../apiClient";

// API 응답 타입 정의
export interface PiListResponseType {
  pi_list: string[];
}

// RGB 요청 및 응답 타입 정의
export interface RgbRequestType {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
}

export interface RgbResponseType {
  status: number;
}

/**
 * 사용 가능한 Pi 목록을 가져오는 API 호출 함수
 * @returns Pi 기기 목록 배열
 */
export const getPiList = async (): Promise<PiListResponseType> => {
  try {
    const response = await apiClient.get<PiListResponseType>(
      "/connect/pi/status"
    );
    return response.data;
  } catch (error) {
    console.error("Pi 목록 조회 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 특정 Pi 기기 연결 상태 확인 API 호출 함수
 * @param piId Pi 기기 ID
 * @returns 연결 상태 정보
 */
export const checkPiConnectionStatus = async (
  piId: string
): Promise<{ connected: boolean; status: string }> => {
  try {
    const response = await apiClient.get<{
      connected: boolean;
      status: string;
    }>(`/connect/pi/status/${piId}`);
    return response.data;
  } catch (error) {
    console.error("Pi 연결 상태 확인 중 오류 발생:", error);
    throw error;
  }
};

/**
 * Pi 기기 연결 요청 API 호출 함수
 * @param piId Pi 기기 ID
 * @returns 연결 결과
 */
export const connectToPi = async (
  piId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>(`/api/connect/${piId}`);
    return response.data;
  } catch (error) {
    console.error("Pi 연결 요청 중 오류 발생:", error);
    throw error;
  }
};

/**
 * Pi 기기 연결 해제 API 호출 함수
 * @param piId Pi 기기 ID
 * @returns 연결 해제 결과
 */
export const disconnectFromPi = async (
  piId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/api/connect/${piId}`);
    return response.data;
  } catch (error) {
    console.error("Pi 연결 해제 중 오류 발생:", error);
    throw error;
  }
};

/**
 * RGB 값 설정 API 호출 함수
 * @param rgbData RGB 데이터 (r, g, b 값)
 * @returns 설정 상태
 */
export const setRgb = async (
  rgbData: RgbRequestType
): Promise<RgbResponseType> => {
  try {
    const response = await apiClient.post<RgbResponseType>(
      "/connect/set_rgb",
      rgbData
    );
    return response.data;
  } catch (error) {
    console.error("RGB 값 설정 중 오류 발생:", error);
    throw error;
  }
};
