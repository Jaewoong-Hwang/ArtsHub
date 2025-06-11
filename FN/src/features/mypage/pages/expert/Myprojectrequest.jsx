import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/Myprojectrequest.module.css';
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css"; 
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";

const projects = [
  {
    id: '0001',
    title: '여기가 어딘가요<기억상실>',
    goal: 20,
    current: 5,
    status: 'APPROVED',
    action: '탈퇴하기',
  },
  {
    id: '0002',
    title: '나는 누구인가<기억삭제>',
    goal: 10,
    current: 10,
    status: 'REJECTED',
    action: '삭제하기',
  },
  {
    id: '0003',
    title: '너는 누구세요<상실>',
    goal: 20,
    current: 5,
    status: 'WAITING',
    action: '신청취소',
  },
];

const getStatusLabel = (status) => {
  switch (status) {
    case 'APPROVED': return '수락됨';
    case 'REJECTED': return '거절됨';
    case 'WAITING': return '수락대기중';
    default: return '상태없음';
  }
};

const Myprojectrequest = () => {
  const handleAction = (action, title) => {
    alert(`"${title}" 프로젝트에서 "${action}" 버튼이 클릭되었습니다.`);
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
            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}>
              <Link to="/Myprojectrequest">내가 신청한 프로젝트</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ProfitHistory">수익 관리</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ExpertProfile">프로필</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>내가 신청한 프로젝트</p>

          <div className={styles["projectrequest-item"]}>
            {projects.map((project) => (
              <div className={styles["projectrequest-card"]} key={project.id}>
                <div className={styles["projectrequest-thumbnail"]}>
                  <a href="javascript:void(0)">
                    <img src="/static/img/마임의 세계.webp" alt="썸네일" />
                  </a>
                </div>

                <div className={styles["projectrequest-info"]}>
                  <p className={styles["projectrequest-title"]}>{project.title}</p>
                  <p className={styles["projectrequest-goal"]}>모집인원 : {project.goal}명</p>
                  <p className={styles["projectrequest-supporter"]}>현재 멤버 : {project.current}명</p>
                  <div className={styles.status}>
                    <button className={`${styles["status-btn"]} ${styles[project.status]}`}>
                      {getStatusLabel(project.status)}
                    </button>
                  </div>
                </div>

                <div className={styles["edit-dropdown"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleAction(project.action, project.title)}
                  >
                    {project.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Myprojectrequest;
