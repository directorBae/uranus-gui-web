// 모든 API 함수들을 한 곳에서 내보내는 통합 파일

// connectApi에서 내보내는 함수들과 타입들
export {
  getPiList,
  checkPiConnectionStatus,
  connectToPi,
  disconnectFromPi,
  setRgb,
  // 타입 내보내기
  type PiListResponseType,
  type RgbRequestType,
  type RgbResponseType,
} from "./functions/connectApi";

// convertApi에서 내보내는 함수들과 타입들
export {
  convertTextToDronePath,
  convertVideoToDronePath,
  // 타입 내보내기
  type ConvertTextRequestType,
  type ConvertTextResponseType,
  type ConvertVideoRequestType,
  type ConvertVideoResponseType,
} from "./functions/convertApi";

// filesApi에서 내보내는 함수들과 타입들
export {
  uploadFile,
  deleteFile,
  getFilesList,
  // 타입 내보내기
  type FileListResponseType,
  type FileUploadResponseType,
  type FileDeleteResponseType,
} from "./functions/filesApi";

// playApi에서 내보내는 함수들과 타입들
export {
  setPlayJob,
  // 타입 내보내기
  type PlaySetJobRequestType,
  type PlaySetJobResponseType,
} from "./functions/playApi";
