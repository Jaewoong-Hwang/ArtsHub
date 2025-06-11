import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import logo from "../../assets/images/logo.svg";
import LogoutButton from "../../features/auth/components/LogoutButton";
//로그인 유저 정보
import { useAuth } from "../../features/auth/context/AuthContext";

/**
 * @param {Object} props
 * @param {Object} props.user - 사용자 정보 (isLogin, role)
 */
const Header = () => {
  const { user, loading } = useAuth();

  const isLogin = !!user;
  const role = user?.role === "ROLE_EXPERT" ? "expert" : "user"; // 기본값은 user로 처리
  const nickname = user?.nickname;
  const profileImage = user?.profileImage;

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";
  const profileImageSrc = profileImage?.startsWith("http")
    ? profileImage
    : `${SPRING_IMAGE_BASE_URL}/${profileImage || "default.png"}`;

      // 드롭다운 메뉴 상태 관리
  const [menuOpen, setMenuOpen] = useState(false);

  // 메뉴가 열린 상태에서 외부 클릭 시 닫기
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const renderRightMenu = () => {
    if (!isLogin) {
      return (
        <>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/join">회원가입</Link>
          </li>
        </>
      );
    }

    return (
      <>
        {role === "expert" && (
          <li>
            <Link to="/project/create">프로젝트 만들기</Link>
          </li>
        )}
        {role === "user" && (
          <li>
            <Link to="/projectmain">프로젝트 둘러보기</Link>
          </li>
        )}
        <li className="dropdown-container" ref={menuRef}>
          <div
            className="profile-trigger-with-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "pointer" }}
          >
            <img src={profileImageSrc} alt="프로필" className="profile-img" />
            {menuOpen && (
              <div className="dropdown-menu">
                <Link to="/UserInforead">내 정보</Link>
                <LogoutButton />
              </div>
            )}
          </div>
        </li>
      </>
    );
  };

  return (
    <header>
      <nav className="navi">
        <ul className="leftside">
          <li className="logo">
            <Link to="/">
              <img className="img-logo" src={logo} alt="아츠 허브 로고" />
              {/* <span className="artshub">Arts hub</span> */}
            </Link>
          </li>
          <ul className="depth1">
            <li>
              <Link to="/funding">Funding</Link>
              <ul className="depth2">
                <li>
                  <a href="#">인기</a>
                </li>
                <li>
                  <a href="#">신규</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Community</a>
              <ul className="depth2">
                <li>
                  <a href="#">공연 후기</a>
                </li>
                <li>
                  <a href="#">작품 이야기</a>
                </li>
                <li>
                  <a href="#">자유 게시판</a>
                </li>
                <li>
                  <a href="#">정보 공유</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/projectmain">Project</Link>
              <ul className="depth2">
                <li>
                  <a href="/project/participate">참가하기</a>
                </li>
                <li>
                  <a href="/project/create/info">만들기</a>
                </li>
              </ul>
            </li>
          </ul>
        </ul>

        <ul className="rightside">{renderRightMenu()}</ul>

        <a href="#" className="navbar_menu material-symbols-outlined">
          menu
        </a>
      </nav>
    </header>
  );
};

export default Header;
