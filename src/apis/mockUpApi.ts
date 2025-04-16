import {
  ConvertTextRequestType,
  ConvertTextResponseType,
  ConvertVideoRequestType,
  ConvertVideoResponseType,
} from "./functions/convertApi";
import {
  PiListResponseType,
  RgbRequestType,
  RgbResponseType,
} from "./functions/connectApi";
import {
  FileListResponseType,
  FileUploadResponseType,
  FileDeleteResponseType,
} from "./functions/filesApi";
import {
  PlaySetJobRequestType,
  PlaySetJobResponseType,
} from "./functions/playApi";

// 목업 데이터 정의

// Convert API Mock 데이터
const mockConvertTextResponse: ConvertTextResponseType = {
  meta: {
    ratio: "16:9",
    dirname: "output_text_20250417",
    filename_list: [
      "frame_0001.png",
      "frame_0002.png",
      "frame_0003.png",
      "frame_0004.png",
      "frame_0005.png",
    ],
    fps: 30,
    total_frame: 5,
  },
};

const mockConvertVideoResponse: ConvertVideoResponseType = {
  meta: {
    ratio: "16:9",
    dirname: "output_video_20250417",
    filename_list: [
      "frame_0001.png",
      "frame_0002.png",
      "frame_0003.png",
      "frame_0004.png",
      "frame_0005.png",
      "frame_0006.png",
      "frame_0007.png",
      "frame_0008.png",
      "frame_0009.png",
      "frame_0010.png",
    ],
    fps: 24,
    total_frame: 10,
  },
};

// Connect API Mock 데이터
const mockPiListResponse: PiListResponseType = {
  pi_list: ["pi-drone-01", "pi-drone-02", "pi-drone-03"],
};

const mockRgbResponse: RgbResponseType = {
  status: 200,
};

const mockPiConnectionStatus = {
  connected: true,
  status: "connected",
};

const mockConnectResponse = {
  success: true,
  message: "성공적으로 연결되었습니다.",
};

const mockDisconnectResponse = {
  success: true,
  message: "성공적으로 연결 해제되었습니다.",
};

// Files API Mock 데이터
const mockFileListResponse: FileListResponseType = {
  "files list": [
    "animation1.mp4",
    "animation2.mp4",
    "text1.txt",
    "image1.png",
    "demo.mp4",
  ],
};

const mockFileUploadResponse: FileUploadResponseType = {
  message: "파일이 성공적으로 업로드되었습니다.",
  file_type: "video/mp4",
  file_size: "10.5MB",
};

const mockFileDeleteResponse: FileDeleteResponseType = {
  message: "파일이 성공적으로 삭제되었습니다.",
};

// Play API Mock 데이터
const mockPlaySetJobResponse: PlaySetJobResponseType = {
  message: "재생 작업이 성공적으로 설정되었습니다.",
};

// Mock API 함수 구현

/**
 * 텍스트를 드론 경로로 변환하는 Mock API 함수
 * @param requestData 변환 요청 데이터
 * @returns 목업 변환 결과 응답 데이터
 */
export const mockConvertTextToDronePath = async (
  requestData: ConvertTextRequestType
): Promise<ConvertTextResponseType> => {
  console.log("목업 API 호출: convertTextToDronePath", requestData);
  // 지연 시간 추가 (실제 API 호출처럼 보이게)
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return mockConvertTextResponse;
};

/**
 * 비디오를 드론 경로로 변환하는 Mock API 함수
 * @param requestData 변환 요청 데이터
 * @returns 목업 변환 결과 응답 데이터
 */
export const mockConvertVideoToDronePath = async (
  requestData: ConvertVideoRequestType
): Promise<ConvertVideoResponseType> => {
  console.log("목업 API 호출: convertVideoToDronePath", requestData);
  // 지연 시간 추가 (실제 API 호출처럼 보이게)
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return mockConvertVideoResponse;
};

/**
 * 사용 가능한 Pi 목록을 가져오는 Mock API 함수
 * @returns 목업 Pi 기기 목록 배열
 */
export const mockGetPiList = async (): Promise<PiListResponseType> => {
  console.log("목업 API 호출: getPiList");
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockPiListResponse;
};

/**
 * 특정 Pi 기기 연결 상태 확인 Mock API 함수
 * @param piId Pi 기기 ID
 * @returns 목업 연결 상태 정보
 */
export const mockCheckPiConnectionStatus = async (
  piId: string
): Promise<{ connected: boolean; status: string }> => {
  console.log("목업 API 호출: checkPiConnectionStatus", piId);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockPiConnectionStatus;
};

/**
 * Pi 기기 연결 요청 Mock API 함수
 * @param piId Pi 기기 ID
 * @returns 목업 연결 결과
 */
export const mockConnectToPi = async (
  piId: string
): Promise<{ success: boolean; message: string }> => {
  console.log("목업 API 호출: connectToPi", piId);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return mockConnectResponse;
};

/**
 * Pi 기기 연결 해제 Mock API 함수
 * @param piId Pi 기기 ID
 * @returns 목업 연결 해제 결과
 */
export const mockDisconnectFromPi = async (
  piId: string
): Promise<{ success: boolean; message: string }> => {
  console.log("목업 API 호출: disconnectFromPi", piId);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockDisconnectResponse;
};

/**
 * RGB 값 설정 Mock API 함수
 * @param rgbData RGB 데이터 (r, g, b 값)
 * @returns 목업 설정 상태
 */
export const mockSetRgb = async (
  rgbData: RgbRequestType
): Promise<RgbResponseType> => {
  console.log("목업 API 호출: setRgb", rgbData);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRgbResponse;
};

/**
 * 파일 업로드 Mock API 함수
 * @param file 업로드할 파일 데이터
 * @returns 목업 업로드 결과 정보
 */
export const mockUploadFile = async (
  file: File
): Promise<FileUploadResponseType> => {
  console.log("목업 API 호출: uploadFile", file.name, file.size, file.type);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    ...mockFileUploadResponse,
    file_type: file.type,
    file_size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
  };
};

/**
 * 파일 삭제 Mock API 함수
 * @param filename 삭제할 파일 이름
 * @returns 목업 삭제 결과
 */
export const mockDeleteFile = async (
  filename: string
): Promise<FileDeleteResponseType> => {
  console.log("목업 API 호출: deleteFile", filename);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockFileDeleteResponse;
};

/**
 * 파일 목록 조회 Mock API 함수
 * @returns 목업 파일 목록 배열
 */
export const mockGetFilesList = async (): Promise<FileListResponseType> => {
  console.log("목업 API 호출: getFilesList");
  await new Promise((resolve) => setTimeout(resolve, 700));
  return mockFileListResponse;
};

/**
 * 드론 영상 재생 job 설정 Mock API 함수
 * @param jobData 재생 job 정보 (파일명, 시간 목록 및 반복 횟수)
 * @returns 목업 설정 결과 메시지
 */
export const mockSetPlayJob = async (
  jobData: PlaySetJobRequestType
): Promise<PlaySetJobResponseType> => {
  console.log("목업 API 호출: setPlayJob", jobData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockPlaySetJobResponse;
};
