import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 로그인 사용자
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8090/api/mypage/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        console.log("user context 값:", res.data);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 편하게 쓰기 위한 custom hook
export const useAuth = () => useContext(AuthContext);
