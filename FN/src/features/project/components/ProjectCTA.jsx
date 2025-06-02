import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/ProjectCTA.module.css";

const ProjectCTA = ({ isLoggedIn, isExpert }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else if (!isExpert) {
      alert("전문가 권한이 필요합니다.");
    } else {
      navigate("/project/create/info");
    }
  };

  const handleJoinClick = () => {
    navigate("/project/participate");
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.cta} ${isVisible ? styles.visible : ""}`}
    >
      <h2>ArtsHub 서비스는 누구나 이용할 수 있습니다.</h2>
      <p>개인, 개인 사업자, 법인 사업자도 자유롭게 참여 가능합니다.</p>

      <div className={styles.ctaButtons}>
        <button className={`${styles.btn} ${styles.blue}`} onClick={handleCreateClick}>
          프로젝트 만들기
        </button>
        <button className={`${styles.btn} ${styles.outline}`} onClick={handleJoinClick}>
          프로젝트 참가하기
        </button>
      </div>
    </section>
  );
};

export default ProjectCTA;
