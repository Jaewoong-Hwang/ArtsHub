import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../../../../assets/styles/reset.css'
import '../css/expert.css';
import '../css/sidemenu_expert.css';

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
    // 실제 동작은 여기서 axios.post() 등으로 처리
    setOpenDropdown(null);
  };

  return (
    <>
      <div id="header"></div>

      <div className="mypage_section">
        {/* 사이드바 */}
        <div className="sidebar_menu">
          <div className="profile">
            <img src="/static/img/apple.png" alt="프로필 이미지" className="profile-img" />
            <p className="nickname">닉네임</p>
          </div>

          <Link to="/UserInforead" className="change">
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className="My_Arts">My Arts</p>
          <ul className="menu">
            <li className="menu-item">
              <Link to="/FundingManage">펀딩관리</Link>
              <ul className="submenu" style={{ display: 'none' }}>
                <li className="submenu-item active"><Link to="/FundingManage">전체</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">진행중</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">승인 대기중</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">펀딩 종료</Link></li>
                <li className="submenu-item"><Link to="/FundingManage">비승인</Link></li>
              </ul>
            </li>
            <li className="menu-item active">
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className="submenu">
                <li className="submenu-item active"><Link to="/ProjectManage">전체</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집중</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집 종료</Link></li>
                <li className="submenu-item"><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>
            <li className="menu-item"><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className="menu-item"><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className="menu-item"><Link to="/ExpertProfile">프로필</Link></li>
            <li className="menu-item">로그아웃</li>
          </ul>
        </div>

        {/* 본문 */}
        <div className="content">
          <p className="title">프로젝트 관리</p>

          <div className="project-item">
            {projects.map((project, index) => (
              <div className="project-card" key={project.id}>
                <div className="project-thumbnail">
                  <a href="javascript:void(0)">
                    <img src="/static/img/마임의 세계.webp" alt="썸네일" />
                  </a>
                </div>

                <div className="project-info">
                  <p className="project-id">#{project.id}</p>
                  <p className="project-title">{project.title}</p>
                  <p className="project-goal">모집인원 : {project.goal}명</p>
                  <p className="project-supporter">현재 멤버 : {project.current}명</p>
                  <div className="status">
                    <button className={`status-btn ${project.status}`}>
                      {project.status === 'RECRUITING' ? '모집중' : '모집종료'}
                    </button>
                  </div>
                </div>

                <div className="edit-dropdown">
                  <button className="edit-button" onClick={() => toggleDropdown(index)}>
                    서비스 편집
                  </button>

                  {openDropdown === index && (
                    <ul className="dropdown-menu">
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
