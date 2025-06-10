import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../../../../assets/styles/reset.css'
import '../css/expert.css';
import '../css/sidemenu_expert.css';

const ProjectApplicationManage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (action) => {
    if (action === 'approve') {
      alert('참여 신청이 승인되었습니다.');
    } else if (action === 'reject') {
      alert('참여 신청이 거절되었습니다.');
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <div id="header"></div>

      <div className="mypage_section">
        <div className="sidebar_menu">
          <div className="profile">
            <img src="/static/img/apple.png" alt="프로필 이미지" className="profile-img" />
            <p className="nickname">닉네임</p>
          </div>

          <Link to="/UserInforead" className="change">
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className="My_Arts">My Arts</p>
          <ul className="menu">
            <li className="menu-item">
              <Link to="/FundingManage">펀딩관리</Link>
              <ul className="submenu" style={{ display: 'none' }}>
                <li className="submenu-item active"><Link to="/FundingManage">전체</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">진행중</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">승인 대기중</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">펀딩 종료</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">비승인</Link></li>
              </ul>
            </li>

            <li className="menu-item active">
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className="submenu">
                <li className="submenu-item"><Link to="/ProjectManage">전체</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집중</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집 종료</Link></li>
                <li className="submenu-item active"><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>

            <li className="menu-item"><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className="menu-item"><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className="menu-item"><Link to="/ExpertProfile">프로필</Link></li>
            <li className="menu-item">로그아웃</li>
          </ul>
        </div>

        <div className="content">
          <p className="title">프로젝트 관리</p>

          <div className="projectapplication-list">
            <div className="projectapplication-card">
              <div className="projectapplication-info">
                <a href="/pages/seller/seller-profile-detail.html">
                  <p className="projectapplication-title">김지성</p>
                </a>
                <p className="projectapplication-date">신청 날짜 : 2025.05.05</p>
              </div>

              <div className="edit-dropdown">
                <button className="edit-button" onClick={toggleDropdown}>
                  승인/거절
                </button>

                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => handleSelect('approve')}>승인</li>
                    <li onClick={() => handleSelect('reject')}>거절</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default ProjectApplicationManage;
