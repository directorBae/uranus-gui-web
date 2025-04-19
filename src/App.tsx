import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import FuckinRacistButton from "./components/common/FuckinRacistButton";
import Sidebar from "./components/ui/Sidebar";
import { AppProvider } from "./store/AppContext";

// 페이지 컴포넌트 임포트
import Home from "./pages/home";
import Connect from "./pages/connect";
import Convert from "./pages/convert";
import Play from "./pages/play";
import Upload from "./pages/upload";
import PlayOnDrones from "./pages/playondrones";

// 사이드바 내비게이션을 위한 컴포넌트
function SidebarNavigation() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <FuckinRacistButton onClick={() => navigate("/convert")}>
        파일 변환
      </FuckinRacistButton>
      <FuckinRacistButton onClick={() => navigate("/play")}>
        영상 재생
      </FuckinRacistButton>
      <FuckinRacistButton onClick={() => navigate("/connect")}>
        기기 연결
      </FuckinRacistButton>
      <FuckinRacistButton onClick={() => navigate("/upload")}>
        드론 업로드
      </FuckinRacistButton>
      <FuckinRacistButton onClick={() => navigate("/playondrones")}>
        {"드론에서\n영상 재생"}
      </FuckinRacistButton>
    </Sidebar>
  );
}

// 레이아웃 컴포넌트
function AppLayout() {
  return (
    <div className="App">
      <SidebarNavigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/play" element={<Play />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/playondrones" element={<PlayOnDrones />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </Router>
  );
}

export default App;
