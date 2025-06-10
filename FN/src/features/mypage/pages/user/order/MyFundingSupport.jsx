import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/SidemenuUser.module.css';
import pageStyles from '../../css/user/order/MyFundingSupport.module.css';

const MyFundingSupport = () => {
  return (
    <>
      <div id="header"></div>

      <div className={pageStyles.mypage_section}>
        <div className={styles.sidebar_menu}>
          <div className={styles.profile}>
            <img
              src="/static/img/apple.png"
              alt="프로필 이미지"
              className={styles["profile-img"]}
            />
            <p className={styles.nickname}>닉네임</p>
          </div>

          <Link to="/FundingManage" className={styles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={styles.My_Arts}>My Arts</p>
          <ul className={styles.menu}>
            <li className={styles["menu-item"]} data-target="content-userinfo_Authentication">
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={`${styles["menu-item"]} ${styles.active}`}>
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className={styles.submenu}>
                <li className="submenu-item active" data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className="submenu-item" data-target="content-funding-refund">
                  <Link to="/MyFundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className={styles["menu-item"]} data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={styles["menu-item"]} data-target="content-logout">
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={pageStyles.content}>
          <p className={pageStyles.title}>후원 진행중</p>

          <div className={pageStyles["funding-list"]}>
            <div className={pageStyles["funding-card"]}>
              <a href="/SupportDetailupdate">
                <img
                  src="/static/img/극단 공연 어둠속의 빛.webp"
                  alt="프로젝트 이미지"
                />
              </a>
              <div className={pageStyles["funding-info"]}>
                <p className={pageStyles.date}>후원일 2025.05.05</p>
                <p className={pageStyles.title}>
                  여기가 어디인가요? &lt;기억상실&gt;
                </p>
                <p className={pageStyles.artist}>A세트(x1)</p>
                <p className={pageStyles.price}>12,000원</p>
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
