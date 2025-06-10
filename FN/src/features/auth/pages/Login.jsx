// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import "./css/login/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true } // 쿠키 저장을 위해 필수
      );

      if (response.status === 200) {
        alert("로그인 성공!");
        window.location.href = "/main"; // 성공 시 이동할 페이지
      }
    } catch (error) {
      setErrorMsg("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="row main-logo">
        <div className="col">
          <a href="/">
            <img src="/static/img/mainlogo.png" alt="로고" className="mainlogo img-fluid" />
          </a>
        </div>
      </div>

      <div className="box1">
        <div className="row custom-input">
          <div className="col">
            <input
              type="text"
              placeholder="이메일 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="row custom-input">
          <div className="col">
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="cb mb-3">
          <input type="checkbox" id="login" />
          <label htmlFor="login" style={{ fontSize: "14px" }}>
            로그인 유지
          </label>
        </div>

        {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

        <div className="row mt-4">
          <div className="col">
            <button className="btn1 btn-custom" onClick={handleLogin}>
              이메일로 로그인하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn2 btn-custom" onClick={() => window.location.href = "/oauth2/authorization/kakao"}>
              <img src="/static/img/kakao.png" alt="카카오" className="kakao" /> 카카오로 시작하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn3 btn-custom" onClick={() => window.location.href = "/oauth2/authorization/naver"}>
              <img src="/static/img/naver.png" alt="네이버" className="naver" /> 네이버로 시작하기
            </button>

            <div className="logos">
              <button className="btn-social">
                <img src="/static/img/google.png" alt="구글" />
              </button>
              <button className="btn-social">
                <img src="/static/img/facebook.png" alt="페북" />
              </button>
              <button className="btn-social">
                <img src="/static/img/apple.png" alt="애플" />
              </button>
            </div>
          </div>
        </div>

        <div className="hypertext">
          <a href="/find">아이디/비밀번호 찾기</a>
          <a href="/join">회원가입</a>
          <a href="/mypage">마이페이지</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
