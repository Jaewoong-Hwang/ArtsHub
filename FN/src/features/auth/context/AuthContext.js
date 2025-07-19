import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/api/mypage/me", {
        withCredentials: true,
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ 최신 정보 저장
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user"); // 로그아웃된 상태로 간주
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
