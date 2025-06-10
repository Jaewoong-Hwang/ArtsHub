import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/question/QuestionList.module.css';
import sidebarStyles from '../../css/user/SidemenuUser.module.css';

const QuestionList = () => {
  return (
    <>
      <div id="header"></div>

      <div className={styles.mypage_section}>
        <div className={sidebarStyles.sidebar_menu}>
          <div className={sidebarStyles.profile}>
            <img
              src="/static/img/apple.png"
              alt="프로필 이미지"
              className={sidebarStyles["profile-img"]}
            />
            <p className={sidebarStyles.nickname}>닉네임</p>
          </div>

          <Link to="/FundingManage" className={sidebarStyles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={sidebarStyles.My_Arts}>My Arts</p>
          <ul className={sidebarStyles.menu}>
            <li className={sidebarStyles["menu-item"]} data-target="content-userinfo_Authentication">
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={sidebarStyles["menu-item"]}>
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className={sidebarStyles.submenu} style={{ display: 'none' }}>
                <li className="submenu-item" data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className="submenu-item" data-target="content-funding-refund">
                  <Link to="/MyFundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className={`${sidebarStyles["menu-item"]} ${sidebarStyles.active}`} data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={sidebarStyles["menu-item"]} data-target="content-logout">
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>문의</p>

          <div className={styles["question-list"]}>
            {/* 문의 항목 1 */}
            <div className={styles["question-card"]}>
              <div className={styles["question-info"]}>
                <p className={styles["question-title"]}>
                  <a href="/pages/buyer/question/read.html">아츠허브가 뭔가요?</a>
                </p>
                <p className={styles["question-date"]}>2025.05.05</p>
              </div>
              <p className={styles["question-status"]}>답변 완료</p>
            </div>

            {/* 문의 항목 2 */}
            <div className={styles["question-card"]}>
              <div className={styles["question-info"]}>
                <p className={styles["question-title"]}>
                  <a href="/pages/buyer/question/read.html">뭐냐구요 아츠허브</a>
                </p>
                <p className={styles["question-date"]}>2025.05.05</p>
              </div>
              <p className={styles["question-status"]}>답변 완료</p>
            </div>
          </div>

          <div className={styles["question-button"]}>
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
