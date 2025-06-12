// src/pages/grants/components/GrantCard.jsx
import React from "react";
import styles from "../pages/css/grants.module.css";

const badgeColorMap = {
  // 🎨 예술 카테고리
  아트누리: "badgePurple",
  시각: "badgeLightBlue",     // 기존 Blue → 경상권과 충돌 방지
  무용: "badgePink",
  창작: "badgeDeepIndigo",    // 기존 Indigo → 강원권과 구분
  문학: "badgeRose",
  문화일반: "badgeCyan",
  뮤지컬: "badgeYellow",
  연극: "badgeAmber",         // 기존 Orange → 충청권과 구분
  음악: "badgeEmerald",       // 기존 Green → 지역과 명확히 구분
  전통: "badgeBrown",
  시: "badgeSky",
  전체: "badgeDarkGray",

  // 🏢 중앙기관
  한국문화예술위원회: "badgeGray",
  공연예술센터: "badgeMint",           // 기존 Teal → 전라권과 구분
  한국문화예술회관연합회: "badgeGray",
  한국장애인문화예술원: "badgeGray",
  한국정신문화재단: "badgeGray",

  // 🏠 지역 문화재단: 수도권 (DarkGreen)
  서울문화재단: "badgeDarkGreen",
  성남문화재단: "badgeDarkGreen",
  안산문화재단: "badgeDarkGreen",
  양평문화재단: "badgeDarkGreen",
  오산문화재단: "badgeDarkGreen",
  용인문화재단: "badgeDarkGreen",
  화성시문화재단: "badgeDarkGreen",
  인천문화재단: "badgeDarkGreen",
  인천서구문화재단: "badgeDarkGreen",
  남동문화재단: "badgeDarkGreen",
  동대문문화재단: "badgeDarkGreen",
  마포문화재단: "badgeDarkGreen",
  중랑문화재단: "badgeDarkGreen",
  평택시문화재단: "badgeDarkGreen",

  // 충청권 (badgeOrange 유지)
  당진문화재단: "badgeOrange",
  세종시문화관광재단: "badgeOrange",
  천안문화재단: "badgeOrange",
  충남문화관광재단: "badgeOrange",
  충북문화재단: "badgeOrange",
  충주문화관광재단: "badgeOrange",

  // 경상권 (badgeBlue 유지)
  울주문화재단: "badgeBlue",
  창원문화재단: "badgeBlue",
  밀양문화관광재단: "badgeBlue",

  // 전라권 (badgeTeal 유지)
  전북문화관광재단: "badgeTeal",

  // 강원권
  원주문화재단: "badgeIndigo",  // DeepIndigo와 혼동 없음

  // 기타
  대전문화재단: "badgeLightGray",
  수성문화재단: "badgeLightGray",
  의정부문화재단: "badgeLightGray",
};



const getBadgeClass = (badgeName) => {
  return badgeColorMap[badgeName] || "badgeDefault";
};

const GrantCard = ({ grant }) => {
  return (
    <a
      href={grant.detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLinkWrapper}
    >
      <div className={styles.grantCard}>
        <div className={styles.grantTitle}>{grant.title}</div>
        <div className={styles.grantPeriod}>{grant.period}</div>

        {grant.badges && grant.badges.length > 0 && (
          <div className={styles.badgeList}>
            {grant.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`${styles.badge} ${styles[getBadgeClass(badge)]}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default GrantCard;
