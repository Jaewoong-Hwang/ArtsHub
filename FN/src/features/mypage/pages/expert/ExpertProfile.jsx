import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ExpertProfile.module.css';
import sidemenuStyles from '../css/expert/SidemenuExpert.module.css';
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { useAuth } from '../../../auth/context/AuthContext'; // ✅ 추가

const ExpertProfile = () => {
  const { user } = useAuth(); // ✅ 사용자 정보
  const [phone, setPhone] = useState('010-0000-0000');
  const [availableTime, setAvailableTime] = useState('19:00-21:00');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

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
  };

  return (
    <>
      <Header />

      <div className={styles.mypageSection}>
        <div className={sidemenuStyles.sidebar_menu}>
          <div className={sidemenuStyles.profile}>
            <img
              src={profileImageSrc}
              alt="프로필 이미지"
              className={sidemenuStyles["profile-img"]}
            />
            <p className={sidemenuStyles.nickname}>{user?.nickname || "닉네임"}</p>
          </div>

          <Link to="/UserInforead" className={sidemenuStyles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className={sidemenuStyles.My_Arts}>My Arts</p>
          <ul className={sidemenuStyles.menu}>
            <li className={sidemenuStyles["menu-item"]}><Link to="/FundingManage">펀딩관리</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ProjectManage">프로젝트 관리</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}><Link to="/ExpertProfile">프로필</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>전문가 정보</p>

          <div className={styles.expertBox}>
            <div className={styles.expertGrade}>
              <p className={styles.label}>전문가 등급</p>
              <p className={styles.value}>
                아츠님의 등급은 <span className={styles.gradeName}>브론즈</span>입니다.
              </p>
              <a href="/ExpertProfileDetail" className={styles.editProfile}>
                프로필 편집하러 가기
              </a>
            </div>

            <div className={styles.profileHr}></div>

            <div className={styles.expertInfoRow}>
              <label className={styles.expertInfoLabel}>연락 가능한 연락처</label>
              <div className={styles.expertInfoData}>
                <input
                  type="text"
                  className={styles.expertEditInput}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditingPhone}
                />
                <div className={styles.editButtons}>
                  {!isEditingPhone ? (
                    <a href="#" onClick={() => handleEditToggle('phone')}>수정</a>
                  ) : (
                    <div className={styles.editActions}>
                      <a href="#" onClick={() => handleSave('phone')}>완료</a>
                      <a href="#" onClick={() => handleCancel('phone')}>취소</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.expertInfoRow}>
              <label className={styles.expertInfoLabel}>연락 가능한 시간</label>
              <div className={styles.expertInfoData}>
                <input
                  type="text"
                  className={styles.expertEditInput}
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  disabled={!isEditingTime}
                />
                <div className={styles.editButtons}>
                  {!isEditingTime ? (
                    <a href="#" onClick={() => handleEditToggle('time')}>수정</a>
                  ) : (
                    <div className={styles.editActions}>
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

      <Footer />
    </>
  );
};

export default ExpertProfile;
