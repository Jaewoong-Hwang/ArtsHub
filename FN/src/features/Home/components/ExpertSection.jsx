// src/components/ExpertSection.jsx
import React from "react";
import styles from "./css/expert.module.css";
const expertData = [
  {
    category: "무대 디자인",
    topExpert: {
      name: "StageCraft Studio",
      amount: 1950000000,
      img: "/static/assets/img/stageCraft.webp",
    },
    list: [
      { name: "무대의 정석", amount: 1200450000, img: "/static/assets/img/무대의 정석.webp" },
      { name: "Theater Vision", amount: 1045800000, img: "/static/assets/img/Theater Vision.webp" },
      { name: "Scenic Artworks", amount: 879230000, img: "/static/assets/img/Scenic Artworks.webp" },
      { name: "Lights & Shadows", amount: 754680000, img: "/static/assets/img/Lights & Shadows.webp" },
    ],
  },
  // 더 많은 카테고리는 이 배열에 추가 가능
];

const formatCurrency = (amount) => `${amount.toLocaleString()}원`;

const ExpertSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>이달의 전문가</h2>
      <a href="#" className={styles.totalView}>전체보기</a>

      <div className={styles.container}>
        {expertData.map((category, index) => (
          <div className={styles.categoryBox} key={index}>
            <div className={styles.topBox}>
              <div className={styles.categoryTitle}>{category.category}</div>
              <div className={styles.topExpert}>
                <div className={styles.expertInfo}>
                  <div className={styles.name}>🥇 {category.topExpert.name}</div>
                  <div className={styles.amount}>{formatCurrency(category.topExpert.amount)}</div>
                </div>
                <div
                  className={styles.profileImg}
                  style={{ backgroundImage: `url(${category.topExpert.img})` }}
                ></div>
              </div>
            </div>
            <div className={styles.list}>
              <ul>
                {category.list.map((item, i) => (
                  <li key={i}>
                    <div className={styles.expertInfo}>
                      <div className={styles.name}>🥈 {item.name}</div>
                      <div className={styles.amount}>{formatCurrency(item.amount)}</div>
                    </div>
                    <div
                      className={styles.profileImg}
                      style={{ backgroundImage: `url(${item.img})` }}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertSection;