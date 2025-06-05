import React from 'react';
import {Link} from 'react-router-dom';
import '../css/expert.css';
import '../css/sidemenu_expert.css';

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
    case 'APPROVED':
      return '수락됨';
    case 'REJECTED':
      return '거절됨';
    case 'WAITING':
      return '수락대기중';
    default:
      return '상태없음';
  }
};

const Myprojectrequest = () => {
  const handleAction = (action, title) => {
    alert(`"${title}" 프로젝트에서 "${action}" 버튼이 클릭되었습니다.`);
    // 실제 요청 처리는 이곳에서 API 호출로 수행
  };

  return (
    <>
      <div id="header"></div>

      <div className="mypage_section">
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

            <li className="menu-item">
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className="submenu">
                <li className="submenu-item"><Link to="/ProjectManage">전체</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집중</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집 종료</Link></li>
                <li className="submenu-item"><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>

            <li className="menu-item active">
              <Link to="/Myprojectrequest">내가 신청한 프로젝트</Link>
            </li>

            <li className="menu-item">
              <Link to="/ProfitHistory">수익 관리</Link>
            </li>

            <li className="menu-item">
              <Link to="/ExpertProfile">프로필</Link>
            </li>

            <li className="menu-item">로그아웃</li>
          </ul>
        </div>

        <div className="content">
          <p className="title">내가 신청한 프로젝트</p>

          <div className="projectrequest-item">
            {projects.map((project) => (
              <div className="projectrequest-card" key={project.id}>
                <div className="projectrequest-thumbnail">
                  <a href="javascript:void(0)">
                    <img src="/static/img/마임의 세계.webp" alt="썸네일" />
                  </a>
                </div>

                <div className="projectrequest-info">
                  <p className="projectrequest-title">{project.title}</p>
                  <p className="projectrequest-goal">모집인원 : {project.goal}명</p>
                  <p className="projectrequest-supporter">현재 멤버 : {project.current}명</p>
                  <div className="status">
                    <button className={`status-btn ${project.status}`}>
                      {getStatusLabel(project.status)}
                    </button>
                  </div>
                </div>

                <div className="edit-dropdown">
                  <button
                    className="edit-button"
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

      <div id="footer"></div>
    </>
  );
};

export default Myprojectrequest;
