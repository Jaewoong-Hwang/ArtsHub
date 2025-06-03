// src/features/home/components/RecommendedProjects.jsx
import React, { useEffect, useState } from "react";
import styles from "./css/recommend.module.css";

// 더미 추천 데이터 (실제 프로젝트에서는 props나 API로 교체)
const allProjects = [
  {
    title: "마임의 세계",
    description: "대사 없이도 마음을 전할 수 있다면, 그 순간이 예술이 된다.",
    image: "/static/assets/img/마임의 세계.webp",
    status: "모집중",
  },
  {
    title: "브라스 파라다이스",
    description: "금관악기가 울릴 때, 그 순간이 가장 뜨거운 시간!",
    image: "/static/assets/img/브라스 파라다이스.webp",
    status: "모집중",
  },
  {
    title: "소울의 울림",
    description: "마음 깊숙이 울리는 목소리, 소울의 진짜 울림을 느껴라.",
    image: "/static/assets/img/소울의 울림.webp",
    status: "모집중",
  },
  {
    title: "레트로 나이트",
    description: "반짝이는 불빛 아래, 우리 모두 80년대로 타임슬립!",
    image: "/static/assets/img/레트로 나이트.webp",
    status: "모집중",
  },
  {
    title: "빛과 그림자",
    description: "빛이 있기에 그림자가 존재하고, 그림자가 있기에 빛은 더욱 빛난다.",
    image: "/static/assets/img/빛과 그림자.webp",
    status: "모집중",
  },
  {
    title: "환상의 오페라",
    description: "비극과 희극이 교차하는 순간, 환상이 현실이 된다.",
    image: "/static/assets/img/환상의 오페라.webp",
    status: "모집중",
  },
];

const RecommendedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 추후: 사용자 선호 장르 기반 필터링
    const shuffled = [...allProjects].sort(() => 0.5 - Math.random());
    setProjects(shuffled.slice(0, 6)); // 랜덤 6개만
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>취향 맞춤 프로젝트</h2>
      <p className={styles.subtitle}>지금 함께 만드는 성공</p>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div className={styles.card} key={index}>
            <img src={project.image} alt={project.title} className={styles.image} />
            <div className={styles.content}>
              <div className={styles.name}>{project.title}</div>
              <div className={styles.desc}>{project.description}</div>
              <p className={styles.status}>{project.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProjects;