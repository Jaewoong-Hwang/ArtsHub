import React, { useState } from "react";
<<<<<<< HEAD
import styles from "./css/login/join.module.css"; // ✅ CSS Module import
=======
import "../../../assets/styles/reset.css";
import styles from "./css/login/join.module.css"; // 모듈 스타일 import
>>>>>>> origin/May-dev
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
<<<<<<< HEAD
      phoneNumber: `${document.getElementById("tel1").value}-${
        document.getElementById("tel2").value
      }-${document.getElementById("tel3").value}`,
      gender:
        document.querySelector('input[name="gender"]:checked')?.value || "male",
=======
      address: document.getElementById("addr").value,
      phone: `${document.getElementById("tel1").value}-${document.getElementById("tel2").value}-${document.getElementById("tel3").value}`,
>>>>>>> origin/May-dev
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
<<<<<<< HEAD
      await axiosInstance.get("/api/check-email", {
        params: { email: username },
      });
=======
      await axiosInstance.get("/api/check-username", { params: { username } });
>>>>>>> origin/May-dev
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
<<<<<<< HEAD
      <div className={styles.header}></div>
      <h1 className={styles.mainTitle}>Arts Hubs</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className={styles.containerJoinArtshub}>
          <h1>회원가입</h1>

          <div className={styles.idBox}>
            <input
              type="text"
=======
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
>>>>>>> origin/May-dev
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
<<<<<<< HEAD
=======
            name="password"
            className={styles.joinInput}
            placeholder="비밀번호"
>>>>>>> origin/May-dev
            id="password"
            className={styles.joinInput}
            placeholder="비밀번호"
          />
          <input
            type="password"
<<<<<<< HEAD
=======
            name="repassword"
            className={styles.joinInput}
            placeholder="비밀번호 재확인"
>>>>>>> origin/May-dev
            id="repassword"
            className={styles.joinInput}
            placeholder="비밀번호 재확인"
          />
          <input
            type="text"
<<<<<<< HEAD
=======
            name="username"
            className={styles.joinInput}
            placeholder="이름"
>>>>>>> origin/May-dev
            id="username"
            className={styles.joinInput}
            placeholder="이름"
          />

          <div className={styles.addressBox}>
            <input
              type="text"
<<<<<<< HEAD
=======
              name="zip"
              className={styles.joinInput}
              placeholder="우편번호"
>>>>>>> origin/May-dev
              id="zip"
              className={styles.joinInput}
              placeholder="우편번호"
            />
<<<<<<< HEAD
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
            >
=======
            <button type="button" className={`${styles.btnNormal} ${styles.btnSmall}`}>
>>>>>>> origin/May-dev
              우편번호 검색
            </button>
          </div>

          <input
            type="text"
<<<<<<< HEAD
=======
            name="addr"
            className={styles.joinInput}
            placeholder="상세 주소"
>>>>>>> origin/May-dev
            id="addr"
            className={styles.joinInput}
            placeholder="상세 주소"
          />

          <h6>휴대전화</h6>
          <div className={styles.tel}>
<<<<<<< HEAD
            <select id="tel1" className={`${styles.joinInput} ${styles.tel1}`}>
=======
            <select name="tel1" className={`${styles.joinInput} ${styles.tel1}`} id="tel1">
>>>>>>> origin/May-dev
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="012">012</option>
            </select>
            <span className={styles.telHypen}>-</span>
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/May-dev
        </div>
      </form>
    </div>
  );
};

export default Join;
