import React, { createContext, useReducer, ReactNode } from "react";
import { AppState, ActionType } from "./types";

// 초기 상태 설정
const initialState: AppState = {
  file: {
    videoFiles: [],
  },
  drone: {
    droneList: [],
    selectedDrone: null,
    droneType: "UR-16",
    pixelSize: 4,
    screenSettings: {
      aspectRatio: {
        width: 0, // 기본값 16:9
        height: 0,
      },
      multiplier: 1, // 기본 곱셈 계수
      calculatedWidth: 0, // 기본 계산 결과
      calculatedHeight: 0,
    },
  },
  convertedFiles: {
    fileList: [],
  },
};

// Context 생성
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

// 리듀서 함수 정의
const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case "ADD_VIDEO_FILES":
      return {
        ...state,
        file: {
          ...state.file,
          videoFiles: [...state.file.videoFiles, ...action.payload.files],
        },
      };

    case "UPDATE_VIDEO_FILE":
      return {
        ...state,
        file: {
          ...state.file,
          videoFiles: state.file.videoFiles.map((file, index) =>
            index === action.payload.index ? action.payload.file : file
          ),
        },
      };

    case "REMOVE_VIDEO_FILE":
      return {
        ...state,
        file: {
          ...state.file,
          videoFiles: state.file.videoFiles.filter(
            (_, index) => index !== action.payload.index
          ),
        },
      };

    case "CLEAR_VIDEO_FILES":
      return {
        ...state,
        file: {
          ...state.file,
          videoFiles: [],
        },
      };

    case "SET_DRONE_LIST":
      return {
        ...state,
        drone: {
          ...state.drone,
          droneList: action.payload.droneList,
        },
      };

    case "SET_DRONE_TYPE":
      return {
        ...state,
        drone: {
          ...state.drone,
          droneType: action.payload.droneType,
          pixelSize: action.payload.pixelSize,
        },
      };

    case "ADD_DRONE":
      // 중복 IP 체크
      if (state.drone.droneList.includes(action.payload.droneIp)) {
        return state;
      }
      return {
        ...state,
        drone: {
          ...state.drone,
          droneList: [...state.drone.droneList, action.payload.droneIp],
        },
      };

    case "REMOVE_DRONE":
      return {
        ...state,
        drone: {
          ...state.drone,
          droneList: state.drone.droneList.filter(
            (ip) => ip !== action.payload.droneIp
          ),
          // 만약 선택된 드론이 제거되는 드론과 같다면 선택 해제
          selectedDrone:
            state.drone.selectedDrone === action.payload.droneIp
              ? null
              : state.drone.selectedDrone,
        },
      };

    case "SELECT_DRONE":
      return {
        ...state,
        drone: {
          ...state.drone,
          selectedDrone: action.payload.droneIp,
        },
      };

    case "SET_ASPECT_RATIO":
      // 화면비 설정 및 계산된 값 업데이트
      const { width, height } = action.payload;
      return {
        ...state,
        drone: {
          ...state.drone,
          screenSettings: {
            ...state.drone.screenSettings,
            aspectRatio: {
              width,
              height,
            },
            calculatedWidth: width * state.drone.screenSettings.multiplier,
            calculatedHeight: height * state.drone.screenSettings.multiplier,
          },
        },
      };

    case "SET_MULTIPLIER":
      // 곱셈 계수 설정 및 계산된 값 업데이트
      const { value } = action.payload;
      return {
        ...state,
        drone: {
          ...state.drone,
          screenSettings: {
            ...state.drone.screenSettings,
            multiplier: value,
            calculatedWidth:
              state.drone.screenSettings.aspectRatio.width * value,
            calculatedHeight:
              state.drone.screenSettings.aspectRatio.height * value,
          },
        },
      };

    case "SET_CONVERTED_FILES":
      return {
        ...state,
        convertedFiles: {
          ...state.convertedFiles,
          fileList: action.payload.fileList,
        },
      };

    default:
      return state;
  }
};

// Context Provider 컴포넌트
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
