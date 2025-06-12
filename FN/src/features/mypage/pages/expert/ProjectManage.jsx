import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../../assets/styles/reset.css';
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css"; 
import styles from '../css/expert/ProjectManage.module.css';
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { useAuth } from '../../../auth/context/AuthContext'; // ✅ 추가

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
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ 사용자 정보 가져오기

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSelect = (action, projectId) => {
    alert(`"${action}" 동작이 프로젝트 #${projectId}에 적용되었습니다.`);
    setOpenDropdown(null);
  };

  const handleConvertToUser = async () => {
    try {
      const res = await axios.put(
        "/api/mypage/convert-to-user",
        {},
        { withCredentials: true }
      );
      alert(res.data);
      navigate("/UserInforead");
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data || "서버 오류";
      alert("전환 실패: " + message);
    }
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

          <button className={sidemenuStyles.change} onClick={handleConvertToUser}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </button>

          <p className={sidemenuStyles.My_Arts}>My Arts</p>
          <ul className={sidemenuStyles.menu}>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/FundingManage">펀딩관리</Link>
            </li>
            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}>
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className={sidemenuStyles.submenu}>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">전체</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">모집중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectManage">모집 종료</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="/ProjectApplicationManage">참여요청</Link></li>
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

      <Footer />
    </>
  );
};

export default ProjectManage;
