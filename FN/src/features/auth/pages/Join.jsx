import React, { useState } from "react";
import styles from "./css/login/join.module.css"; // ✅ CSS Module import
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
      email: document.getElementById("userid").value,
      password: password,
      name: document.getElementById("username").value,
      phoneNumber: `${document.getElementById("tel1").value}-${
        document.getElementById("tel2").value
      }-${document.getElementById("tel3").value}`,
      gender:
        document.querySelector('input[name="gender"]:checked')?.value || "male",
    };

    if (password !== repassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!userData.email || !userData.password || !userData.name) {
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
      await axiosInstance.get("/api/check-email", {
        params: { email: username },
      });
      setDupMessage("사용 가능한 아이디입니다.");
      setIsAvailable(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setDupMessage("이미 사용 중인 아이디입니다.");
      } else {
        setDupMessage("서버 오류가 발생했습니다.");
      }
      setIsAvailable(false);
    }
  };

  return (
    <div>
      <div className={styles.header}></div>
      <h1 className={styles.mainTitle}>Arts Hubs</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className={styles.containerJoinArtshub}>
          <h1>회원가입</h1>

          <div className={styles.idBox}>
            <input
              type="text"
              id="userid"
              className={styles.joinInput}
              placeholder="아이디"
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
            <p
              style={{ fontSize: "13px", color: isAvailable ? "green" : "red" }}
            >
              {dupMessage}
            </p>
          )}

          <input
            type="password"
            id="password"
            className={styles.joinInput}
            placeholder="비밀번호"
          />
          <input
            type="password"
            id="repassword"
            className={styles.joinInput}
            placeholder="비밀번호 재확인"
          />
          <input
            type="text"
            id="username"
            className={styles.joinInput}
            placeholder="이름"
          />

          <div className={styles.addressBox}>
            <input
              type="text"
              id="zip"
              className={styles.joinInput}
              placeholder="우편번호"
            />
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
            >
              우편번호 검색
            </button>
          </div>

          <input
            type="text"
            id="addr"
            className={styles.joinInput}
            placeholder="상세 주소"
          />

          <h6>휴대전화</h6>
          <div className={styles.tel}>
            <select id="tel1" className={`${styles.joinInput} ${styles.tel1}`}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="012">012</option>
            </select>
            <span className={styles.telHypen}>-</span>
            <input
              type="text"
              id="tel2"
              className={`${styles.joinInput} ${styles.tel2}`}
            />
            <span className={styles.telHypen}>-</span>
            <input
              type="text"
              id="tel3"
              className={`${styles.joinInput} ${styles.tel3}`}
            />
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
            >
              인증번호 받기
            </button>
          </div>
          
          <button
            type="submit"
            className={`${styles.btnNormal} ${styles.btnStandard}`}
          >
            회원가입 하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
