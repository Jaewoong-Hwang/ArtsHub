import React from 'react';
import '../../../../assets/styles/reset.css';
import styles from '../css/expert/ExpertProfileDetail.module.css';
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css";  
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";

const ExpertProfileDetail = () => {
  const expert = {
    name: '김지성',
    introduction: '안녕하세요. 그냥 김지성입니다.',
    career: '경력없어요이에요.',
    field: '연기',
    portfolioItems: [1, 2, 3, 4],
  };

  return (
    <>
      <Header />

      <div className={styles.mypage_section}>
        <div className={styles["expert-profile-container"]}>
          {/* 프로필 상단 */}
          <div className={styles["profile-box"]}>
            <img
              src="/static/img/거리의_선율.webp"
              className={styles["profile-img"]}
              alt="프로필 이미지"
            />
            <p className={styles["profile-name"]}>{expert.name}</p>
          </div>

          {/* 전문가 상세 정보 */}
          <div className={styles["expert-info-box"]}>
            <div className={styles["expert-info-item"]}>
              <p className={styles["info-title"]}>전문가 정보</p>
              <p className={styles["info-content"]}>{expert.introduction}</p>
            </div>
            <div className={styles["expert-info-item"]}>
              <p className={styles["info-title"]}>경력 사항</p>
              <p className={styles["info-content"]}>{expert.career}</p>
            </div>
            <div className={styles["expert-info-item"]}>
              <p className={styles["info-title"]}>전문 분야</p>
              <p className={styles["info-content"]}>{expert.field}</p>
            </div>
          </div>

          {/* 포트폴리오 영역 */}
          <div className={styles["portfolio-box"]}>
            <div className={styles["portfolio-header"]}>
              <p>포트폴리오</p>
              <a href="#" className={styles["view-all"]}>전체보기</a>
            </div>
            <div className={styles["portfolio-content"]}>
              <p>참여한 프로젝트</p>
            </div>
            <div className={styles["portfolio-list"]}>
              {expert.portfolioItems.map((_, index) => (
                <div key={index} className={styles["portfolio-item"]}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ExpertProfileDetail;
