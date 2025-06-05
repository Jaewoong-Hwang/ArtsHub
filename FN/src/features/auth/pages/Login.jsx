import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/login/login.css'; // 커스텀 CSS 경로

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    try {
      // 서버에 로그인 요청 (쿠키 포함)
      const response = await axios.post('/login', {
        username,
        password
      }, { withCredentials: true });

      alert('로그인 성공');
      navigate('/mypage'); // 로그인 후 이동할 페이지

    } catch (err) {
      // 로그인 실패 시
      alert('로그인 실패: ' + (err.response?.data || err.message));
    }
  };

  return (
    <form className="mt-5 p-0 m-0" onSubmit={(e) => e.preventDefault()}>
      {/* 헤더 아이콘 */}
      <div className="row header">
        <div className="col header-icon">
          <a href="#"><img src="/assets/img/login/back.svg" style={{ width: '24px' }} alt="back" /></a>
          <a href="#"><img src="/assets/img/login/home.svg" style={{ width: '24px' }} alt="home" /></a>
        </div>
      </div>

      {/* 메인 로고 */}
      <div className="row main-logo">
        <div className="col">
          <a href="/"><img src="/img/mainlogo.png" alt="main logo" className="mainlogo img-fluid" /></a>
        </div>
      </div>

      {/* 로그인 입력 영역 */}
      <div className="box1">
        {/* 이메일 입력 */}
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

        {/* 비밀번호 입력 */}
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

        {/* 로그인 유지 체크박스 */}
        <div className="cb mb-3">
          <input type="checkbox" id="login" />
          <span className="custom-chk"></span>
          <label htmlFor="login" style={{ fontSize: '14px' }}>로그인 유지</label>
        </div>

        {/* 이메일 로그인 버튼 */}
        <div className="row mt-4">
          <div className="col">
            <button type="button" className="btn1 btn-custom" onClick={handleLogin}>
              이메일로 로그인하기
            </button>
          </div>
        </div>

        {/* SNS 로그인 버튼들 */}
        <div className="row">
          <div className="col">
            <button type="button" className="btn2 btn-custom">
              <img src="/img/kakao.png" alt="카카오" className="kakao" /> 카카오로 시작하기
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="button" className="btn3 btn-custom">
              <img src="/img/naver.png" alt="네이버" className="naver" /> 네이버로 시작하기
            </button>

            <div className="logos">
              <button type="button" className="btn-social"><img src="/img/google.png" alt="구글" className="img-social" /></button>
              <button type="button" className="btn-social"><img src="/img/facebook.png" alt="페북" className="img-social" /></button>
              <button type="button" className="btn-social"><img src="/img/apple.png" alt="애플" className="img-social" /></button>
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
