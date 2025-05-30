import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

/**
 * @param {Object} props
 * @param {Object} props.user - 사용자 정보 (isLogin, role)
 */
const Header = ({ user }) => {
  const { isLogin, role } = user || { isLogin: false, role: "guest" };

  const renderRightMenu = () => {
    if (!isLogin) {
      return (
        <>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <li><Link to="/mypage">내 정보</Link></li>
          <li><Link to="#">프로젝트 둘러보기</Link></li>
        </>
      );
    }

    if (role === "expert") {
      return (
        <>
          <li><Link to="/mypage">내 정보</Link></li>
          <li><Link to="/project/create">프로젝트 만들기</Link></li>
        </>
      );
    }

    return null;
  };

  return (
    <header>
      <nav className="navi">
        <ul className="leftside">
          <li className="logo">
            <Link to="/">
              <img className="img-logo" src="/static/assets/img/mainlogo.png" alt="아츠 허브 로고" />
              {/* <span className="artshub">Arts hub</span> */}
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
              <Link to="/project">Project</Link>
              <ul className="depth2">
                <li><a href="#">참가하기</a></li>
                <li><a href="#">모집하기</a></li>
              </ul>
            </li>
          </ul>
        </ul>

        <ul className="rightside">
          {renderRightMenu()}
        </ul>

        <a href="#" className="navbar_menu material-symbols-outlined">menu</a>
      </nav>
    </header>
  );
};

export default Header;