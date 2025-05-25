import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/assets/styles/reset.css';
import './projectmain.css';

const ProjectMain = () => {
  const navigate = useNavigate();

  // 로그인/전문가 여부 (실제로는 서버 또는 Context/Redux에서 받아야 함)
  const isLoggedIn = true;
  const isExpert = true;

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const howtoRef = useRef(null);
  const ctaRef = useRef(null);

  // ▶ CTA 버튼 클릭 핸들러
  const handleCreateClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate('/login');
    } else if (!isExpert) {
      alert("전문가 권한이 필요합니다.");
    } else {
      navigate('/create/info');
    }
  };

  const handleJoinClick = () => {
    navigate('/project/explore');
  };

  // ▶ 애니메이션 효과: 로딩 후 hero 섹션 등장
  useEffect(() => {
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('visible');
      }
    }, 800);
  }, []);

  // ▶ IntersectionObserver 적용
  useEffect(() => {
    const targets = [introRef.current, howtoRef.current, ctaRef.current];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    targets.forEach(target => target && observer.observe(target));

    return () => observer.disconnect(); // cleanup
  }, []);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="hero" ref={heroRef}>
        <div className="hero-text">
          <h1>
            힘들게 구한 팀원들,<br />
            함께 고생해서 오픈한 공연, <br />
            그에 못 미치는 결과,
          </h1>
          <p>
            두려움과 마감과 다른 결과가 기다릴까... 불안하신가요?<br />
            ArtsHub를 통해 해결하세요!
          </p>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="intro-section" ref={introRef}>
        <h2>ArtsHub project 란?</h2>
        <p>예술가들이 함께 모여 공연을 만들고, 팀을 구성하고, 펀딩을 시작하는 공간입니다.</p>

        <div className="feature-cards">
          {/* 카드 3개 구성 */}
          {[
            { src: '/static/img/몽환의 숲.webp', alt: '기획', text: '기획부터 전문가 팀 구성까지!' },
            { src: '/static/img/fund.jpg', alt: '펀딩', text: '펀딩을 통해 시장 반응 확인!' },
            { src: '/static/img/perform.jpg', alt: '공연', text: '공연까지 함께 연결!' },
          ].map((card, idx) => (
            <div className="feature-card" key={idx}>
              <div className="feature-image">
                <img src={card.src} alt={card.alt} />
              </div>
              <p><strong>{card.alt}</strong> {card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 참여 방법 설명 섹션 */}
      <section className="howto-section" ref={howtoRef}>
        <div className="how-box">
          <h3>체계적으로 모집글을 작성하고<br />전문가를 모집하세요</h3>
          <p>각 분야별 전문가와 함께 프로젝트를 구성할 수 있습니다.</p>
        </div>
        <div className="how-box">
          <h3>시장 반응을 확인하고<br />기획한 공연을 테스트하세요</h3>
          <p>예술을 위한 MVP를 만들고 반응을 미리 파악하세요.</p>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="cta" ref={ctaRef}>
        <h2>ArtsHub 서비스는 누구나 이용할 수 있습니다.</h2>
        <p>개인, 개인 사업자, 법인 사업자도 자유롭게 참여 가능합니다.</p>
        <div className="cta-buttons">
          <button className="btn blue" onClick={handleCreateClick}>
            프로젝트 만들기
          </button>
          <button className="btn outline" onClick={handleJoinClick}>
            프로젝트 참가하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectMain;