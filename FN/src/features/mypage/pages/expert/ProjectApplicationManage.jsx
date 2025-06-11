import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ProjectApplicationManage.module.css';
import side from '../css/expert/SidemenuExpert.module.css';

const ProjectApplicationManage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <div id="header"></div>

      <div className={styles.mypage_section}>
        <div className={side.sidebar_menu}>
          <div className={side.profile}>
            <img src="/static/img/apple.png" alt="프로필 이미지" className={side['profile-img']} />
            <p className={side.nickname}>닉네임</p>
          </div>

          <Link to="/UserInforead" className={side.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className={side.My_Arts}>My Arts</p>
          <ul className={side.menu}>
            <li className={side.menu_item}>
              <Link to="/FundingManage">펀딩관리</Link>
              <ul className={side.submenu} style={{ display: 'none' }}>
                <li className={side.submenu_item}><Link to="/FundingManage">전체</Link></li>
                <li className={side.submenu_item}><Link to="/FundingManage">진행중</Link></li>
                <li className={side.submenu_item}><Link to="/FundingManage">승인 대기중</Link></li>
                <li className={side.submenu_item}><Link to="/FundingManage">펀딩 종료</Link></li>
                <li className={side.submenu_item}><Link to="/FundingManage">비승인</Link></li>
              </ul>
            </li>

            <li className={`${side.menu_item} ${side.active}`}>
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className={side.submenu}>
                <li className={side.submenu_item}><Link to="/ProjectManage">전체</Link></li>
                <li className={side.submenu_item}><Link to="/ProjectManage">모집중</Link></li>
                <li className={side.submenu_item}><Link to="/ProjectManage">모집 종료</Link></li>
                <li className={`${side.submenu_item} ${side.active}`}><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>

            <li className={side.menu_item}><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className={side.menu_item}><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className={side.menu_item}><Link to="/ExpertProfile">프로필</Link></li>
            <li className={side.menu_item}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>프로젝트 관리</p>

          <div className={styles['projectapplication-list']}>
            <div className={styles['projectapplication-card']}>
              <div className={styles['projectapplication-info']}>
                <a href="/pages/seller/seller-profile-detail.html">
                  <p className={styles['projectapplication-title']}>김지성</p>
                </a>
                <p className={styles['projectapplication-date']}>신청 날짜 : 2025.05.05</p>
              </div>

              <div className={styles['edit-dropdown']}>
                <button className={styles['edit-button']} onClick={toggleDropdown}>
                  승인/거절
                </button>

                {dropdownOpen && (
                  <ul className={styles['dropdown-menu']}>
                    <li onClick={() => handleSelect('approve')}>승인</li>
                    <li onClick={() => handleSelect('reject')}>거절</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default ProjectApplicationManage;
