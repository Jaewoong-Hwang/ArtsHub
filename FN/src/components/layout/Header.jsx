import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import logo from "../../assets/images/logo.svg";
import LogoutButton from "../../features/auth/components/LogoutButton";
import { useAuth } from "../../features/auth/context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const isLogin = !!user;
  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";

  const profileImage = user?.profileImage;
  const isHttpUrl = profileImage?.startsWith("http");
  const isEmpty = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttpUrl
    ? profileImage
    : isEmpty
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderRightMenu = () => {
    if (!isLogin) {
      return (
        <>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/join">회원가입</Link></li>
        </>
      );
    }

    return (
      <>
        <li><Link to="/projectmain">프로젝트 둘러보기</Link></li>
        <li><Link to="/project/create">프로젝트 만들기</Link></li>

        <li className="dropdown-container" ref={menuRef}>
          <div
            className="profile-trigger-with-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "pointer" }}
          >
            <img
              key={profileImage}
              src={
                isEmpty
                  ? profileImageSrc
                  : `${profileImageSrc}?t=${new Date().getTime()}`
              }
              alt="프로필"
              className="profile-img"
            />
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
            </Link>
          </li>

          <ul className="depth1">
            <li>
              <Link to="/funding">Funding</Link>
              <ul className="depth2">
                <li><a href="#">인기</a></li>
                <li><a href="#">신규</a></li>
              </ul>
            </li>

            <li>
              <a href="#">Community</a>
              <ul className="depth2">
                <li><a href="#">공연 후기</a></li>
                <li><a href="#">작품 이야기</a></li>
                <li><a href="#">자유 게시판</a></li>
                <li><a href="#">정보 공유</a></li>
              </ul>
            </li>

            <li>
              <Link to="/projectmain">Project</Link>
              <ul className="depth2">
                <li><Link to="/project/participate">참가하기</Link></li>
                <li><Link to="/project/create">만들기</Link></li>
              </ul>
            </li>
          </ul>
        </ul>

        <ul className="rightside">{renderRightMenu()}</ul>
        <a href="#" className="navbar_menu material-symbols-outlined">menu</a>
      </nav>
    </header>
  );
};

export default Header;
