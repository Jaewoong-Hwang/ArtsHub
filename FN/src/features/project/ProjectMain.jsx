import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./projectMain.module.css"; // ✅ CSS Module 적용
import "../../../src/assets/styles/reset.css";
import ProjectCTA from "./components/ProjectCTA";

const ProjectMain = () => {
  const navigate = useNavigate();

  const isLoggedIn = true;
  const isExpert = true;

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const howtoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add(styles.visible);
      }
    }, 800);
  }, []);

  useEffect(() => {
    const targets = [introRef.current, howtoRef.current, ctaRef.current];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    targets.forEach((target) => target && observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroText}>
          <h1>
            힘들게 구한 팀원들,
            <br />
            함께 고생해서 오픈한 공연, <br />
            그에 못 미치는 결과,
          </h1>
          <p>
            두려움과 마감과 다른 결과가 기다릴까... 불안하신가요?
            <br />
            ArtsHub를 통해 해결하세요!
          </p>
        </div>
      </section>

      <section className={styles.introSection} ref={introRef}>
        <h2>ArtsHub project 란?</h2>
        <p>
          예술가들이 함께 모여 공연을 만들고, 팀을 구성하고, 펀딩을 시작하는 공간입니다.
        </p>

        <div className={styles.featureCards}>
          {[
            {
              src: "/static/img/몽환의 숲.webp",
              alt: "기획",
              text: "기획부터 전문가 팀 구성까지!",
            },
            {
              src: "/static/img/fund.jpg",
              alt: "펀딩",
              text: "펀딩을 통해 시장 반응 확인!",
            },
            {
              src: "/static/img/perform.jpg",
              alt: "공연",
              text: "공연까지 함께 연결!",
            },
          ].map((card, idx) => (
            <div className={styles.featureCard} key={idx}>
              <div className={styles.featureImage}>
                <img src={card.src} alt={card.alt} />
              </div>
              <p>
                <strong>{card.alt}</strong> {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.howtoSection} ref={howtoRef}>
        <div className={styles.howBox}>
          <h3>
            체계적으로 모집글을 작성하고
            <br />
            전문가를 모집하세요
          </h3>
          <p>각 분야별 전문가와 함께 프로젝트를 구성할 수 있습니다.</p>
        </div>
        <div className={styles.howBox}>
          <h3>
            시장 반응을 확인하고
            <br />
            기획한 공연을 테스트하세요
          </h3>
          <p>예술을 위한 MVP를 만들고 반응을 미리 파악하세요.</p>
        </div>
      </section>

      <div ref={ctaRef}>
        <ProjectCTA isLoggedIn={isLoggedIn} isExpert={isExpert} />
      </div>
    </div>
  );
};

export default ProjectMain;
