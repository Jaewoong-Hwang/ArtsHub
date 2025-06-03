import { Route } from 'react-router-dom';
import Login from './pages/Login';
import UserInfo from './UserInfo';




export const AuthRoutes = () => (
  <>
    <Route key="login" path="login" element={<Login />} />
    <Route path="/mypage" element={<UserInfo />} />
  </>
);