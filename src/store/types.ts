// 앱의 상태 타입 정의
export interface AppState {
  // 파일 관련 상태
  file: {
    videoFiles: File[]; // 업로드된 비디오 파일들
  };
  // 드론 관련 상태
  drone: {
    droneList: string[]; // 드론의 IP 주소 리스트
    selectedDrone: string | null;
    droneType: string | null; // 드론의 종류 (예: UR-16, ... 등)
    pixelSize: number; // 드론의 픽셀 크기 (예: 4)
    screenSettings: {
      aspectRatio: {
        width: number; // 화면비 너비 (예: 16:9의 경우 16)
        height: number; // 화면비 높이 (예: 16:9의 경우 9)
      };
      multiplier: number; // 화면비에 곱해질 값
      calculatedWidth: number; // 최종 너비 값 (width * multiplier)
      calculatedHeight: number; // 최종 높이 값 (height * multiplier)
    };
  };
  convertedFiles: {
    fileList: string[]; // 변환된 파일 리스트
  };
}

// 액션 타입 정의
export type ActionType =
  | { type: "ADD_VIDEO_FILES"; payload: { files: File[] } } // 비디오 파일 추가
  | { type: "UPDATE_VIDEO_FILE"; payload: { index: number; file: File } } // 특정 비디오 파일 업데이트
  | { type: "REMOVE_VIDEO_FILE"; payload: { index: number } } // 특정 비디오 파일 제거
  | { type: "CLEAR_VIDEO_FILES" } // 모든 비디오 파일 제거
  | { type: "SET_DRONE_LIST"; payload: { droneList: string[] } } // 드론 리스트 설정
  | {
      type: "SET_DRONE_TYPE";
      payload: { droneType: string | null; pixelSize: number };
    } // 드론 종류 설정
  | { type: "ADD_DRONE"; payload: { droneIp: string } } // 드론 추가
  | { type: "REMOVE_DRONE"; payload: { droneIp: string } } // 드론 제거
  | { type: "SELECT_DRONE"; payload: { droneIp: string | null } } // 드론 선택
  | { type: "SET_ASPECT_RATIO"; payload: { width: number; height: number } } // 화면비 설정
  | { type: "SET_MULTIPLIER"; payload: { value: number } } // 곱셈 계수 설정
  | { type: "SET_CONVERTED_FILES"; payload: { fileList: string[] } }; // 변환된 파일 리스트 설정
