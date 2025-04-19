import { useContext } from "react";
import { AppContext } from "./AppContext";

// Context를 쉽게 사용하기 위한 커스텀 Hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext는 AppProvider 내부에서 사용되어야 합니다");
  }

  return context;
};
