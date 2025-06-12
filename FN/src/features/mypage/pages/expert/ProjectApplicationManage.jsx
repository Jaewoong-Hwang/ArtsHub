import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ProjectApplicationManage.module.css';
import sidemenuStyles from '../css/expert/SidemenuExpert.module.css';
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { useAuth } from '../../../auth/context/AuthContext'; // ✅ 추가

const ProjectApplicationManage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth(); // ✅ 사용자 정보

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

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
      <Header />

      <div className={styles.mypage_section}>
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
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/FundingManage">펀딩관리</Link>
              <ul className={sidemenuStyles.submenu} style={{ display: 'none' }}>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/FundingManage">전체</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/FundingManage">진행중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/FundingManage">승인 대기중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/FundingManage">펀딩 종료</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/FundingManage">비승인</Link></li>
              </ul>
            </li>

            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}>
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className={sidemenuStyles.submenu}>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">전체</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">모집중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">모집 종료</Link></li>
                <li className={`${sidemenuStyles["submenu-item"]} ${sidemenuStyles.active}`}>
                  <Link to="/ProjectApplicationManage">참여요청</Link>
                </li>
              </ul>
            </li>

            <li className={sidemenuStyles["menu-item"]}><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ExpertProfile">프로필</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>프로젝트 관리</p>

          <div className={styles.projectapplicationList}>
            <div className={styles.projectapplicationCard}>
              <div className={styles.projectapplicationInfo}>
                <a href="/pages/seller/seller-profile-detail.html">
                  <p className={styles.projectapplicationTitle}>김지성</p>
                </a>
                <p className={styles.projectapplicationDate}>신청 날짜 : 2025.05.05</p>
              </div>

              <div className={styles.editDropdown}>
                <button className={styles.editButton} onClick={toggleDropdown}>
                  승인/거절
                </button>

                {dropdownOpen && (
                  <ul className={styles.dropdownMenu}>
                    <li onClick={() => handleSelect('approve')}>승인</li>
                    <li onClick={() => handleSelect('reject')}>거절</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectApplicationManage;
