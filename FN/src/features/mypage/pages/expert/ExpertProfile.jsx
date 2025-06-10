import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../../../../assets/styles/reset.css'
import '../css/expert.css';
import '../css/sidemenu_expert.css';

const ExpertProfile = () => {
  const [phone, setPhone] = useState('010-0000-0000');
  const [availableTime, setAvailableTime] = useState('19:00-21:00');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);

  const handleEditToggle = (field) => {
    if (field === 'phone') setIsEditingPhone(true);
    if (field === 'time') setIsEditingTime(true);
  };

  const handleCancel = (field) => {
    if (field === 'phone') setIsEditingPhone(false);
    if (field === 'time') setIsEditingTime(false);
  };

  const handleSave = (field) => {
    alert('변경 사항이 저장되었습니다.');
    if (field === 'phone') setIsEditingPhone(false);
    if (field === 'time') setIsEditingTime(false);
    // 추후 서버에 PATCH 요청 가능
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

          <Link to="/UserInforead" className="change" >
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className="My_Arts">My Arts</p>
          <ul className="menu">
            <li className="menu-item"><Link to="/FundingManage">펀딩관리</Link></li>
            <li className="menu-item"><Link to="/ProjectManage">프로젝트 관리</Link></li>
            <li className="menu-item"><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className="menu-item"><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className="menu-item active"><Link to="/ExpertProfile">프로필</Link></li>
            <li className="menu-item">로그아웃</li>
          </ul>
        </div>

        <div className="content">
          <p className="title">전문가 정보</p>

          <div className="expert-box">
            {/* 등급 */}
            <div className="expert-grade">
              <p className="label">전문가 등급</p>
              <p className="value">
                아츠님의 등급은 <span className="grade-name">브론즈</span>입니다.
              </p>
              <a href="/pages/seller/seller-profile-detail.html" className="edit-profile">
                프로필 편집하러 가기
              </a>
            </div>

            <div className="profile_hr"></div>

            {/* 연락처 */}
            <div className="expert-info-row">
              <label className="expert-info-label">연락 가능한 연락처</label>
              <div className="expert-info-data">
                <input
                  type="text"
                  className="expert-edit-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditingPhone}
                />
                <div className="edit-buttons">
                  {!isEditingPhone ? (
                    <a href="#" className="edit-link" onClick={() => handleEditToggle('phone')}>
                      수정
                    </a>
                  ) : (
                    <div className="edit-actions">
                      <a href="#" onClick={() => handleSave('phone')}>완료</a>
                      <a href="#" onClick={() => handleCancel('phone')}>취소</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 연락 시간 */}
            <div className="expert-info-row">
              <label className="expert-info-label">연락 가능한 시간</label>
              <div className="expert-info-data">
                <input
                  type="text"
                  className="expert-edit-input"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  disabled={!isEditingTime}
                />
                <div className="edit-buttons">
                  {!isEditingTime ? (
                    <a href="#" className="edit-link" onClick={() => handleEditToggle('time')}>
                      수정
                    </a>
                  ) : (
                    <div className="edit-actions">
                      <a href="#" onClick={() => handleSave('time')}>완료</a>
                      <a href="#" onClick={() => handleCancel('time')}>취소</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default ExpertProfile;
