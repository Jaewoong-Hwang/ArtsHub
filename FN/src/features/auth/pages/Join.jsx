import React, { useState } from "react";
import "./css/login/join.css"; // 스타일 경로 유지
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance"; // 쿠키 포함된 axios

const Join = () => {
  const navigate = useNavigate();

  // 중복확인 상태
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
      phone: `${document.getElementById("tel1").value}-${
        document.getElementById("tel2").value
      }-${document.getElementById("tel3").value}`,
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

  //  아이디 중복확인 처리
  const handleCheckUsername = async () => {
    const username = document.getElementById("userid").value;

    if (!username.trim()) {
      setDupMessage("아이디를 입력해주세요.");
      setIsAvailable(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/api/check-username", {
        params: { username },
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
      <div className="header"></div>
      <h1 className="main-title">Arts Hubs</h1>
      <hr />

      <div className="container-join-social">
        <h2>간편 가입</h2>
        <div>
          <button
            type="button"
            className="btn-kakao btn-standard"
            onClick={() => alert("카카오 연동 예정")}
          >
            <img src="/static/img/kakao.png" alt="카카오" className="kakao" />
            카카오로 시작하기
          </button>
        </div>
        <div>
          <button type="button" className="btn-naver btn-standard">
            <img src="/static/img/naver.png" alt="네이버" className="naver" />
            네이버로 시작하기
          </button>
        </div>

        <div className="logos">
          <button type="button" className="btn-social">
            <img
              src="/static/img/google.png"
              alt="구글"
              className="img-social"
            />
          </button>
          <button type="button" className="btn-social">
            <img
              src="/static/img/facebook.png"
              alt="페북"
              className="img-social"
            />
          </button>
          <button type="button" className="btn-social">
            <img
              src="/static/img/apple.png"
              alt="애플"
              className="img-social"
            />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container-join-artshub">
          <div className="id-box">
            <input
              type="text"
              name="userid"
              className="join-input"
              placeholder="아이디"
              id="userid"
            />
            <button
              type="button"
              className="btn-normal btn-small"
              onClick={handleCheckUsername}
            >
              중복확인
            </button>
          </div>
          {/* 중복확인 결과 메시지 */}
          {dupMessage && (
            <p style={{ fontSize: "13px", color: isAvailable ? "green" : "red" }}>
              {dupMessage}
            </p>
          )}

          <input
            type="password"
            name="password"
            className="join-input"
            placeholder="비밀번호"
            id="password"
          />
          <input
            type="password"
            name="repassword"
            className="join-input"
            placeholder="비밀번호 재확인"
            id="repassword"
          />
          <input
            type="text"
            name="username"
            className="join-input"
            placeholder="이름"
            id="username"
          />

          <div className="address-box">
            <input
              type="text"
              name="zip"
              className="join-input"
              placeholder="우편번호"
              id="zip"
            />
            <button type="button" className="btn-normal btn-small">
              우편번호 검색
            </button>
          </div>

          <input
            type="text"
            name="addr"
            className="join-input"
            placeholder="상세 주소"
            id="addr"
          />

          <h6>휴대전화</h6>
          <div className="tel">
            <select name="tel1" className="join-input tel1" id="tel1">
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="012">012</option>
            </select>
            <span className="tel-hypen">-</span>
            <input
              type="text"
              name="tel2"
              className="join-input tel2"
              id="tel2"
            />
            <span className="tel-hypen">-</span>
            <input
              type="text"
              name="tel3"
              className="join-input tel3"
              id="tel3"
            />
            <button type="button" className="btn-normal btn-small">
              인증번호 받기
            </button>
          </div>

          <div>
            <button type="submit" className="btn-normal btn-standard">
              회원가입 하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Join;
