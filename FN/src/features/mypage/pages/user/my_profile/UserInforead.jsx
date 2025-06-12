import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import Styles from "../../css/user/my_profile/UserInforead.module.css";
import sidemenuStyles from "../../css/user/SidemenuUser.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";
import { useAuth } from "../../../../auth/context/AuthContext";

function UserInforead() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImage = userInfo?.profileImage;

  const isHttpUrl = profileImage?.startsWith("http");
  const isEmpty = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttpUrl
    ? profileImage
    : isEmpty
    ? "/img/default.png" // 정적 리소스 (resources/static/img/default.png)
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  // 유저 정보 불러오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("/api/mypage/me", {
        withCredentials: true,
      });
      setUserInfo(res.data);
      console.log("현재 role:", res.data.role);
    } catch (err) {
      console.error("유저 정보 불러오기 실패:", err);
      setError("로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 전문가로 전환
  const handleConvertToExpert = async () => {
    try {
      const res = await axios.put(
        "/api/mypage/convert-to-expert",
        {},
        { withCredentials: true }
      );

      await refreshUser(); // 전역 user 상태도 갱신
      await fetchUserInfo(); // 로컬 userInfo도 갱신

      // role 업데이트
      setUserInfo((prev) => ({
        ...prev,
        role: "ROLE_EXPERT",
      }));


      navigate("/ProjectManage");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "서버 오류";
      alert("전문가 전환 실패: " + message);
    }
  };

  return (
    <>
      <Header />

      <div className={Styles["mypage_section"]}>
        {/* 사이드 메뉴 */}
        <div className={sidemenuStyles["sidebarMenu"]}>
          <div className={sidemenuStyles["profile"]}>
            <img src={profileImageSrc} alt="프로필" />
            <p className={sidemenuStyles["nickname"]}>
              {userInfo?.nickname || "닉네임"}
            </p>
          </div>

          <button
            className={sidemenuStyles["change"]}
            onClick={handleConvertToExpert}
          >
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </button>

          <p className={sidemenuStyles["myArts"]}>My Arts</p>
          <ul className={sidemenuStyles["menu"]}>
            <li
              className={`${sidemenuStyles["menuItem"]} ${sidemenuStyles["menuItemActive"]}`}
            >
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

        {/* 메인 콘텐츠 */}
        <div className={Styles["content"]}>
          <p className={Styles["title"]}>내정보</p>

          {error && <p>{error}</p>}

          {!userInfo ? (
            <p>유저 정보를 불러오는 중입니다...</p>
          ) : (
            <div className={Styles["content_item"]}>
              <form id="userinfo">
                <div className={Styles["profile_img"]}>
                  <div className={Styles["profile_img_show"]}>
                    <img src={profileImageSrc} alt="프로필" />
                  </div>
                </div>

                <div className={Styles["info_list"]}>
                  <label htmlFor="nickname">닉네임</label>
                  <input
                    type="text"
                    id="nickname"
                    value={userInfo.nickname}
                    disabled
                  />

                  <label htmlFor="email">이메일</label>
                  <input
                    type="text"
                    id="email"
                    value={userInfo.email}
                    disabled
                  />

                  <label htmlFor="phone">연락처</label>
                  <input
                    type="text"
                    id="phone"
                    value={userInfo.phoneNumber}
                    disabled
                  />

                  <label htmlFor="address">주소</label>
                  <input
                    type="text"
                    id="address"
                    value={userInfo.address || ""}
                    disabled
                  />

                  <label>관심분야</label>
                  <div className={Styles["interast"]}>
                    {userInfo.interests && userInfo.interests.length > 0 ? (
                      <ul>
                        {userInfo.interests.map((interest, idx) => (
                          <li key={idx}>{interest}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>관심분야 없음</p>
                    )}
                  </div>

                  <div className={Styles["okbutton"]}>
                    <button
                      type="button"
                      onClick={() => navigate("/UserInfoupdate")}
                    >
                      수정
                    </button>
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
