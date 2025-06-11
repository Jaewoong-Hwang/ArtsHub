import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ProjectManage.module.css'; // 모듈 스타일 import

const projects = [
  {
    id: '0000001',
    title: '여기가 어딘가요<기억상실>',
    goal: 20,
    current: 5,
    status: 'RECRUITING',
  },
  {
    id: '0000002',
    title: '나는 누구인가<기억삭제>',
    goal: 10,
    current: 10,
    status: 'RECRUIT_PENDING',
  },
];

const ProjectManage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSelect = (action, projectId) => {
    alert(`"${action}" 동작이 프로젝트 #${projectId}에 적용되었습니다.`);
    setOpenDropdown(null);
  };

  return (
    <>
      <div id="header"></div>

      <div className={styles.mypage_section}>
        <div className={styles.sidebar_menu}>
          <div className={styles.profile}>
            <img src="/static/img/apple.png" alt="프로필 이미지" className={styles.profileImg} />
            <p className={styles.nickname}>닉네임</p>
          </div>

          <Link to="/UserInforead" className={styles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className={styles.My_Arts}>My Arts</p>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/FundingManage">펀딩관리</Link>
            </li>
            <li className={`${styles.menuItem} ${styles.active}`}>
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}><Link to="/ProjectManage">전체</Link></li>
                <li className={styles.submenuItem}><Link to="/ProjectManage">모집중</Link></li>
                <li className={styles.submenuItem}><Link to="/ProjectManage">모집 종료</Link></li>
                <li className={styles.submenuItem}><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>
            <li className={styles.menuItem}><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className={styles.menuItem}><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className={styles.menuItem}><Link to="/ExpertProfile">프로필</Link></li>
            <li className={styles.menuItem}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>프로젝트 관리</p>

          <div className={styles.projectItem}>
            {projects.map((project, index) => (
              <div className={styles.projectCard} key={project.id}>
                <div className={styles.projectThumbnail}>
                  <a href="#">
                    <img src="/static/img/마임의 세계.webp" alt="썸네일" />
                  </a>
                </div>

                <div className={styles.projectInfo}>
                  <p className={styles.projectId}>#{project.id}</p>
                  <p className={styles.projectTitle}>{project.title}</p>
                  <p className={styles.projectGoal}>모집인원 : {project.goal}명</p>
                  <p className={styles.projectSupporter}>현재 멤버 : {project.current}명</p>
                  <div className={styles.status}>
                    <button className={`${styles.statusBtn} ${styles[project.status]}`}>
                      {project.status === 'RECRUITING' ? '모집중' : '모집종료'}
                    </button>
                  </div>
                </div>

                <div className={styles.editDropdown}>
                  <button className={styles.editButton} onClick={() => toggleDropdown(index)}>
                    서비스 편집
                  </button>

                  {openDropdown === index && (
                    <ul className={styles.dropdownMenu}>
                      {project.status === 'RECRUITING' ? (
                        <li onClick={() => handleSelect('end', project.id)}>모집 종료</li>
                      ) : (
                        <li onClick={() => handleSelect('start', project.id)}>모집 진행</li>
                      )}
                      <li onClick={() => handleSelect('edit', project.id)}>편집</li>
                      <li onClick={() => handleSelect('delete', project.id)}>삭제</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default ProjectManage;
