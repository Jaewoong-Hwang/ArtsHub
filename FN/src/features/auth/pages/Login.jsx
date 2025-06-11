import React, { useState } from "react";
import axios from "axios";
import "../../../assets/styles/reset.css";
import styles from "./css/login/login.module.css"; // 모듈 CSS import

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("로그인 성공!");
        window.location.href = "/main";
      }
    } catch (error) {
      setErrorMsg("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.mainLogoRow}>
        <a href="/">
          <img src="/static/img/mainlogo.png" alt="로고" className={styles.mainLogo} />
        </a>
      </div>

      <div className={styles.box1}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="이메일 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputRow}>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="login" />
          <label htmlFor="login" className={styles.checkboxLabel}>
            로그인 유지
          </label>
        </div>

        {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

<<<<<<< HEAD
        <div className="row mt-4">
          <div className="col">
            <button className="btn1 btn-custom" onClick={handleLogin}>
              로그인
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn2 btn-custom" onClick={() => window.location.href = "http://localhost:8090/oauth2/authorization/kakao"}>
              <img src="/static/img/kakao.png" alt="카카오" className="kakao" /> 카카오로 시작하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn3 btn-custom" onClick={() => window.location.href = "http://localhost:8090/oauth2/authorization/naver"}>
              <img src="/static/img/naver.png" alt="네이버" className="naver" /> 네이버로 시작하기
            </button>
            </div>
          </div>

        <div className="row">
          <div className="col">
            <button className="btn4 btn-custom" onClick={() => window.location.href = "http://localhost:8090/oauth2/authorization/google"}>
              <img src="/static/img/google.png" alt="구글" className="google" /> 구글로 시작하기
            </button>
            </div>
          </div>


        <div className="hypertext">
=======
        <button className={`${styles.btn1} ${styles.btnCustom}`} onClick={handleLogin}>
          이메일로 로그인하기
        </button>

        <button
          className={`${styles.btn2} ${styles.btnCustom}`}
          onClick={() => window.location.href = "/oauth2/authorization/kakao"}
        >
          <img src="/static/img/kakao.png" alt="카카오" className={styles.kakao} />
          카카오로 시작하기
        </button>

        <button
          className={`${styles.btn3} ${styles.btnCustom}`}
          onClick={() => window.location.href = "/oauth2/authorization/naver"}
        >
          <img src="/static/img/naver.png" alt="네이버" className={styles.naver} />
          네이버로 시작하기
        </button>

        <div className={styles.logos}>
          <button className={styles.btnSocial}>
            <img src="/static/img/google.png" alt="구글" className={styles.imgSocial} />
          </button>
          <button className={styles.btnSocial}>
            <img src="/static/img/facebook.png" alt="페북" className={styles.imgSocial} />
          </button>
          <button className={styles.btnSocial}>
            <img src="/static/img/apple.png" alt="애플" className={styles.imgSocial} />
          </button>
        </div>

        <div className={styles.hypertext}>
>>>>>>> origin/May-dev
          <a href="/find">아이디/비밀번호 찾기</a>
          <a href="/join">회원가입</a>
          <a href="/mypage">마이페이지</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
