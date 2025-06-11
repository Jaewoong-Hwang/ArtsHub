// 리액트 기본 모듈 및 axios, CSS 불러오기
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import Styles from "../../css/user/my_profile/UserInforead.module.css";
import sidemenuStyles from "../../css/user/SidemenuUser.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";

function UserInforead() {
  // 유저 정보와 에러 메시지 상태 정의
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 유저 정보 API 호출
  useEffect(() => {
    axios
      .get("/api/user/me", { withCredentials: true }) // JWT 쿠키 포함 요청
      .then((res) => {
        setUserInfo(res.data); // 응답 데이터를 상태에 저장
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패:", err);
        setError("로그인이 필요합니다.");
      });
  }, []);

  return (
    <>
      <Header />

      <div className={Styles["mypage_section"]}>
        {/* 사이드 메뉴 시작 */}
        <div className={sidemenuStyles["sidebarMenu"]}>
          <div className={sidemenuStyles["profile"]}>
            {/* 프로필 이미지 및 닉네임 출력 */}
            <img
              src={userInfo?.profile_image || "/static/img/default.png"}
              alt="프로필 이미지"
              className={sidemenuStyles["profileImg"]}
            />
            <p className={sidemenuStyles["nickname"]}>
              {userInfo?.nickname || "닉네임"}
            </p>
          </div>

          {/* 메뉴 항목들 */}
          <Link to="/FundingManage" className={sidemenuStyles["change"]}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={sidemenuStyles["myArts"]}>My Arts</p>
          <ul className={sidemenuStyles["menu"]}>
            <li className={`${sidemenuStyles["menuItem"]} ${sidemenuStyles["menuItemActive"]}`}>
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={sidemenuStyles["menuItem"]}>
              <Link to="/MyFundingSupport">후원 관리</Link>
            </li>
            <li className={sidemenuStyles["menuItem"]}>
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={sidemenuStyles["menuItem"]}>
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className={Styles["content"]}>
          <p className={Styles["title"]}>내정보</p>

          {/* 로딩 중이거나 에러일 경우 처리 */}
          {error && <p>{error}</p>}
          {!userInfo ? (
            <p>유저 정보를 불러오는 중입니다...</p>
          ) : (
            <div className={Styles["content_item"]}>
              <form id="userinfo">
                {/* 프로필 이미지 출력 */}
                <div className={Styles["profile_img"]}>
                  <div className={Styles["profile_img_show"]}>
                    <img src={userInfo.profile_image} alt="profile-img" />
                  </div>
                </div>

                {/* 유저 정보 항목들 */}
                <div className={Styles["info_list"]}>
                  <label htmlFor="nickname">닉네임</label>
                  <input type="text" id="nickname" value={userInfo.nickname} disabled />

                  <label htmlFor="email">이메일</label>
                  <input type="text" id="email" value={userInfo.email} disabled />

                  <label htmlFor="phone">연락처</label>
                  <input type="text" id="phone" value={userInfo.phoneNumber} disabled />

                  <label htmlFor="address">주소</label>
                  <input type="text" id="address" value={userInfo.address || ""} disabled />

                  <label>관심분야</label>
                  <div className={Styles["interast"]}>
                    {[...Array(4)].map((_, i) => (
                      <select className={Styles["read"]} key={i} disabled>
                        <option>{userInfo.interests?.[i] || "선택"}</option>
                      </select>
                    ))}
                  </div>

                  {/* 수정 버튼 */}
                  <div className={Styles["okbutton"]}>
                    <button type="button" onClick={() => navigate('/UserInfoupdate')}>수정</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserInforead;
