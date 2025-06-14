import React, { useState } from "react";
import "../../../assets/styles/reset.css";
import styles from "./css/login/join.module.css"; // ✅ CSS Module import
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const Join = () => {
  const navigate = useNavigate();
  const [dupMessage, setDupMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  //휴대전화인증번호
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState(""); // 입력된 인증번호
  //이메일인증
  const [emailCode, setEmailCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 전화번호 입력 검증
  const handleSendVerificationCode = async () => {
    const phoneNumber = `${document.getElementById("tel1").value}-${
      document.getElementById("tel2").value
    }-${document.getElementById("tel3").value}`;

    if (phoneNumber.length < 10) {
      alert("올바른 전화번호를 입력해주세요.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/send-verification", {
        phoneNumber,
      });

      // ✅ 응답에서 인증번호 받아서 자동입력
      const code = res.data.code;
      setVerificationCode(code);
      alert("인증번호가 전송되었습니다.");
    } catch (err) {
      alert(
        "인증번호 전송 실패: " + (err.response?.data?.message || err.message)
      );
    }
  };

  //휴대폰 인증번호 확인 함수
  const handleVerifyCode = async () => {
    const phoneNumber = `${document.getElementById("tel1").value}-${
      document.getElementById("tel2").value
    }-${document.getElementById("tel3").value}`;

    try {
      const res = await axiosInstance.post("/api/verify-code", {
        phoneNumber,
        code: verificationCode,
      });

      if (res.data.success) {
        setIsPhoneVerified(true);
        alert("전화번호 인증이 완료되었습니다.");
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (err) {
      alert("인증 실패: " + (err.response?.data?.message || err.message));
    }
  };

  //  우편번호 검색창 열기 함수 (Daum API)
  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const { zonecode, address } = data;

        // 우편번호 및 주소 input에 자동 삽입
        document.getElementById("zip").value = zonecode;
        document.getElementById("addr").value = address;
      },
    }).open();
  };

  // 회원가입 요청 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const name = document.getElementById("username").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const baseAddress = document.getElementById("addr").value.trim();
    const detailAddress = document.getElementById("addrDetail").value.trim();
    const fullAddress = `${baseAddress} ${detailAddress}`.trim(); // 전체 주소

    const userData = {
      email: document.getElementById("userid").value,
      password: password,
      name: document.getElementById("username").value,
      phoneNumber: `${document.getElementById("tel1").value}-${
        document.getElementById("tel2").value
      }-${document.getElementById("tel3").value}`,
      address: fullAddress,
    };

    if (password !== repassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userData.email)) {
      alert("이메일 형식으로 아이디를 입력해주세요.");
      return;
    }

    if (!zip) {
      alert("우편번호를 입력해주세요.");
      return;
    }

    if (!baseAddress) {
      alert("주소를 입력해주세요.");
      return;
    }

    if (!detailAddress) {
      alert("상세 주소를 입력해주세요.");
      return;
    }

    if (!isPhoneVerified) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    if (!userData.email || !userData.password || !userData.name) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      console.log("보낼 userData:", userData);
      await axiosInstance.post("/api/join", userData);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패 응답:", err.response);
      const message = err.response?.data?.message || err.message;
      alert("회원가입 실패: " + message);
    }
  };

  // 이메일 중복 확인 함수
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
      setDupMessage(
        err.response?.status === 409
          ? "이미 사용 중인 아이디입니다."
          : "서버 오류가 발생했습니다."
      );
      setIsAvailable(false);
    }
  };

  // 이메일 인증 요청
  const handleSendEmailCode = async () => {
    const email = document.getElementById("userid").value;
    if (!email.includes("@")) {
      alert("올바른 이메일을 입력하세요");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/send-email-code", { email });

      //개발자 모드일 경우 code 응답 옴 -> 자동 입력
      const code = res.data.code;

      if (code) {
        setEmailVerificationCode(code);
        setEmailCode(code); // <- 자동 입력
      }

      alert("이메일로 인증코드가 발송되었습니다.");
    } catch (err) {
      alert(
        "이메일 전송 실패: " + (err.response?.data?.message || err.message)
      );
    }
  };

  //  이메일 인증 확인
const handleVerifyEmailCode = async () => {
  const email = document.getElementById("userid").value;

  try {
    const res = await axiosInstance.post("/api/verify-email-code", {
      email,
      code: emailCode,
    });

    if (res.data.success) {
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  } catch (err) {
    alert(
      "인증 실패: " + (err.response?.data?.message || err.message)
    );
  }
};


  return (
    <div className={styles.pageWrapper}>
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
              placeholder="이메일 *"
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
              style={{
                fontSize: "13px",
                color: isAvailable ? "green" : "red",
                display: "flex",
                position: "relative",
                top: "-30px",
              }}
            >
              {dupMessage}
            </p>
          )}

          {/* 이메일 인증 코드 전송/입력 */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "-10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="이메일 인증코드 입력"
              className={styles.joinInput}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              style={{ width: "200px" }}
              readOnly={isEmailVerified}
            />
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
              onClick={handleSendEmailCode}
            >
              인증번호발송
            </button>
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
              onClick={handleVerifyEmailCode}
              disabled={isEmailVerified}
            >
              확인
            </button>
          </div>
          {isEmailVerified && (
            <p
              style={{
                color: "green",
                fontSize: "13px",
                display: "flex",
                position: "relative",
                top: "-30px",
              }}
            >
              이메일 인증 완료
            </p>
          )}

          <input
            type="password"
            id="password"
            className={styles.joinInput}
            placeholder="비밀번호 *"
          />
          <input
            type="password"
            id="repassword"
            className={styles.joinInput}
            placeholder="비밀번호 재확인 *"
          />
          <input
            type="text"
            id="username"
            className={styles.joinInput}
            placeholder="이름 *"
          />

          <div className={styles.addressBox}>
            <input
              type="text"
              id="zip"
              className={styles.joinInput}
              placeholder="우편번호 *"
            />
            <button
              type="button"
              onClick={handlePostcode}
              className={`${styles.btnNormal} ${styles.btnSmall}`}
            >
              우편번호 검색
            </button>
          </div>

          <input
            type="text"
            id="addr"
            className={styles.joinInput}
            placeholder="기본 주소 *"
          />

          <input
            type="text"
            id="addrDetail"
            className={styles.joinInput}
            placeholder="상세 주소 (예: 101동 505호) *"
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
              onClick={handleSendVerificationCode}
            >
              인증번호 받기
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "relative",
              top: "-30px",
              marginLeft: "auto",
            }}
          >
            {verificationCode && (
              <p
                style={{
                  color: isPhoneVerified ? "green" : "red",
                  fontSize: "13px",
                  margin: 0, // 줄바꿈 방지
                  whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                }}
              >
                {isPhoneVerified ? "인증 완료" : "인증 필요"}
              </p>
            )}
            <input
              type="text"
              placeholder="인증번호 입력"
              className={styles.joinInput}
              style={{ width: "200px", margin: "0" }} // 너비 수동 지정
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              readOnly={isPhoneVerified}
            />
            <button
              type="button"
              className={`${styles.btnNormal} ${styles.btnSmall}`}
              onClick={handleVerifyCode}
              disabled={isPhoneVerified}
            >
              인증 확인
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
