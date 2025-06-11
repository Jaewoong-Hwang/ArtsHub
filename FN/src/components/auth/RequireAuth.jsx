import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowAlert(true);
    }
  }, [loading, user]);

  useEffect(() => {
    if (showAlert) {
        alert("로그인 후 이용 가능한 서비스입니다.");
        setRedirect(true);
    }
  }, [showAlert]);

  if (loading) return null;
  if (redirect) return <Navigate to="/login" replace />;

  return children;
}

export default RequireAuth;
