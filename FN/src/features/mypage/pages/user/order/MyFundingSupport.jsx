import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/SidemenuUser.module.css';
import pageStyles from '../../css/user/order/MyFundingSupport.module.css';
import Header from '../../../../../components/layout/Header';
import Footer from '../../../../../components/layout/Footer';
import { useAuth } from '../../../../auth/context/AuthContext';
import LogoutButton from '../../../../auth/components/LogoutButton';

const MyFundingSupport = () => {
  const { user } = useAuth();

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  return (
    <>
      <Header />

      <div className={pageStyles["mypage_section"]}>
        <div className={styles["sidebarMenu"]}>
          <div className={styles["profile"]}>
            <img
              src={profileImageSrc}
              alt="프로필 이미지"
              className={styles["profileImg"]}
            />
            <p className={styles["nickname"]}>{user?.nickname || "닉네임"}</p>
          </div>

          <Link to="/FundingManage" className={styles["change"]}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={styles["myArts"]}>My Arts</p>
          <ul className={styles["menu"]}>
            <li className={styles["menuItem"]} data-target="content-userinfo_Authentication">
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={`${styles["menuItem"]} ${styles["menuItemActive"]}`}>
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className={styles["submenu"]}>
                <li className={styles["submenuItemActive"]} data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className={styles["submenuItem"]} data-target="content-funding-refund">
                  <Link to="/MyFundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className={styles["menuItem"]} data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={styles["menuItem"]} data-target="content-logout">
              <LogoutButton/>
            </li>
          </ul>
        </div>

        <div className={pageStyles["content"]}>
          <p className={pageStyles["title"]}>후원 진행중</p>

          <div className={pageStyles["funding-list"]}>
            <div className={pageStyles["funding-card"]}>
              <a href="/SupportDetailread">
                <img
                  src="/static/img/극단 공연 어둠속의 빛.webp"
                  alt="프로젝트 이미지"
                />
              </a>
              <div className={pageStyles["funding-info"]}>
                <p className={pageStyles["date"]}>후원일 2025.05.05</p>
                <p className={pageStyles["title"]}>
                  여기가 어디인가요? &lt;기억상실&gt;
                </p>
                <p className={pageStyles["artist"]}>A세트(x1)</p>
                <p className={pageStyles["price"]}>12,000원</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyFundingSupport;
