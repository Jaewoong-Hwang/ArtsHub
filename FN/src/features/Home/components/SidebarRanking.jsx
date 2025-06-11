// src/features/home/components/SidebarRanking.jsx
import React, { useEffect, useState } from "react";
import styles from "./css/sidebar.module.css";

// 🎯 예시 데이터 (하드코딩)
const dummyRanking = [
  {
    title: "1. [완판 임박] 발레: 백조의 호수",
    description: "신비로운 백조의 춤, 물 위에서 펼쳐지는 전설!",
    fundingInfo: "펀딩 7,020% 달성 | D-4",
    image: "/static/assets/img/백조의 호수.webp",
    link: "/pages/funding/백조의호수.html",
  },
  {
    title: "2. [최초 공개] 음악극: 사랑의 교차로",
    description: "운명적인 만남, 사랑과 갈등을 음악으로 풀어내다!",
    fundingInfo: "펀딩 6,100% 달성 | D-16",
    image: "/static/assets/img/음악극 사랑의 교차로.webp",
    link: "#",
  },
  {
    title: "3. [한정 이벤트] 무용극: 시간을 넘어",
    description: "시간을 넘나드는 춤과 이야기!",
    fundingInfo: "펀딩 6,020% 달성 | D-3",
    image: "/static/assets/img/무용극 시간을 넘어.webp",
    link: "#",
  },
  {
    title: "4. [전석 매진 예상] 연극: 어둠 속의 빛",
    description: "어둠 속에서 빛을 찾는 여정, 극단의 새로운 도전!",
    fundingInfo: "펀딩 4,300% 달성 | D-33",
    image: "/static/assets/img/극단 공연 어둠속의 빛.webp",
    link: "#",
  },
  {
    title: "5. [급부상 공연] 고전극: 한 여름밤의 꿈",
    description: "이 세상과 다른 세계의 경계에서 펼쳐지는 사랑과 마법!",
    fundingInfo: "펀딩 4,200% 달성 | D-13",
    image: "/static/assets/img/뮤지컬 사랑의 꽃.webp",
    link: "#",
  },
];

const SidebarRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setRankings(dummyRanking);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>펀딩 실시간 랭킹</h3>

      {loading ? (
        <>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className={styles.skeletonCard}></div>
          ))}
        </>
      ) : (
        <ul className={styles.list}>
          {rankings.map((item, index) => (
            <li className={`${styles.item} ${styles.fadeIn}`} key={index}>
              <div className={styles.textContent}>
                <a href={item.link} className={styles.itemTitle}>
                  {item.title}
                </a>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.fundingInfo}>{item.fundingInfo}</div>
              </div>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default SidebarRanking;