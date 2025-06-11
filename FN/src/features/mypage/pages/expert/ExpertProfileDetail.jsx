import React from 'react';
import {Link} from 'react-router-dom';
import '../css/expert.css';
import '../css/sidemenu_expert.css';

const ExpertProfileDetail = () => {
  // 추후 서버에서 받아오는 데이터로 대체 가능
  const expert = {
    name: '김지성',
    introduction: '안녕하세요. 그냥 김지성입니다.',
    career: '경력없어요이에요.',
    field: '연기',
    portfolioItems: [1, 2, 3, 4], // 포트폴리오 개수만 예시로
  };

  return (
    <>
      <div id="header"></div>

      <div className="mypage_section">
        <div className="expert-profile-container">
          {/* 프로필 상단 */}
          <div className="profile-box">
            <img
              src="/static/img/거리의_선율.webp"
              className="profile-img"
              alt="프로필 이미지"
            />
            <p className="profile-name">{expert.name}</p>
          </div>

          {/* 전문가 상세 정보 */}
          <div className="expert-info-box">
            <div className="expert-info-item">
              <p className="info-title">전문가 정보</p>
              <p className="info-content">{expert.introduction}</p>
            </div>
            <div className="expert-info-item">
              <p className="info-title">경력 사항</p>
              <p className="info-content">{expert.career}</p>
            </div>
            <div className="expert-info-item">
              <p className="info-title">전문 분야</p>
              <p className="info-content">{expert.field}</p>
            </div>
          </div>

          {/* 포트폴리오 영역 */}
          <div className="portfolio-box">
            <div className="portfolio-header">
              <p>포트폴리오</p>
              <a href="#" className="view-all">전체보기</a>
            </div>
            <div className="portfolio-content">
              <p>참여한 프로젝트</p>
            </div>
            <div className="portfolio-list">
              {expert.portfolioItems.map((_, index) => (
                <div key={index} className="portfolio-item"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default ExpertProfileDetail;
