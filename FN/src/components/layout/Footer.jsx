import React from "react";
import "../../assets/styles/reset.css"
import styles from "./css/Footer.module.css";
import { MdHelpOutline, MdKeyboardArrowRight, MdAndroid } from "react-icons/md";
import { FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 왼쪽: 고객센터 */}
        <div className={styles.leftSection}>
          <ul className={styles.serviceLinks}>
            <li className={styles.title}>
              <MdHelpOutline className={styles.icon} /> 아츠허브 고객센터
            </li>
            <li>
              <a href="#">채팅 상담하기</a>
              <MdKeyboardArrowRight className={styles.icon} />
            </li>
            <li>
              <a href="#">문의 등록하기</a>
              <MdKeyboardArrowRight className={styles.icon} />
            </li>
            <li>
              <a href="#">도움말 센터 바로가기</a>
              <MdKeyboardArrowRight className={styles.icon} />
            </li>
            <li>
              <a href="#">Contact for Global</a>
              <MdKeyboardArrowRight className={styles.icon} />
            </li>
          </ul>
          <div className={styles.timeBox}>
            <div className={styles.timeLabel}>상담 가능 시간</div>
            <div>평일 오전 9시 ~ 오후 6시 (주말, 공휴일 제외)</div>
          </div>
        </div>

        {/* 오른쪽: 회사정보 */}
        <div className={styles.rightSection}>
          <div className={styles.companyInfo}>
            <div>아츠허브 ㅣ 대표이사 황재웅 ㅣ 사업자등록번호 123-45-67890 ㅣ 통신판매업신고번호 2025-대구-1226</div>
            <div>대구광역시 중구 중앙대로 366 반월센트럴타워 9층 ㅣ 이메일 상담 info@artshub.com ㅣ 유선 상담 1234-5678</div>
            <div>© ArtsHub Co., Ltd.</div>
          </div>

          <div className={styles.disclaimer}>
            <p>
              일부 프로젝트의 경우 아츠허브는 통신판매중개자이며 통신판매 당사자가 아닙니다. 해당되는 공연의 경우 정보, 계약, 정산에 관한 책임은 창작자에게 있습니다.
            </p>
            <p>
              아츠허브 사이트 내의 공연 정보, 리뷰, UI, 콘텐츠 등에 대한 무단 복제, 전송, 배포, 크롤링, 스크래핑 등은 저작권법, 콘텐츠산업 진흥법 등에 의해 금지됩니다.
            </p>
            <p>
              <a href="#">콘텐츠산업 진흥법에 따른 표시</a>
            </p>
          </div>

          <div className={styles.appLinks}>
            <a href="#">
              <MdAndroid size={20} /> Android앱
            </a>
            <a href="#">
              <FaApple size={20} /> iOS앱
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;