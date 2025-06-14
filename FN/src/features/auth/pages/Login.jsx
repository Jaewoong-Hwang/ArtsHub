import React, { useState } from "react";
import axios from "axios";
import "../../../assets/styles/reset.css";
import styles from "./css/login/login.module.css";
import LogoImg from "../../../assets/images/logo.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ 폼 기본 제출 동작 방지

    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMsg("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.mainLogoRow}>
        <a href="/">
          <img src={LogoImg} alt="로고" className={styles.mainlogo} />
        </a>
      </div>

      <form className={styles.box1} onSubmit={handleLogin}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="이메일 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.customInput}
          />
        </div>

        <div className={styles.inputRow}>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.customInput}
          />
        </div>

        <div className={styles.cb}>
          <input type="checkbox" id="login" />
          <label htmlFor="login" className={styles.checkboxLabel}>
            로그인 유지
          </label>
        </div>

        {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

        <div className="row mt-4">
          <div className="col">
            <button type="submit" className={styles.btn1}>
              로그인
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              type="button"
              className={styles.btn2}
              onClick={() =>
                (window.location.href =
                  "http://localhost:8090/oauth2/authorization/kakao")
              }
            >
              카카오로 시작하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              type="button"
              className={styles.btn3}
              onClick={() =>
                (window.location.href =
                  "http://localhost:8090/oauth2/authorization/naver")
              }
            >
              네이버로 시작하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              type="button"
              className={styles.btn4}
              onClick={() =>
                (window.location.href =
                  "http://localhost:8090/oauth2/authorization/google")
              }
            >
              구글로 시작하기
            </button>
          </div>
        </div>

        <div className={styles.hypertext}>
          <a href="/find" className={styles.link}>
            아이디/비밀번호 찾기
          </a>
          <a href="/join" className={styles.link}>
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
