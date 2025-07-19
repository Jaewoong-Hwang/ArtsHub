import React from "react";
import { Link } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import styles from "../../css/user/order/SupportDetailupdate.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";
import { useNavigate } from "react-router-dom";


const SupportDetailread = () => {
  const navigate = useNavigate();

  const handleInquiryClick = () => {
    navigate("/ExpertProfileDetail");
  };
  return (
    <>
      <Header />

      <div className={styles["order-detail-content"]}>
        {/* 프로젝트 정보 카드 */}
        <div className={styles["order-detail-card"]}>
          <img src="/static/img/빛과 그림자.webp" alt="썸네일" />
          <div className={styles["order-detail-info"]}>
            <p className={styles["order-sellerinfo"]}>연극 | 아츠대장</p>
            <p className={styles["order-project-title"]}>
              여기가 어디인가요? &lt;기억상실&gt;
            </p>
            <p className={styles["order-status"]}>펀딩 진행중</p>
          </div>
          <button className={styles["order-small-button"]}onClick={handleInquiryClick}>창작자 문의</button>
        </div>

        {/* 후원 정보 */}
        <div className={styles["order-detail-box"]}>
          <p className={styles["order-section-title"]}>후원 정보</p>
          <ul className={styles["order-detail-list"]}>
            <li>
              <span>프로젝트 상태</span>
              <span style={{ color: "#F86453" }}>펀딩 진행중</span>
            </li>
            <li>
              <span>후원 상태</span>
              <span>후원 취소</span>
            </li>
            <li>
              <span>후원 번호</span>
              <span>0000001</span>
            </li>
            <li>
              <span>후원 일자</span>
              <span>2025.05.05</span>
            </li>
            <li>
              <span>후원 마감</span>
              <span>2025.05.15</span>
            </li>
          </ul>
          <button className={styles["order-small-button"]} hidden>
            후원 취소
          </button>
        </div>

        {/* 선물 정보 */}
        <div className={styles["order-detail-box"]}>
          <p className={styles["order-section-title"]}>선물 정보</p>
          <ul className={styles["order-detail-list"]}>
            <li>
              <span>선물 구성</span>
              <span>
                A세트 (x1)
                <br />
                - 티켓 + 키링 (x1)
                <br />
                &nbsp;&nbsp;&nbsp;옵션 : 21일 19시 00분
              </span>
            </li>
            <li>
              <span>선물 금액</span>
              <span>12,000원</span>
            </li>
          </ul>
          <button className={styles["order-small-button"]} hidden>
            변경
          </button>
        </div>

        {/* 추가 후원 정보 */}
        <div className={styles["order-detail-box"]}>
          <p className={styles["order-section-title"]}>추가 후원 정보</p>
          <ul className={styles["order-detail-list"]}>
            <li>
              <span>추가 후원금</span>
              <span>100원</span>
            </li>
          </ul>
          <button className={styles["order-small-button"]} hidden>
            변경
          </button>
        </div>

        {/* 결제 정보 */}
        <div className={styles["order-detail-box"]}>
          <p className={styles["order-section-title"]}>결제 정보</p>
          <ul className={styles["order-detail-list"]}>
            <li>
              <span>결제 수단</span>
              <span>네이버페이</span>
            </li>
            <li>
              <span>결제 금액</span>
              <span>12,100원</span>
            </li>
            <li>
              <span>결제 상태</span>
              <span>2025.05.16 결제 예약 취소</span>
            </li>
          </ul>
          <button className={styles["order-small-button"]} hidden>
            변경
          </button>
        </div>

        {/* 목록 보기 버튼 */}
        <div className={styles["order-detail-button"]}>
          <button onClick={() => (window.location.href = "./MyFundingSupport")}>
            목록 보기
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SupportDetailread;
