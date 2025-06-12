import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/styles/reset.css";
import styles from "../css/expert/FundingManage.module.css";
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css";
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { useAuth } from "../../../auth/context/AuthContext"; // ✅ 추가

const fundingList = [
  {
    id: "0000001",
    title: "여기가 어딘가요<기억상실>",
    goal: 1000000,
    supporters: 1,
    status: ["SELLING"],
  },
  {
    id: "0000002",
    title: "나는 누구인가<기억삭제>",
    goal: 2000000,
    supporters: 0,
    status: ["SAVE", "WAITING"],
  },
  {
    id: "0000003",
    title: "당신은 누구?<초면>",
    goal: 2000000,
    supporters: 0,
    status: ["END"],
  },
  {
    id: "0000004",
    title: "어떻게 가요?<길치>",
    goal: 3000000,
    supporters: 0,
    status: ["SAVE", "REJECTED"],
  },
];

const FundingManage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { user } = useAuth(); // ✅ 사용자 정보

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelect = (action, id) => {
    alert(`"${action}" 명령이 펀딩 ID #${id}에 적용됩니다.`);
    setOpenIndex(null);
  };

  const renderStatusButtons = (statusArray) => {
    const statusMap = {
      SELLING: "진행중",
      WAITING: "승인대기중",
      END: "펀딩종료",
      SAVE: "임시저장",
      REJECTED: "비승인",
    };
    return statusArray.map((status) => (
      <button key={status} className={`${styles["status-btn"]} ${styles[status]}`}>
        {statusMap[status]}
      </button>
    ));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles["edit-dropdown"]}`)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.mypage_section}>
        {/* Sidebar */}
        <div className={sidemenuStyles.sidebar_menu}>
          {/* ✅ 동적 프로필 */}
          <div className={sidemenuStyles.profile}>
            <img
              src={profileImageSrc}
              alt="프로필 이미지"
              className={sidemenuStyles["profile-img"]}
            />
            <p className={sidemenuStyles.nickname}>{user?.nickname || "닉네임"}</p>
          </div>

          <Link to="/UserInforead" className={sidemenuStyles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </Link>

          <p className={sidemenuStyles.My_Arts}>My Arts</p>
          <ul className={sidemenuStyles.menu}>
            <li className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}>
              <Link to="/FundingManage">펀딩관리</Link>
              <ul className={sidemenuStyles.submenu}>
                <li className={sidemenuStyles["submenu-item"]}><Link to="#">전체</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="#">진행중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="#">승인 대기중</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="#">펀딩 종료</Link></li>
                <li className={sidemenuStyles["submenu-item"]}><Link to="#">비승인</Link></li>
              </ul>
            </li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ProjectManage">프로젝트 관리</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/Myprojectrequest">내가 신청한 프로젝트</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ProfitHistory">수익 관리</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/ExpertProfile">프로필</Link></li>
            <li className={sidemenuStyles["menu-item"]}><Link to="/logout">로그아웃</Link></li>
          </ul>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.title}>펀딩 관리</p>

          <div className={styles["funding-item"]}>
            {fundingList.map((funding, index) => (
              <div className={styles["funding-card"]} key={funding.id}>
                <div className={styles["funding-thumbnail"]}>
                  <a href="#">
                    <img src="/static/img/마임의 세계.webp" alt="썸네일" />
                  </a>
                </div>

                <div className={styles["funding-info"]}>
                  <p className={styles["funding-id"]}>#{funding.id}</p>
                  <p className={styles["funding-title"]}>{funding.title}</p>
                  <p className={styles["funding-goal"]}>목표 : {funding.goal.toLocaleString()}</p>
                  <p className={styles["funding-supporter"]}>후원자수 : {funding.supporters}명</p>
                  <div className={styles.status}>{renderStatusButtons(funding.status)}</div>
                </div>

                <div className={styles["edit-dropdown"]}>
                  <button className={styles["edit-button"]} onClick={() => toggleDropdown(index)}>
                    서비스 편집
                  </button>
                  {openIndex === index && (
                    <ul className={styles["dropdown-menu"]}>
                      {funding.status.includes("SELLING") && (
                        <li onClick={() => handleSelect("펀딩 종료", funding.id)}>펀딩 종료</li>
                      )}
                      {funding.status.includes("SAVE") && (
                        <li onClick={() => handleSelect("펀딩 진행", funding.id)}>펀딩 진행</li>
                      )}
                      <li onClick={() => handleSelect("편집", funding.id)}>편집</li>
                      <li onClick={() => handleSelect("삭제", funding.id)}>삭제</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FundingManage;
