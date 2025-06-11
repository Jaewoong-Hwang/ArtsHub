import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/user.css';
import '../../css/sidemenu_user.css';

const QuestionList = () => {
  return (
    <>
      <div id="header"></div>

      <div className="mypage_section">
        <div className="sidebar_menu">
          <div className="profile">
            <img src="/static/img/apple.png" alt="프로필 이미지" className="profile-img" />
            <p className="nickname">닉네임</p>
          </div>

          <Link to="/FundingManage" className="change" >
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className="My_Arts">My Arts</p>
          <ul className="menu">
            <li className="menu-item" data-target="content-userinfo_Authentication">
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className="menu-item">
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className="submenu" style={{ display: 'none' }}>
                <li className="submenu-item" data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className="submenu-item" data-target="content-funding-refund">
                  <Link to="/MyFundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item active" data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className="menu-item" data-target="content-logout">로그아웃</li>
          </ul>
        </div>

        <div className="content">
          <p className="title">문의</p>

          <div className="question-list">
            {/* 문의 항목 1 */}
            <div className="question-card">
              <div className="question-info">
                <p className="question-title">
                  <a href="/pages/buyer/question/read.html">아츠허브가 뭔가요?</a>
                </p>
                <p className="question-date">2025.05.05</p>
              </div>
              <p className="question-status">답변 완료</p>
            </div>

            {/* 문의 항목 2 */}
            <div className="question-card">
              <div className="question-info">
                <p className="question-title">
                  <a href="/pages/buyer/question/read.html">뭐냐구요 아츠허브</a>
                </p>
                <p className="question-date">2025.05.05</p>
              </div>
              <p className="question-status">답변 완료</p>
            </div>
          </div>

          <div className="question-button">
            <button onClick={() => (window.location.href = './write.html')}>
              문의 하기
            </button>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default QuestionList;
