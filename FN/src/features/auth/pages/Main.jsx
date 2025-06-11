import LogoutButton from "../components/LogoutButton";
import RequireAuth from "../../../components/auth/RequireAuth";
import { useAuth } from "../context/AuthContext";

function Main() {

  const { user } = useAuth();

  return (
    <RequireAuth>
      <div>
        <h2>환영합니다, {user?.nickname}님!</h2>
        <LogoutButton />
      </div>
    </RequireAuth>
  );
}

export default Main;
