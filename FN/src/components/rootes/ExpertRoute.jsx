// src/components/routes/ExpertRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext"; // 사용자 정보 가져오는 훅

const ExpertRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  if (user.role !== "ROLE_EXPERT") {
    alert("전문가만 접근할 수 있는 기능입니다.\n내정보에서 전문가로 전환해주세요.");
    return <Navigate to="/" />;
  }

  return children;
};

export default ExpertRoute;
