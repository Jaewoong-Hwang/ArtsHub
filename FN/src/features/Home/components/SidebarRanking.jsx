// src/features/home/components/SidebarRanking.jsx
import React, { useEffect, useState } from "react";
import styles from "./css/sidebar.module.css";

// 예시 데이터 (실제에서는 API로 대체)
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
  },
  {
    title: "3. [한정 이벤트] 무용극: 시간을 넘어",
    description: "시간을 넘나드는 춤과 이야기!",
    fundingInfo: "펀딩 6,020% 달성 | D-3",
    image: "/static/assets/img/무용극 시간을 넘어.webp",
  },
  {
    title: "4. [전석 매진 예상] 연극: 어둠 속의 빛",
    description: "어둠 속에서 빛을 찾는 여정, 극단의 새로운 도전!",
    fundingInfo: "펀딩 4,300% 달성 | D-33",
    image: "/static/assets/img/극단 공연 어둠속의 빛.webp",
  },
  {
    title: "5. [급부상 공연] 고전극: 한 여름밤의 꿈",
    description: "이 세상과 다른 세계의 경계에서 펼쳐지는 사랑과 마법!",
    fundingInfo: "펀딩 4,200% 달성 | D-13",
    image: "/static/assets/img/뮤지컬 사랑의 꽃.webp",
  },
];

const SidebarRanking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // 추후: 실시간 fetch 또는 WebSocket 사용
    setRankings(dummyRanking);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>펀딩 실시간 랭킹</h3>
      <ul className={styles.list}>
        {rankings.map((item, index) => (
          <li className={styles.item} key={index}>
            <div className={styles.textContent}>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
              <div className={styles.fundingInfo}>{item.fundingInfo}</div>
            </div>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarRanking;