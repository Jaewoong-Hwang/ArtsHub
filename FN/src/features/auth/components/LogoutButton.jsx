import React from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 전역 상태에서 사용자 정보 제거

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/logout"); // 백엔드 요청
      setUser(null); // 상태 초기화
      alert("로그아웃 되었습니다.");
      navigate("/login"); // 메인으로 이동
    } catch (err) {
      console.error("로그아웃 실패", err);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      로그아웃
    </button>
  );
}

export default LogoutButton;
