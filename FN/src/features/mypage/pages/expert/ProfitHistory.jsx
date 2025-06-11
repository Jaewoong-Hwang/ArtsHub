import React from 'react'; 
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ProfitHistory.module.css';
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css";  
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";

const ProfitHistory = () => {
  const availableProfit = 0;
  const expectedProfit = 9950000;
  const withdrawnAmount = 100000;

  const handleWithdraw = () => {
    alert('출금 신청이 접수되었습니다.');
  };

  return (
    <>
      <Header />

      <div className={styles.mypage_section}>
        <div className={sidemenuStyles.sidebar_menu}>
          <div className={sidemenuStyles.profile}>
            <img src="/static/img/apple.png" alt="프로필 이미지" className={sidemenuStyles["profile-img"]} />
            <p className={sidemenuStyles.nickname}>닉네임</p>
          </div>

          <Link to="/UserInforead" className={sidemenuStyles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className={sidemenuStyles.My_Arts}>My Arts</p>
          <ul className={sidemenuStyles.menu}>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/FundingManage">펀딩관리</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ProjectManage">프로젝트 관리</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/Myprojectrequest">참가신청 프로젝트 관리</Link>
            </li>
            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}>
              <Link to="/ProfitHistory">수익 관리</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ExpertProfile">프로필</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>수익 관리</p>

          <div className={styles.profitBox}>
            <div className={styles.profitBlockBox}>
              <div className={styles.profitBlock}>
                <p className={styles.label}>출금 가능 수익금</p>
                <p className={styles.value}>{availableProfit.toLocaleString()}원</p>
              </div>
              <div className={styles.profitButtonBlock}>
                <button className={styles.withdrawButton} onClick={handleWithdraw}>출금 신청</button>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.profitBlock}>
              <p className={styles.label}>예상 수익금</p>
              <p className={styles.value}>{expectedProfit.toLocaleString()}원</p>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.profitBlock}>
              <p className={styles.label}>출금 금액</p>
              <p className={styles.value}>{withdrawnAmount.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfitHistory;
