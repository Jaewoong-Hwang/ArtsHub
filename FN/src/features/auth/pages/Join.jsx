import React, { useState } from "react";
import "../../../assets/styles/reset.css";
import styles from "./css/login/join.module.css"; // 모듈 스타일 import
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const Join = () => {
  const navigate = useNavigate();
  const [dupMessage, setDupMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;

    const userData = {
      username: document.getElementById("userid").value,
      password: document.getElementById("password").value,
      name: document.getElementById("username").value,
      address: document.getElementById("addr").value,
      phone: `${document.getElementById("tel1").value}-${document.getElementById("tel2").value}-${document.getElementById("tel3").value}`,
    };

    if (password !== repassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!userData.username || !userData.password || !userData.name) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post("/api/join", userData);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCheckUsername = async () => {
    const username = document.getElementById("userid").value;

    if (!username.trim()) {
      setDupMessage("아이디를 입력해주세요.");
      setIsAvailable(false);
      return;
    }

    try {
      await axiosInstance.get("/api/check-username", { params: { username } });
      setDupMessage("사용 가능한 아이디입니다.");
      setIsAvailable(true);
    } catch (err) {
      setDupMessage(
        err.response?.status === 409
          ? "이미 사용 중인 아이디입니다."
          : "서버 오류가 발생했습니다."
      );
      setIsAvailable(false);
    }
  };

  return (
    <div>
      <div className="header"></div>
      <h1 className={styles.mainTitle}>Arts Hubs</h1>
      <hr />

      <div className={styles.containerJoinSocial}>
        <h2>간편 가입</h2>
        <button type="button" className={`${styles.btnKakao} ${styles.btnStandard}`}>
          <img src="/static/img/kakao.png" alt="카카오" className={styles.kakao} />
          카카오로 시작하기
        </button>
        <button type="button" className={`${styles.btnNaver} ${styles.btnStandard}`}>
          <img src="/static/img/naver.png" alt="네이버" className={styles.naver} />
          네이버로 시작하기
        </button>
        <div className={styles.logos}>
          {["google", "facebook", "apple"].map((sns) => (
            <button key={sns} className={styles.btnSocial}>
              <img src={`/static/img/${sns}.png`} alt={sns} className={styles.imgSocial} />
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.containerJoinArtshub}>
          <div className={styles.idBox}>
            <input
              type="text"
              name="userid"
              className={styles.joinInput}
              placeholder="아이디"
              id="userid"
            />
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
              onClick={handleCheckUsername}
            >
              중복확인
            </button>
          </div>
          {dupMessage && (
            <p style={{ fontSize: "13px", color: isAvailable ? "green" : "red" }}>
              {dupMessage}
            </p>
          )}

          <input
            type="password"
            name="password"
            className={styles.joinInput}
            placeholder="비밀번호"
            id="password"
          />
          <input
            type="password"
            name="repassword"
            className={styles.joinInput}
            placeholder="비밀번호 재확인"
            id="repassword"
          />
          <input
            type="text"
            name="username"
            className={styles.joinInput}
            placeholder="이름"
            id="username"
          />

          <div className={styles.addressBox}>
            <input
              type="text"
              name="zip"
              className={styles.joinInput}
              placeholder="우편번호"
              id="zip"
            />
            <button type="button" className={`${styles.btnNormal} ${styles.btnSmall}`}>
              우편번호 검색
            </button>
          </div>

          <input
            type="text"
            name="addr"
            className={styles.joinInput}
            placeholder="상세 주소"
            id="addr"
          />

          <h6>휴대전화</h6>
          <div className={styles.tel}>
            <select name="tel1" className={`${styles.joinInput} ${styles.tel1}`} id="tel1">
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="012">012</option>
            </select>
            <span className={styles.telHypen}>-</span>
            <input type="text" name="tel2" className={`${styles.joinInput} ${styles.tel2}`} id="tel2" />
            <span className={styles.telHypen}>-</span>
            <input type="text" name="tel3" className={`${styles.joinInput} ${styles.tel3}`} id="tel3" />
            <button type="button" className={`${styles.btnNormal} ${styles.btnSmall}`}>
              인증번호 받기
            </button>
          </div>

          <div>
            <button type="submit" className={`${styles.btnNormal} ${styles.btnStandard}`}>
              회원가입 하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Join;
