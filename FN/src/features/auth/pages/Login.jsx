// src/features/auth/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance"; // axios 인스턴스 사용

import "./css/login/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // form-urlencoded로 서버에 로그인 요청
      const response = await axiosInstance.post(
        "/login",
        new URLSearchParams({
          username: username,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true, // 쿠키 인증 방식 사용 시 필수
        }
      );

      axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      alert("로그인 성공");
      navigate("/"); // 마이페이지로 이동
    } catch (err) {
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form className="mt-5 p-0 m-0" onSubmit={(e) => e.preventDefault()}>
      {/* 상단 아이콘 */}
      <div className="row header">
        <div className="col header-icon">
          <a href="#">
            <img
              src="/assets/img/login/back.svg"
              alt="back"
              style={{ width: "24px" }}
            />
          </a>
          <a href="#">
            <img
              src="/assets/img/login/home.svg"
              alt="home"
              style={{ width: "24px" }}
            />
          </a>
        </div>
      </div>

      {/* 로고 */}
      <div className="row main-logo">
        <div className="col">
          <a href="/">
            <img
              src="/img/mainlogo.png"
              alt="main logo"
              className="mainlogo img-fluid"
            />
          </a>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="box1">
        <div className="row custom-input">
          <div className="col">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="이메일 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="row custom-input">
          <div className="col">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="cb mb-3">
          <input type="checkbox" id="login" />
          <span className="custom-chk"></span>
          <label htmlFor="login" style={{ fontSize: "14px" }}>
            로그인 유지
          </label>
        </div>

        {/* 로그인 버튼 */}
        <div className="row mt-4">
          <div className="col">
            <button
              type="button"
              className="btn1 btn-custom"
              onClick={handleLogin}
            >
              이메일로 로그인하기
            </button>
          </div>
        </div>

        {/* SNS 로그인 자리 */}
        <div className="row">
          <div className="col">
            <div className="logos">
              <button type="button" className="btn-social">
                <img src="/img/google.png" alt="구글" className="img-social" />
              </button>
              <button type="button" className="btn-social">
                <img
                  src="/img/facebook.png"
                  alt="페북"
                  className="img-social"
                />
              </button>
              <button type="button" className="btn-social">
                <img src="/img/apple.png" alt="애플" className="img-social" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="hypertext">
        <a href="#">아이디/비밀번호 찾기</a>
        <a href="/join">회원가입</a>
        <a href="/mypage">마이페이지</a>
      </div>
    </form>
  );
}

export default Login;
