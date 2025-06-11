import React from "react";
import { Link } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import pageStyles from "../../css/user/my_profile/UserInforead.module.css";
import styles from "../../css/user/SidemenuUser.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";

function UserInforead() {
  return (
    <>
      <Header />

      <div className={pageStyles.mypage_section}>
        <div className={styles.sidebar_menu}>
          <div className={styles.profile}>
            <img
              src="/static/img/apple.png"
              alt="프로필 이미지"
              className={styles["profile-img"]}
            />
            <p className={styles.nickname}>닉네임</p>
          </div>

          <Link to="/FundingManage" className={styles.change}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={styles.My_Arts}>My Arts</p>
          <ul className={styles.menu}>
            <li
              className={`${styles["menu-item"]} ${styles.active}`}
              data-target="content-userinfo_Authentication"
            >
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={styles["menu-item"]}>
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className={styles.submenu} style={{ display: "none" }}>
                <li className="submenu-item" data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className="submenu-item" data-target="content-funding-refund">
                  <Link to="/MyfundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className={styles["menu-item"]} data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={styles["menu-item"]} data-target="content-logout">
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={pageStyles.content}>
          <p className={pageStyles.title}>내정보</p>

          <div className={pageStyles.content_item}>
            <form id="userinfo" action="./UserInfoupdate.jsx" method="get">
              <div className={pageStyles.profile_img}>
                <div className={pageStyles.profile_img_show}>
                  <img src="/static/img/apple.png" alt="profile-img" />
                </div>
                <button type="submit" hidden>
                  프로필 변경
                </button>
              </div>

              <div className={pageStyles.info_list}>
                <label htmlFor="nickname">닉네임</label>
                <br />
                <input type="text" id="nickname" disabled />
                <br />

                <label htmlFor="email">이메일</label>
                <br />
                <input type="text" id="email" disabled />
                <br />

                <label htmlFor="phone">연락처</label>
                <br />
                <input type="text" id="phone" disabled />
                <br />

                <label htmlFor="address">주소</label>
                <br />
                <input type="text" id="address" disabled />
                <br />

                <label>관심분야</label>
                <br />
                <div className={pageStyles.interast}>
                  {[...Array(4)].map((_, i) => (
                    <select className={pageStyles.read} key={i} disabled>
                      <option value="선택">선택</option>
                      <option value="클래식">클래식</option>
                      <option value="연극">연극</option>
                      <option value="국악">국악</option>
                      <option value="밴드">밴드</option>
                    </select>
                  ))}
                </div>

                <div className={pageStyles.okbutton}>
                  <button type="button">수정</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserInforead;
