import React from "react";
import { Link } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import Styles from "../../css/user/my_profile/UserInforead.module.css";
import sidemenuStyles from "../../css/user/SidemenuUser.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";

function UserInforead() {
  return (
    <>
      <Header />

      <div className={Styles["mypage_section"]}>
        <div className={sidemenuStyles["sidebarMenu"]}>
          <div className={sidemenuStyles["profile"]}>
            <img
              src="/static/img/apple.png"
              alt="프로필 이미지"
              className={sidemenuStyles["profileImg"]}
            />
            <p className={sidemenuStyles["nickname"]}>닉네임</p>
          </div>

          <Link to="/FundingManage" className={sidemenuStyles["change"]}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={sidemenuStyles["myArts"]}>My Arts</p>
          <ul className={sidemenuStyles["menu"]}>
            <li
              className={`${sidemenuStyles["menuItem"]} ${sidemenuStyles["menuItemActive"]}`}
              data-target="content-userinfo_Authentication"
            >
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={sidemenuStyles["menuItem"]}>
              <Link to="/MyFundingSupport">후원 관리</Link>
              <ul className={sidemenuStyles["submenu"]} style={{ display: "none" }}>
                <li className={sidemenuStyles["submenuItem"]} data-target="content-funding-history">
                  <Link to="/MyFundingSupport">후원 진행중</Link>
                </li>
                <li className={sidemenuStyles["submenuItem"]} data-target="content-funding-refund">
                  <Link to="/MyfundingSupport">후원 취소</Link>
                </li>
              </ul>
            </li>
            <li className={sidemenuStyles["menuItem"]} data-target="content-inquiry">
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={sidemenuStyles["menuItem"]} data-target="content-logout">
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={Styles["content"]}>
          <p className={Styles["title"]}>내정보</p>

          <div className={Styles["content_item"]}>
            <form id="userinfo" action="./UserInfoupdate.jsx" method="get">
              <div className={Styles["profile_img"]}>
                <div className={Styles["profile_img_show"]}>
                  <img src="/static/img/apple.png" alt="profile-img" />
                </div>
                <button type="submit" hidden>
                  프로필 변경
                </button>
              </div>

              <div className={Styles["info_list"]}>
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
                <div className={Styles["interast"]}>
                  {[...Array(4)].map((_, i) => (
                    <select className={Styles["read"]} key={i} disabled>
                      <option value="선택">선택</option>
                      <option value="클래식">클래식</option>
                      <option value="연극">연극</option>
                      <option value="국악">국악</option>
                      <option value="밴드">밴드</option>
                    </select>
                  ))}
                </div>

                <div className={Styles["okbutton"]}>
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
