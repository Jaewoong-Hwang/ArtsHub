import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/user.css';
import '../../css/sidemenu_user.css';
import '../../js/seller-funding.js'

const MyFundingSupport = () => {
  return (
    <>
      <div id="header"></div>
    
      <div className="mypage_section">
        <div className="sidebar_menu">
          <div className="profile">
            <img src="/static/img/apple.png" alt="프로필 이미지" className="profile-img" />
            <p className="nickname">닉네임</p>
          </div>

          <Link to="/FundingManage" className="change">
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className="My_Arts">My Arts</p>
          <ul className="menu">
            <li className="menu-item" data-target="content-userinfo_Authentication">
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className="menu-item active">
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className="submenu">
                <li className="submenu-item active" data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className="submenu-item" data-target="content-funding-refund">
                  <Link to="/MyFundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item" data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className="menu-item" data-target="content-logout">로그아웃</li>
          </ul>
        </div>

        <div className="content">
          <p className="title">후원 진행중</p>

          <div className="funding-list">
            {/* 후원 항목 */}
            <div className="funding-card">
              <a href="/SupportDetailupdate">
                <img src="/static/img/극단 공연 어둠속의 빛.webp" alt="프로젝트 이미지" />
              </a>
              <div className="funding-info">
                <p className="date">후원일 2025.05.05</p>
                <p className="title">여기가 어디인가요? &lt;기억상실&gt;</p>
                <p className="artist">A세트(x1)</p>
                <p className="price">12,000원</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default MyFundingSupport;
