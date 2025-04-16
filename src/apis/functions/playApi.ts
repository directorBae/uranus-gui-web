import apiClient from "../apiClient";

// API 요청 타입 정의
export interface PlaySetJobRequestType {
  job_info: {
    filename: string;
    time: Date;
  }[];
  repeat: number;
}

// API 응답 타입 정의
export interface PlaySetJobResponseType {
  message: string;
}

/**
 * 드론 영상 재생 job 설정 API 호출 함수
 * @param jobData 재생 job 정보 (파일명, 시간 목록 및 반복 횟수)
 * @returns 설정 결과 메시지
 */
export const setPlayJob = async (
  jobData: PlaySetJobRequestType
): Promise<PlaySetJobResponseType> => {
  try {
    const response = await apiClient.post<PlaySetJobResponseType>(
      "/play/set",
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("드론 영상 재생 job 설정 중 오류 발생:", error);
    throw error;
  }
};
