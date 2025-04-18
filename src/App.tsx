import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FuckinRacistButton from "./components/common/FuckinRacistButton";
import Sidebar from "./components/ui/Sidebar";
import FlatButton from "./components/common/FlatButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Sidebar>
          <FuckinRacistButton onClick={() => alert("파일 변환")}>
            파일 변환
          </FuckinRacistButton>
          <FuckinRacistButton onClick={() => alert("영상 재생")}>
            영상 재생
          </FuckinRacistButton>
          <FuckinRacistButton onClick={() => alert("기기 연결")}>
            기기 연결
          </FuckinRacistButton>
          <FuckinRacistButton onClick={() => alert("드론 업로드")}>
            드론 업로드
          </FuckinRacistButton>
          <FuckinRacistButton onClick={() => alert("드론에서 영상 재생")}>
            {"드론에서\n영상 재생"}
          </FuckinRacistButton>
          <FlatButton onClick={() => alert("업로드")}>{"업로드"}</FlatButton>
        </Sidebar>
      </header>
    </div>
  );
}

export default App;
