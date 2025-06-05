import React from 'react';
import {Link} from 'react-router-dom';
import '../css/expert.css';
import '../css/sidemenu_expert.css';

const ProfitHistory = () => {
  // 추후 API 연동 가능
  const availableProfit = 0;
  const expectedProfit = 9950000;
  const withdrawnAmount = 100000;

  const handleWithdraw = () => {
    alert('출금 신청이 접수되었습니다.');
    // axios.post('/api/withdraw', { amount: availableProfit });
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

            <li className="menu-item">
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className="submenu">
                <li className="submenu-item active"><Link to="/ProjectManage">전체</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집중</Link></li>
                <li className="submenu-item"><Link to="/ProjectManage">모집 종료</Link></li>
                <li className="submenu-item"><Link to="/ProjectApplicationManage">참여요청</Link></li>
              </ul>
            </li>

            <li className="menu-item"><Link to="/Myprojectrequest">참가신청 프로젝트 관리</Link></li>
            <li className="menu-item active"><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className="menu-item"><Link to="/ExpertProfile">프로필</Link></li>
            <li className="menu-item">로그아웃</li>
          </ul>
        </div>

        {/* 본문 */}
        <div className="content">
          <p className="title">수익 관리</p>

          <div className="profit-box">
            <div className="profit-block-box">
              <div className="profit-block">
                <p className="label">출금 가능 수익금</p>
                <p className="value">{availableProfit.toLocaleString()}원</p>
              </div>
              <div className="profit-button-block">
                <button className="withdraw-button" onClick={handleWithdraw}>출금 신청</button>
              </div>
            </div>

            <div className="divider"></div>

            <div className="profit-block">
              <p className="label">예상 수익금</p>
              <p className="value">{expectedProfit.toLocaleString()}원</p>
            </div>

            <div className="divider"></div>

            <div className="profit-block">
              <p className="label">출금 금액</p>
              <p className="value">{withdrawnAmount.toLocaleString()}원</p>
            </div>
          </div>
        </div>

      </div>

      <div id="footer"></div>
    </>
  );
};

export default ProfitHistory;
